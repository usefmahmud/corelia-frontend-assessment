import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProtectedRoute from '../protected-route';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  Navigate: vi.fn(() => null),
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should redirect to login when user is not authenticated', () => {
    vi.mocked(useSelector).mockReturnValue(null);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(Navigate).toHaveBeenCalledWith(
      expect.objectContaining({ to: '/login', replace: true }),
      undefined
    );
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render children compnent when user is authenticated', () => {
    vi.mocked(useSelector).mockReturnValue('user-id');

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(Navigate).not.toHaveBeenCalled();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
