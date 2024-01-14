import { type Tag } from '../interfaces/tag';
import { create, type StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TagStore {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const tagStore: StateCreator<TagStore> = (set, get) => ({
  tags: [
    {
      id: '1fe47211-161e-481d-a23d-36230731d074',
      name: '家族',
    },
    {
      id: 'eb1b6e54-9c8e-426b-b95c-817ed634fe25',
      name: '友達',
    },
    {
      id: 'c9ea5882-329d-4a41-8b0b-7a7d17ec574b',
      name: '恋人',
    },
    {
      id: '80a2c2e9-fe59-4a75-a6df-3b4dc1b09e36',
      name: '同僚',
    },
    {
      id: 'd8b47490-10dc-476b-bb30-7d15161ea805',
      name: 'その他',
    },
  ],
  setTags: (tags: Tag[]) => {
    set(() => ({ tags }));
  },
});

export const useTagStore = create(
  persist(tagStore, {
    name: 'tag-storage',
    storage: createJSONStorage(() => AsyncStorage),
  })
);
