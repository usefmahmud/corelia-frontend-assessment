import { StorageKeys } from '@/constants/storage';
import type { Contact, User } from '@/types';

export const Storage = {
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(StorageKeys.USERS) ?? '[]');
  },
  setUsers(users: User[]) {
    localStorage.setItem(StorageKeys.USERS, JSON.stringify(users));
  },

  getContacts(): Contact[] {
    return JSON.parse(localStorage.getItem(StorageKeys.CONTACTS) ?? '[]');
  },
  setContacts(contacts: Contact[]) {
    localStorage.setItem(StorageKeys.CONTACTS, JSON.stringify(contacts));
  },

  getCurrentUserId(): string | null {
    const data = localStorage.getItem(StorageKeys.CURRENT_USER_ID);
    if (!data) return null;

    return JSON.parse(data);
  },
  setCurrentUserId(userId: string | null) {
    if (!userId) {
      localStorage.removeItem(StorageKeys.CURRENT_USER_ID);
      return;
    }

    localStorage.setItem(StorageKeys.CURRENT_USER_ID, JSON.stringify(userId));
  },
};
