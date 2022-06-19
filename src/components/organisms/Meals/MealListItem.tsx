import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/atoms/Button/Button';

import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';
import { AddMeal } from './AddMeal';
import { Meal } from '@/types';

type MealListItemProps = {
  meal: Meal;
  refetchMeals: VoidFunction;
};

export function MealListItem({ meal, refetchMeals }: MealListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const componentsArray = [
    <p>{meal.name}</p>,
    <p>Price: {meal.price}</p>,
    <Button text="Edit" onClick={handleOpenModal} />,
    <Button text="Delete" onClick={() => {}} />,
  ];

  return (
    <>
      <ListItemElements componentsArray={componentsArray} />
      {isModalOpen ? (
        <AddMeal
          refetchMeals={refetchMeals} //add method to
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          mealId={meal.id}
        />
      ) : null}
    </>
  );
}
