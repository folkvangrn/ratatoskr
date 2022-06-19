import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/atoms/Button/Button';

import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';
import { AddIngredient } from './AddIngredient';
import { Ingredient } from '@/types';

type IngredientListItemProps = {
  ingredient: Ingredient;
  refetchIngredients: VoidFunction;
};

export function IngredientListItem({
  ingredient,
  refetchIngredients,
}: IngredientListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const componentsArray = [
    <p>{ingredient.name}</p>,
    <p>Quantity: {ingredient.quantity}</p>,
    <Button text="Edit" onClick={handleOpenModal} />,
    <Button text="Delete" onClick={() => {}} />,
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
