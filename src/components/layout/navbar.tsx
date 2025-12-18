import { Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch } from '@/store';
import { logout } from '@/store/auth-slice';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className='fixed left-0 flex w-full items-center justify-between border-b bg-white px-8 py-4'>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold'>Corelia</h1>
      </div>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <Bell className='text-muted-foreground size-6' />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <User className='text-muted-foreground size-6' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className='size-4' />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
