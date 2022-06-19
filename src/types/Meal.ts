import { Ingredient } from './Ingredient';

export type Meal = {
  id?: number;
  name: string;
  price: number;
  availability: boolean;
  ingredients?: Ingredient[];
};
