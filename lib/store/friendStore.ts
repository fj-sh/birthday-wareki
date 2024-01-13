import { type Friend } from '../interfaces/friend';
import { create, type StateCreator } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface FriendStore {
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
}

const friendStore: StateCreator<FriendStore> = (set, get) => ({
  friends: [],
  setFriends: (friends: Friend[]) => {
    set(() => ({ friends }));
  },
});

export const useFriendStore = create(
  persist(friendStore, {
    name: 'friend-storage',
    storage: createJSONStorage(() => AsyncStorage),
  })
);
