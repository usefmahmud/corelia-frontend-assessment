import { Navbar } from '@/components/layout/navbar';
import { ContactTable } from '@/components/contacts/contact-table';
import { AddContactDialog } from '@/components/contacts/add-contact-modal';
import { useAppDispatch, useAppSelector } from '@/store';
import { deleteContact } from '@/store/contacts-slice';
import toast from 'react-hot-toast';
import { useMemo } from 'react';

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const currentUserId = useAppSelector((state) => state.auth.currentUserId);

  const userContacts = useMemo(
    () => contacts.filter((contact) => contact.userId === currentUserId),
    [contacts, currentUserId]
  );

  const handleDeleteContact = (id: number) => {
    // TODO: Add confirmation dialog before deleting
    try {
      dispatch(deleteContact({ contactId: id }));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete contact'
      );
    }
  };

  return (
    <div className='flex min-h-screen w-full flex-col gap-6 bg-white shadow-sm'>
      <Navbar />

      <div className='px-8 pt-26 pb-8'>
        <h2 className='mb-8 text-center text-2xl font-bold'>Contacts</h2>

        <div className='mb-6 flex items-center justify-between'>
          <div className='rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700'>
            You have {userContacts.length} contacts
          </div>
          <AddContactDialog />
        </div>

        <ContactTable contacts={userContacts} onDelete={handleDeleteContact} />
      </div>
    </div>
  );
};

export default ContactsPage;
