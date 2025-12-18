import { useState, useMemo, type ReactNode } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  className?: string;
  render?: (item: T, index: number) => ReactNode;
}

interface UseDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
}

export interface UseDataTableReturn<T> {
  data: T[];
  headers: (Column<T> & {
    onClick?: () => void;
    sortDirection: SortDirection | null;
  })[];
  pagination: {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: () => void;
    prevPage: () => void;
  };
}

export function useDataTable<T>({
  data,
  columns,
  pageSize = 10,
}: UseDataTableProps<T>): UseDataTableReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: SortDirection;
  } | null>(null);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const first = a[sortConfig.key];
      const second = b[sortConfig.key];

      if (first < second) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (first > second) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(data.length / pageSize);

  const handleSort = (key: keyof T) => {
    // sorting in 3 steps: asc -> desc -> none
    setSortConfig((current) => {
      if (current?.key === key) {
        if (current?.direction === 'asc') {
          return { key, direction: 'desc' };
        } else {
          return null;
        }
      }

      return { key, direction: 'asc' };
    });
  };

  const headers = columns.map((column) => ({
    ...column,
    onClick: column.sortable ? () => handleSort(column.key) : undefined,
    sortDirection: sortConfig?.key === column.key ? sortConfig.direction : null,
  }));

  return {
    data: paginatedData,
    headers,
    pagination: {
      currentPage,
      totalPages,
      setPage: setCurrentPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      nextPage: () => setCurrentPage((page) => Math.min(page + 1, totalPages)),
      prevPage: () => setCurrentPage((page) => Math.max(page - 1, 1)),
    },
  };
}
