import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Button } from '@/components/ui/button';
import {
  addContactSchema,
  type AddContactValues,
} from '@/schema/contact.schema';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/store';
import { updateContact } from '@/store/contacts-slice';
import type { Contact } from '@/types';

interface EditContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
}

export const EditContactDialog = ({
  open,
  onOpenChange,
  contact,
}: EditContactDialogProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<AddContactValues>({
    resolver: zodResolver(addContactSchema),
    defaultValues: {
      name: '',
      number: '',
    },
  });

  useEffect(() => {
    if (contact) {
      form.reset({
        name: contact.name,
        number: contact.number,
      });
    }
  }, [contact, form]);

  const onSubmit = (data: AddContactValues) => {
    if (!contact) return;

    try {
      dispatch(
        updateContact({
          contactId: contact.id,
          updatedContact: data,
        })
      );
      onOpenChange(false);
      toast.success('Contact updated successfully');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update contact'
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4 py-4'
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
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit'>Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
