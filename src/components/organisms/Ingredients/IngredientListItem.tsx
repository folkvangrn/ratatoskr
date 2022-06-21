import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/atoms/Button/Button';

import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';
import { Ingredient } from '@/types';
import { AddIngredient } from './AddIngredient';
import { handleDeleteEntity } from '../helpers';

type IngredientListItemProps = {
  ingredient: Ingredient;
  refetchIngredients: VoidFunction;
};
const GET_INGREDIENTS_QUERY =
  'http://localhost:8080/take/restaurant/ingredient';

export function IngredientListItem({
  ingredient,
  refetchIngredients,
}: IngredientListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const componentsArray = [
    <p>{ingredient.name}</p>,
    <p>Quantity: {ingredient.quantity}</p>,
    <Button text="Edit" onClick={handleOpenModal} />,
    <Button
      text="Delete"
      onClick={() =>
        handleDeleteEntity({
          query: `${GET_INGREDIENTS_QUERY}/${ingredient.id}`,
          afterDeleteFn: refetchIngredients,
        })
      }
    />,
  ];

  return (
    <>
      <ListItemElements componentsArray={componentsArray} />
      {isModalOpen ? (
        <AddIngredient
          refetchIngredients={refetchIngredients} //add method to
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          ingredientId={ingredient.id}
        />
      ) : null}
    </>
  );
}
