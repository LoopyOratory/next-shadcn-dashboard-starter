'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from '@tanstack/react-router';
import { useMemo } from 'react';
import { usersQueryOptions } from '../../api/queries';
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

export function UsersTable() {
  const location = useLocation();
  const searchStr = location.searchStr;

  const params = useMemo(() => {
    const page = parseInt(getSearchParam(searchStr, 'page') || '1', 10) || 1;
    const perPage = parseInt(getSearchParam(searchStr, 'perPage') || '10', 10) || 10;
    const name = getSearchParam(searchStr, 'name') || '';
    const role = getSearchParam(searchStr, 'role') || '';
    const sortRaw = getSearchParam(searchStr, 'sort');
    const sort = sortRaw ? parseSorting(sortRaw) : [];
    return { page, perPage, name, role, sort };
  }, [searchStr]);

  const filters = useMemo(
    () => ({
      page: params.page,
      limit: params.perPage,
      ...(params.name && { search: params.name }),
      ...(params.role && { roles: params.role }),
      ...(params.sort.length > 0 && { sort: JSON.stringify(params.sort) })
    }),
    [params]
  );

  const { data, isLoading, isPlaceholderData } = useQuery(usersQueryOptions(filters));

  // ALWAYS call useDataTable — hooks must be unconditional
  const pageCount = Math.ceil((data?.total_users ?? 0) / Math.max(params.perPage, 1));
  const { table } = useDataTable({
    data: data?.users ?? [],
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
        columnCount={5}
        rowCount={8}
        filterCount={2}
        cellWidths={['auto', '5rem', '5rem', '5rem', '4rem']}
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
