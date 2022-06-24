import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/atoms/Button/Button';

import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';
import { AddMeal } from './AddMeal';
import { Meal } from '@/types';
import { handleDeleteEntity } from '../helpers';
import axios from 'axios';

type MealListItemProps = {
  meal: Meal;
  refetchMeals: VoidFunction;
};
const GET_MEALS_QUERY = 'http://localhost:8080/take/restaurant/meal';
const GET_MEAL_INGREDIENTS_QUERY =
  'http://localhost:8080/take/restaurant/mealIngredient';
export function MealListItem({ meal, refetchMeals }: MealListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const deleteMealIngredients = async () => {
    if (!meal?.mealIngredients) return;

    try {
      const mealIngredientsPostCalls = meal.mealIngredients?.map(
        async (mi: any) => {
          return await axios.delete(`${GET_MEAL_INGREDIENTS_QUERY}/${mi.id}`);
        }
      );

      await axios.all(mealIngredientsPostCalls);
    } catch (e) {
      console.error(e);
      alert('Something went wrong');
    }
  };

  const componentsArray = [
    <p>{meal.name}</p>,
    <p>Price: {meal.price}</p>,
    <Button text="Details" onClick={handleOpenModal} />,
    <Button
      text="Delete"
      onClick={() =>
        handleDeleteEntity({
          query: `${GET_MEALS_QUERY}/${meal.id}`,
          afterDeleteFn: refetchMeals,
          beforeDeleteFn: deleteMealIngredients,
        })
      }
    />,
  ];

  return (
    <>
      <ListItemElements componentsArray={componentsArray} />
      {isModalOpen ? (
        <AddMeal
          refetchMeals={refetchMeals}
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          mealId={meal.id}
        />
      ) : null}
    </>
  );
}
