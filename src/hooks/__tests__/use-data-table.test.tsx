import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useDataTable, type Column } from '../use-data-table';

interface TestData {
  id: number;
  name: string;
  age: number;
}

const mockData: TestData[] = [
  { id: 1, name: 'A name', age: 10 },
  { id: 2, name: 'B name', age: 20 },
  { id: 3, name: 'C name', age: 30 },
  { id: 4, name: 'D name', age: 40 },
  { id: 5, name: 'E name', age: 50 },
];

const columns: Column<TestData>[] = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'age', header: 'Age', sortable: true },
];

describe('useDataTable', () => {
  it('should initialize with correct default values', () => {
    const { result } = renderHook(() =>
      useDataTable({ data: mockData, columns, pageSize: 2 })
    );

    expect(result.current.pagination.currentPage).toBe(1);
    expect(result.current.pagination.totalPages).toBe(3);
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data[0].name).toBe('A name');
    expect(result.current.data[1].name).toBe('B name');
  });
});
