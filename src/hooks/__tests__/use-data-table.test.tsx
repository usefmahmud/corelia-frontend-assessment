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

  it('should handle pagination correctly', () => {
    const { result } = renderHook(() =>
      useDataTable({ data: mockData, columns, pageSize: 2 })
    );

    act(() => {
      result.current.pagination.nextPage();
    });

    expect(result.current.pagination.currentPage).toBe(2);
    expect(result.current.data[0].name).toBe('C name'); // first name in page 2 (A,B | C,D | E)

    // move to a specific page
    act(() => {
      result.current.pagination.setPage(3);
    });

    expect(result.current.pagination.currentPage).toBe(3);
    expect(result.current.data[0].name).toBe('E name'); // first name in page 3
    expect(result.current.data).toHaveLength(1); // only one item left in page 3

    act(() => {
      result.current.pagination.prevPage();
    });

    expect(result.current.pagination.currentPage).toBe(2);
  });

  it('should handle sorting correctly', () => {
    const { result } = renderHook(() =>
      useDataTable({ data: mockData, columns, pageSize: 5 })
    );

    const nameHeader = result.current.headers.find(({ key }) => key === 'name');
    act(() => {
      nameHeader?.onClick?.();
    });

    // ascending sort by name
    expect(
      result.current.headers.find(({ key }) => key === 'name')?.sortDirection
    ).toBe('asc');
    expect(result.current.data[0].name).toBe('A name');
    expect(result.current.data[4].name).toBe('E name');

    // descending sort by name
    act(() => {
      nameHeader?.onClick?.();
    });

    expect(
      result.current.headers.find((h) => h.key === 'name')?.sortDirection
    ).toBe('desc');
    expect(result.current.data[0].name).toBe('E name');
    expect(result.current.data[4].name).toBe('A name');

    // remove sorting
    act(() => {
      nameHeader?.onClick?.();
    });

    expect(
      result.current.headers.find((h) => h.key === 'name')?.sortDirection
    ).toBeNull();
    expect(result.current.data[0].name).toBe('A name');
    expect(result.current.data[4].name).toBe('E name');
  });
});
