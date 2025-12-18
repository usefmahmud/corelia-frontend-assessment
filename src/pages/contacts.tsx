import { Navbar } from '@/components/layout/navbar';
import { ContactsTable } from '@/components/contacts/contacts-table/contacts-table';
import { AddContactDialog } from '@/components/contacts/add-contact-modal';
import { EditContactDialog } from '@/components/contacts/edit-contact-modal';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store';
import { deleteContact } from '@/store/contacts-slice';
import toast from 'react-hot-toast';
import { useMemo, useState } from 'react';
import type { Contact } from '@/types';

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const currentUserId = useAppSelector((state) => state.auth.currentUserId);

  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userContacts = useMemo(
    () =>
      contacts.filter((contact) => {
        const matchesUser = contact.userId === currentUserId;
        const matchesSearch =
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.number.includes(searchQuery);

        return matchesUser && matchesSearch;
      }),
    [contacts, currentUserId, searchQuery]
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

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsEditOpen(true);
  };

  return (
    <div className='flex min-h-screen w-full flex-col gap-6 bg-white shadow-sm'>
      <Navbar />

      <div className='p-8 pt-26'>
        <h2 className='mb-8 text-center text-2xl font-bold'>Contacts</h2>

        <div className='mb-6 flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-2'>
            <div className='self-start rounded-md bg-gray-100 p-2 text-sm font-medium text-gray-700'>
              You have {userContacts.length} contacts
            </div>

            <AddContactDialog />
          </div>

          <Input
            placeholder='Search by name or phone...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='max-w-sm py-0 text-sm'
          />
        </div>

        <ContactsTable
          contacts={userContacts}
          onDelete={handleDeleteContact}
          onEdit={handleEditContact}
        />

        <EditContactDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          contact={editingContact}
        />
      </div>
    </div>
  );
};

export default ContactsPage;
