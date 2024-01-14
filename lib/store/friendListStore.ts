import { type HeaderListItem } from '../../constants/sample';
import { type Friend } from '../interfaces/friend';
import { create, type StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FriendList = Array<Friend | HeaderListItem>;

export interface FriendListStore {
  friendList: FriendList;
  setFriendList: (friendList: FriendList) => void;
}

const friendListStore: StateCreator<FriendListStore> = (set, get) => ({
  friendList: [],
  setFriendList: (friendList: FriendList) => {
    set(() => ({ friendList }));
  },
});

export const useFriendListStore = create(
  persist(friendListStore, {
    name: 'friend-list-storage',
    storage: createJSONStorage(() => AsyncStorage),
  })
);
