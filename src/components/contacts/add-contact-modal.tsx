import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  addContactSchema,
  type AddContactValues,
} from '@/schema/contact.schema';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store';
import { addContact } from '@/store/contacts-slice';

export const AddContactDialog = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const currentUserId = useAppSelector((state) => state.auth.currentUserId);

  const form = useForm<AddContactValues>({
    resolver: zodResolver(addContactSchema),
    defaultValues: {
      name: '',
      number: '',
    },
  });

  const onSubmit = (data: AddContactValues) => {
    if (!currentUserId) {
      toast.error('User not authenticated');
      return;
    }

    try {
      dispatch(
        addContact({
          contact: {
            ...data,
            userId: currentUserId,
          },
        })
      );
      form.reset();
      setIsOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to add contact'
      );
    }
  };

  const handleClose = () => {
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? setIsOpen(true) : handleClose())}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className='size-4' /> Add Contact
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 py-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='number'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter phone number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant='outline' type='button' onClick={handleClose}>
                Cancel
              </Button>
              <Button type='submit'>Add Contact</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
