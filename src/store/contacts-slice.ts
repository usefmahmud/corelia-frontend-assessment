import { Storage } from '@/lib/storage';
import type { Contact } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: Storage.getContacts(),
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: { payload: { contact: Omit<Contact, 'id'> } }) {
      const { contact } = action.payload;

      const isContactExist = state.contacts.find(
        (c) =>
          c.userId === contact.userId &&
          c.name === contact.name &&
          c.number === contact.number
      );
      if (isContactExist) {
        throw new Error('Contact already exists');
      }

      const newContact: Contact = {
        id: state.contacts.length + 1,
        ...contact,
      };

      state.contacts.push(newContact);
      Storage.setContacts(state.contacts);
    },

    deleteContact(state, action: { payload: { contactId: number } }) {
      const { contactId } = action.payload;

      state.contacts = state.contacts.filter((c) => c.id !== contactId);
      Storage.setContacts(state.contacts);
    },

    updateContact(
      state,
      action: {
        payload: {
          contactId: number;
          updatedContact: Partial<Omit<Contact, 'id' | 'userId'>>;
        };
      }
    ) {
      const { contactId, updatedContact } = action.payload;
      const contactIndex = state.contacts.findIndex((c) => c.id === contactId);

      if (contactIndex === -1) {
        throw new Error('Contact not found');
      }

      const currentContact = state.contacts[contactIndex];
      const newContact = { ...currentContact, ...updatedContact };

      const isContactExist = state.contacts.find(
        (c) =>
          c.id !== contactId &&
          c.name === newContact.name &&
          c.number === newContact.number &&
          c.userId === currentContact.userId
      );

      if (isContactExist) {
        throw new Error('Contact already exists');
      }

      state.contacts[contactIndex] = newContact;

      Storage.setContacts(state.contacts);
    },
  },
});

export const { addContact, updateContact, deleteContact } = slice.actions;
export default slice.reducer;
