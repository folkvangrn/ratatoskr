import { Dashboard } from '@/components/molecules/Dashboard/Dashboard';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import { AddIngredient } from './AddIngredient';
import { IngredientListItem } from './IngredientListItem';
import { Ingredient } from '@/types';
import { filterBySearchingPhrase } from '../helpers';
import { useGet } from '@/hooks/useGet';
const GET_INGREDIENTS_QUERY =
  'http://localhost:8080/take/restaurant/ingredient';
export function Ingredients() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');
  document.title = 'Ingredients';
  const {
    data: ingredients = [],
    error,
    isLoading,
    refetchData: refetchIngredients,
  } = useGet<Ingredient[]>({ query: GET_INGREDIENTS_QUERY });

  const filteredIngredients = ingredients?.filter(order =>
    filterBySearchingPhrase(searchingPhrase, [
      order.quantity?.toString(),
      order.name.toString(),
    ])
  );
  console.log(ingredients);
  return (
    <Dashboard>
      <ListWrapper
        handleOpenModal={handleOpenModal}
        singularName="Ingredient"
        handleChangeSearchInput={setSearchingPhrase}
      >
        {isModalOpen ? (
          <AddIngredient
            isOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
            refetchIngredients={refetchIngredients}
          />
        ) : null}
        {(filteredIngredients || []).map(ing => (
          <IngredientListItem
            ingredient={ing}
            refetchIngredients={refetchIngredients}
            key={ing.id}
          />
        ))}
      </ListWrapper>
    </Dashboard>
  );
}
