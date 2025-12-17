import { Navbar } from '@/components/layout/navbar';
import { ContactTable } from '@/components/contacts/contact-table';
import { AddContactDialog } from '@/components/contacts/add-contact-modal';
import type { Contact } from '@/types';
import type { AddContactValues } from '@/schema/contact.schema';

const initialContacts: Contact[] = [
  { id: 1, name: 'Ahmed Ali', number: '+201112345678', userId: '1' },
  { id: 2, name: 'Mona Hassan', number: '+201223456789', userId: '1' },
  { id: 3, name: 'Omar Khaled', number: '+201003456789', userId: '1' },
  { id: 4, name: 'Sara Youssef', number: '+201554321098', userId: '1' },
];

const ContactsPage = () => {
  const handleAddContact = (newContact: AddContactValues, userId: string) => {};

  const handleDeleteContact = (id: number) => {};

  return (
    <div className='flex min-h-screen w-full flex-col gap-6 bg-white shadow-sm'>
      <Navbar />

      <div className='px-8 pb-8 pt-26'>
        <h2 className='mb-8 text-center text-2xl font-bold'>Contacts</h2>

        <div className='mb-6 flex items-center justify-between'>
          <div className='rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700'>
            You have {initialContacts.length} contacts
          </div>
          <AddContactDialog onAddContact={handleAddContact} />
        </div>

        <ContactTable
          contacts={initialContacts}
          onDelete={handleDeleteContact}
        />
      </div>
    </div>
  );
};

export default ContactsPage;
