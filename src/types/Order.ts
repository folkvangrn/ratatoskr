export type Order = {
  id?: number;
  orderedAt?: string;
  totalPrice: number;
  meals: Meal[];
};

export type Meal = {
  id?: number;
  name: string;
  price: number;
  availability: boolean;
  ingredients?: Ingredient[] ;
};

export type Ingredient = {
  id?: number;
  name: string;
  quantity: number;
};
