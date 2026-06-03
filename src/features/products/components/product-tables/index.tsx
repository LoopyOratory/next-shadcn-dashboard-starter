'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from '@tanstack/react-router';
import { useMemo } from 'react';
import { productsQueryOptions } from '../../api/queries';
import { columns } from './columns';

function getSearchParam(searchStr: string, key: string): string | null {
  const params = new URLSearchParams(searchStr);
  return params.get(key);
}

function parseSorting(value: string) {
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // ignore
  }
  return [];
}

export function ProductTable() {
  const location = useLocation();
  const searchStr = location.searchStr;

  const params = useMemo(() => {
    const page = parseInt(getSearchParam(searchStr, 'page') || '1', 10) || 1;
    const perPage = parseInt(getSearchParam(searchStr, 'perPage') || '10', 10) || 10;
    const name = getSearchParam(searchStr, 'name') || '';
    const category = getSearchParam(searchStr, 'category') || '';
    const sortRaw = getSearchParam(searchStr, 'sort');
    const sort = sortRaw ? parseSorting(sortRaw) : [];
    return { page, perPage, name, category, sort };
  }, [searchStr]);

  const filters = useMemo(
    () => ({
      page: params.page,
      limit: params.perPage,
      ...(params.name && { search: params.name }),
      ...(params.category && { categories: params.category }),
      ...(params.sort.length > 0 && { sort: JSON.stringify(params.sort) })
    }),
    [params]
  );

  const { data, isLoading, isPlaceholderData } = useQuery(productsQueryOptions(filters));

  // ALWAYS call useDataTable — hooks must be unconditional
  const pageCount = Math.ceil((data?.total_products ?? 0) / Math.max(params.perPage, 1));
  const { table } = useDataTable({
    data: data?.products ?? [],
    columns,
    pageCount,
    shallow: true,
    debounceMs: 500,
    initialState: {
      columnPinning: { right: ['actions'] }
    }
  });

  // Show skeleton only on initial load
  if (isLoading && !isPlaceholderData) {
    return (
      <DataTableSkeleton
        columnCount={6}
        rowCount={8}
        filterCount={2}
        cellWidths={['5rem', 'auto', '6rem', '5rem', 'auto', '4rem']}
        withPagination
        shrinkZero
      />
    );
  }

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
