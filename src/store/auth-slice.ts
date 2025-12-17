import type { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  currentUserId: string | null;
  users: User[];
}

const initialState: AuthState = {
  currentUserId: null,
  users: [],
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: { payload: { email: string; password: string } }) {
      const { email, password } = action.payload;

      const user = state.users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      state.currentUserId = user.id;
    },
    logout(state) {
      state.currentUserId = null;
    },
    register(state, action: { payload: { user: Omit<User, 'id'> } }) {
      const { user } = action.payload;

      const isExist = state.users.find((u) => u.email === user.email);
      if (isExist) {
        throw new Error('User with this email already exists');
      }

      const newUser: User = {
        id: (state.users.length + 1).toString(),
        ...user,
      };

      state.users.push(newUser);
    },
  },
});

export const { login, logout, register } = slice.actions;
export default slice.reducer;
