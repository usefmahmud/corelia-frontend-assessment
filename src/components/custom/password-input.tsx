import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = ({ onChange, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange?.(e);

  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
        className='pe-10'
        onChange={handleChange}
        {...props}
      />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='text-muted-foreground hover:text-primary absolute end-2 top-1/2 h-8 w-8 -translate-y-1/2'
        tabIndex={-1}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOffIcon className='h-5 w-5' />
        ) : (
          <EyeIcon className='h-5 w-5' />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;
