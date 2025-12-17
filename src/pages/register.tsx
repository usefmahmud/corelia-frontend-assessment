import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  registerSchema,
  type RegisterSchemaValues,
} from '@/schema/register.schema';
import PasswordInput from '@/components/custom/password-input';
import { register } from '@/store/auth-slice';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/store';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<RegisterSchemaValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (data: RegisterSchemaValues) => {
    try {
      dispatch(register({ user: data }));

      toast.success('Registered successfully');
      navigate('/login');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Registration failed'
      );
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Card className='bg-background w-full max-w-md shadow-md'>
        <CardHeader className='text-center'>
          <div>corelia</div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-6'
            >
              <div className='flex flex-col gap-4'>
                <FormField
                  control={form.control}
                  name='fullName'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Full Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Email address' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PasswordInput placeholder='Password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type='submit' className='py-6'>
                Register
              </Button>

              <div className='text-center text-sm'>
                <Link to='/login' className='text-primary hover:underline'>
                  I have an account Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
