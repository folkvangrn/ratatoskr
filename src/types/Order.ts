import { Meal } from './Meal';

export type ClientId = {
  id: number;
};

export type Order = {
  id?: number;
  orderedAt?: string;
  totalPrice: number;
  meals: Meal[];
  client?: ClientId;
};
