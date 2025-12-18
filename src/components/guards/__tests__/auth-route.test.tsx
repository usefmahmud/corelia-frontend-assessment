import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthRoute from '../auth-route';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  Navigate: vi.fn(() => null),
  Outlet: vi.fn(() => null),
}));

describe('AuthRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Outlet when user is not authenticated', () => {
    vi.mocked(useSelector).mockReturnValue(null);

    render(<AuthRoute />);

    expect(Outlet).toHaveBeenCalled();
    expect(Navigate).not.toHaveBeenCalled();
  });

  it('should redirect to home when user is authenticated', () => {
    vi.mocked(useSelector).mockReturnValue('user-id');

    render(<AuthRoute />);

    expect(Navigate).toHaveBeenCalledWith(
      expect.objectContaining({ to: '/', replace: true }),
      undefined
    );
    expect(Outlet).not.toHaveBeenCalled();
  });
});
