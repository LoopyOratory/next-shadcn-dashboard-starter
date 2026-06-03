'use client';

import {
  type ColumnFiltersState,
  type ColumnPinningState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type TableState,
  type Updater,
  type VisibilityState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import * as React from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';

import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import type { ExtendedColumnSort } from '@/types/data-table';

const PAGE_KEY = 'page';
const PER_PAGE_KEY = 'perPage';
const SORT_KEY = 'sort';
const ARRAY_SEPARATOR = ',';
const DEBOUNCE_MS = 300;
const THROTTLE_MS = 50;

interface UseDataTableProps<TData>
  extends
    Omit<
      TableOptions<TData>,
      | 'state'
      | 'pageCount'
      | 'getCoreRowModel'
      | 'manualFiltering'
      | 'manualPagination'
      | 'manualSorting'
    >,
    Required<Pick<TableOptions<TData>, 'pageCount'>> {
  initialState?: Omit<Partial<TableState>, 'sorting'> & {
    sorting?: ExtendedColumnSort<TData>[];
  };
  history?: 'push' | 'replace';
  debounceMs?: number;
  throttleMs?: number;
  clearOnDefault?: boolean;
  enableAdvancedFilter?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  startTransition?: React.TransitionStartFunction;
}

/**
 * Read a search param from the current URL.
 */
function getSearchParam(searchStr: string, key: string): string | null {
  const params = new URLSearchParams(searchStr);
  return params.get(key);
}

/**
 * Parse a sorting state string from URL into array form.
 */
function parseSorting(value: string): ExtendedColumnSort<any>[] {
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item) => item && typeof item.id === 'string' && typeof item.desc === 'boolean'
      );
    }
  } catch {
    // ignore
  }
  return [];
}

/**
 * Serialize sorting state to URL string.
 */
function serializeSorting(sorting: ExtendedColumnSort<any>[]): string {
  return JSON.stringify(sorting);
}

export function useDataTable<TData>(props: UseDataTableProps<TData>) {
  const {
    columns,
    pageCount = -1,
    initialState,
    history = 'replace',
    debounceMs = DEBOUNCE_MS,
    throttleMs = THROTTLE_MS,
    clearOnDefault = false,
    enableAdvancedFilter = false,
    scroll = false,
    shallow = true,
    startTransition,
    ...tableProps
  } = props;

  const location = useLocation();
  const navigate = useNavigate();

  // --- Internal URL sync helper ---
  const replaceUrl = React.useCallback(
    (searchStr: string) => {
      const to = `${location.pathname}${searchStr ? `?${searchStr}` : ''}`;
      if (history === 'push') {
        navigate({ to, replace: false });
      } else {
        navigate({ to, replace: true });
      }
    },
    [location.pathname, history, navigate]
  );

  const getIntParam = React.useCallback(
    (key: string, fallback: number): number => {
      const raw = getSearchParam(location.searchStr, key);
      if (raw === null) return fallback;
      const n = parseInt(raw, 10);
      return Number.isNaN(n) || n < 1 ? fallback : n;
    },
    [location.searchStr]
  );

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    initialState?.rowSelection ?? {}
  );
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    initialState?.columnVisibility ?? {}
  );
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(
    initialState?.columnPinning ?? {}
  );

  // Page state: read from URL, write via navigate
  const pageFromUrl = getIntParam(PAGE_KEY, 1);
  const perPageFromUrl = getIntParam(PER_PAGE_KEY, initialState?.pagination?.pageSize ?? 10);

  const [page, setPageState] = React.useState(pageFromUrl);
  const [perPage, setPerPageState] = React.useState(perPageFromUrl);

  // Sync from URL on location change
  React.useEffect(() => {
    setPageState(getIntParam(PAGE_KEY, 1));
    setPerPageState(getIntParam(PER_PAGE_KEY, initialState?.pagination?.pageSize ?? 10));
  }, [location.searchStr, getIntParam, initialState?.pagination?.pageSize]);

  const setPage = React.useCallback(
    (val: number) => {
      setPageState(val);
      const params = new URLSearchParams(location.searchStr);
      if (val === 1 && clearOnDefault) {
        params.delete(PAGE_KEY);
      } else {
        params.set(PAGE_KEY, String(val));
      }
      replaceUrl(params.toString());
    },
    [location.searchStr, clearOnDefault, replaceUrl]
  );

  const setPerPage = React.useCallback(
    (val: number) => {
      setPerPageState(val);
      const params = new URLSearchParams(location.searchStr);
      const defaultVal = initialState?.pagination?.pageSize ?? 10;
      if (val === defaultVal && clearOnDefault) {
        params.delete(PER_PAGE_KEY);
      } else {
        params.set(PER_PAGE_KEY, String(val));
      }
      params.delete(PAGE_KEY); // reset page when perPage changes
      replaceUrl(params.toString());
    },
    [location.searchStr, clearOnDefault, initialState?.pagination?.pageSize, replaceUrl]
  );

  const pagination: PaginationState = React.useMemo(() => {
    return {
      pageIndex: page - 1, // zero-based index
      pageSize: perPage
    };
  }, [page, perPage]);

  const onPaginationChange = React.useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      if (typeof updaterOrValue === 'function') {
        const newPagination = updaterOrValue(pagination);
        setPage(newPagination.pageIndex + 1);
        setPerPage(newPagination.pageSize);
      } else {
        setPage(updaterOrValue.pageIndex + 1);
        setPerPage(updaterOrValue.pageSize);
      }
    },
    [pagination, setPage, setPerPage]
  );

  const columnIds = React.useMemo(() => {
    return new Set(columns.map((column) => column.id).filter(Boolean) as string[]);
  }, [columns]);

  // Sort state from URL
  const sortFromUrl = React.useMemo(() => {
    const raw = getSearchParam(location.searchStr, SORT_KEY);
    return raw ? parseSorting(raw) : (initialState?.sorting ?? []);
  }, [location.searchStr, initialState?.sorting]);

  const [sorting, setSortingState] = React.useState<ExtendedColumnSort<TData>[]>(sortFromUrl);

  React.useEffect(() => {
    setSortingState(sortFromUrl);
  }, [sortFromUrl]);

  const setSorting = React.useCallback(
    (newSorting: ExtendedColumnSort<TData>[]) => {
      setSortingState(newSorting);
      const params = new URLSearchParams(location.searchStr);
      if (newSorting.length === 0) {
        params.delete(SORT_KEY);
      } else {
        params.set(SORT_KEY, serializeSorting(newSorting));
      }
      params.delete(PAGE_KEY); // reset page on sort change
      replaceUrl(params.toString());
    },
    [location.searchStr, replaceUrl]
  );

  const onSortingChange = React.useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      if (typeof updaterOrValue === 'function') {
        const newSorting = updaterOrValue(sorting);
        setSorting(newSorting as ExtendedColumnSort<TData>[]);
      } else {
        setSorting(updaterOrValue as ExtendedColumnSort<TData>[]);
      }
    },
    [sorting, setSorting]
  );

  const filterableColumns = React.useMemo(() => {
    if (enableAdvancedFilter) return [];
    return columns.filter((column) => column.enableColumnFilter);
  }, [columns, enableAdvancedFilter]);

  // Filter values from URL
  const filterFromUrl = React.useMemo(() => {
    const params = new URLSearchParams(location.searchStr);
    const result: Record<string, string | string[]> = {};
    for (const col of filterableColumns) {
      const id = col.id;
      if (!id) continue;
      const raw = params.get(id);
      if (raw === null) continue;
      if (col.meta?.options) {
        result[id] = raw.split(ARRAY_SEPARATOR).filter(Boolean);
      } else {
        result[id] = raw;
      }
    }
    return result;
  }, [location.searchStr, filterableColumns]);

  const [filterValues, setFilterValuesState] =
    React.useState<Record<string, string | string[]>>(filterFromUrl);

  React.useEffect(() => {
    setFilterValuesState(filterFromUrl);
  }, [filterFromUrl]);

  const setFilterValues = React.useCallback(
    (values: Record<string, string | string[]>) => {
      setFilterValuesState(values);
      const params = new URLSearchParams(location.searchStr);
      for (const col of filterableColumns) {
        const id = col.id;
        if (!id) continue;
        params.delete(id);
      }
      for (const [key, value] of Object.entries(values)) {
        if (value === null || value === undefined) continue;
        const serialized = Array.isArray(value) ? value.join(ARRAY_SEPARATOR) : String(value);
        if (serialized) params.set(key, serialized);
      }
      params.delete(PAGE_KEY);
      replaceUrl(params.toString());
    },
    [location.searchStr, filterableColumns, replaceUrl]
  );

  const debouncedSetFilterValues = useDebouncedCallback((values: typeof filterValues) => {
    setPage(1);
    setFilterValues(values);
  }, debounceMs);

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    if (enableAdvancedFilter) return [];

    return Object.entries(filterValues).reduce<ColumnFiltersState>((filters, [key, value]) => {
      if (value !== null) {
        const processedValue = Array.isArray(value)
          ? value
          : typeof value === 'string' && /[^a-zA-Z0-9]/.test(value)
            ? value.split(/[^a-zA-Z0-9]+/).filter(Boolean)
            : [value];

        filters.push({
          id: key,
          value: processedValue
        });
      }
      return filters;
    }, []);
  }, [filterValues, enableAdvancedFilter]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);

  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      if (enableAdvancedFilter) return;

      setColumnFilters((prev) => {
        const next = typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue;

        const filterUpdates = next.reduce<Record<string, string | string[] | null>>(
          (acc, filter) => {
            if (filterableColumns.find((column) => column.id === filter.id)) {
              acc[filter.id] = filter.value as string | string[];
            }
            return acc;
          },
          {}
        );

        for (const prevFilter of prev) {
          if (!next.some((filter) => filter.id === prevFilter.id)) {
            filterUpdates[prevFilter.id] = null;
          }
        }

        debouncedSetFilterValues(filterUpdates);
        return next;
      });
    },
    [debouncedSetFilterValues, filterableColumns, enableAdvancedFilter]
  );

  const table = useReactTable({
    ...tableProps,
    columns,
    initialState,
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      columnPinning,
      rowSelection,
      columnFilters
    },
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: false
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true
  });

  return { table, shallow, debounceMs, throttleMs };
}
