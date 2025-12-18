import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import PasswordInput from '../password-input';

describe('PasswordInput', () => {
  it('renders with type password', () => {
    render(<PasswordInput placeholder='Enter password' />);

    const input = screen.getByPlaceholderText('Enter password');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('toggles password visibility when eye icon button is clicked', async () => {
    const user = userEvent.setup();
    render(<PasswordInput placeholder='Enter password' />);

    const input = screen.getByPlaceholderText('Enter password');
    const toggleButton = screen.getByRole('button', { name: /show password/i });

    expect(input).toHaveAttribute('type', 'password');
    expect(toggleButton).toBeInTheDocument();

    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(
      screen.getByRole('button', { name: /hide password/i })
    ).toBeInTheDocument();

    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
    expect(
      screen.getByRole('button', { name: /show password/i })
    ).toBeInTheDocument();
  });

  it('calls onChange handler when input value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <PasswordInput onChange={handleChange} placeholder='Enter password' />
    );

    const input = screen.getByPlaceholderText('Enter password');
    await user.type(input, 'secret123');

    expect(handleChange).toHaveBeenCalled();
  });

  it('passes other props to the input element', () => {
    render(<PasswordInput placeholder='Enter password' disabled />);
    const input = screen.getByPlaceholderText('Enter password');

    expect(input).toBeDisabled();
  });
});
