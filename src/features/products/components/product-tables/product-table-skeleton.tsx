'use client';

import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

export function ProductTableSkeleton() {
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
