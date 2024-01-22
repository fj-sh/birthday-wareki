import { create, type StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserActionCountStore {
  userActionCount: number;
  incrementUserActionCount: () => void;
  resetUserActionCount: () => void;
}

const userActionCountStore: StateCreator<UserActionCountStore> = (set, get) => ({
  userActionCount: 0,
  incrementUserActionCount: () => {
    set((state) => ({ userActionCount: state.userActionCount + 1 }));
  },
  resetUserActionCount: () => {
    set(() => ({ userActionCount: 0 }));
  },
});

export const useUserActionCountStore = create(
  persist(userActionCountStore, {
    name: 'user-action-count-storage',
    storage: createJSONStorage(() => AsyncStorage),
  })
);
