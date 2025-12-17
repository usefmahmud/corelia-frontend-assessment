import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  return (
    <div className='fixed left-0 flex w-full items-center justify-between border-b bg-white px-8 py-4'>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold'>Corelia</h1>
      </div>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <Bell className='text-muted-foreground size-6' />
        </Button>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <User className='text-muted-foreground size-6' />
        </Button>
      </div>
    </div>
  );
};
