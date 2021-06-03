export interface Item {
  id: number | string;
  title: string;
  done: boolean;
}

export type Items = Item[];