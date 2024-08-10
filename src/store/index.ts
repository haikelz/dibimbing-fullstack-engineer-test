import { atom } from "jotai";

export const editedNoteAtom = atom<{ id: number; status: boolean } | null>(
  null
);
