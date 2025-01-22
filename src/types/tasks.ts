import { SECTIONS } from "../constants/sections";

export type SectionId = keyof typeof SECTIONS;

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: number;
}

export type TasksBySections = {
  [K in SectionId]: Task[];
};
