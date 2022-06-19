import { Dashboard } from '@/components/molecules/Dashboard/Dashboard';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import { AddIngredient } from './AddIngredient';
import { IngredientListItem } from './IngredientListItem';
import { Ingredient } from '@/types';
import { filterBySearchingPhrase } from '../helpers';

export function Ingredients() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');
  document.title = 'Ingredients';
  const ingredients: Ingredient[] = [
    {
      id: 22,
      name: 'Bekon',
      quantity: 11,
    },
    {
      id: 23,
      name: 'Ser',
      quantity: 10,
    },
  ];

  const filteredIngredients = ingredients?.filter(order =>
    filterBySearchingPhrase(searchingPhrase, [
      order.quantity?.toString(),
      order.name.toString(),
    ])
  );

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
            refetchIngredients={() => {}} //TODO: Add refetchClients method
          />
        ) : null}
        {filteredIngredients.map(ing => (
          <IngredientListItem
            ingredient={ing}
            refetchIngredients={() => {}}
            key={ing.id}
          />
        ))}
      </ListWrapper>
    </Dashboard>
  );
}
