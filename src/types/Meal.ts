export type Meal = {
  id?: number;
  name: string;
  price: number;
  availability: boolean;
  mealIngredients?: MealIngredient[] | null;
};

type MealIngredientHelper = {
  id: number;
};

export type MealIngredient = {
  id?: number;
  ingredient: MealIngredientHelper;
  quantity: number;
  meal?: MealIngredientHelper;
};
