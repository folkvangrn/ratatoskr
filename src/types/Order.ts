import { Meal } from './Meal';

export type Order = {
  id?: number;
  orderedAt?: string;
  totalPrice: number;
  meals: Meal[];
};
