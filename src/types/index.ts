import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type NoteProps = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
};
