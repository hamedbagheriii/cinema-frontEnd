import { atom, createStore } from 'jotai';

export const store = createStore();

export const TokenData = atom<any>(null);
