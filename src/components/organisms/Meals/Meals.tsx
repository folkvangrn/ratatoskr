import { Dashboard } from '@/components/molecules/Dashboard/Dashboard';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { useModal } from '@/hooks/useModal';
import { Meal } from '@/types';
import { useState } from 'react';
import { filterBySearchingPhrase } from '../helpers';
import { AddMeal } from './AddMeal';
import { MealListItem } from './MealListItem';

export function Meals() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');
  document.title = 'Meals';

  const meals: Meal[] = [
    {
      id: 11,
      price: 22.5,
      ingredients: [
        {
          id: 22,
          name: 'Bekon',
          quantity: 10,
        },
        {
          id: 23,
          name: 'Ser',
          quantity: 10,
        },
      ],
      name: 'Pizza',
      availability: true,
    },
    {
      id: 13,
      price: 22.5,
      ingredients: [
        {
          id: 15,
          name: 'Salami',
          quantity: 10,
        },
        {
          id: 14,
          name: 'Cheddar',
          quantity: 10,
        },
      ],
      name: 'Spaghetti ',
      availability: true,
    },
  ];

  const filteredMeals = meals?.filter(meal =>
    filterBySearchingPhrase(searchingPhrase, [
      meal?.name.toString(),
      meal.price.toString(),
    ])
  );

  return (
    <Dashboard>
      <ListWrapper
        handleOpenModal={handleOpenModal}
        singularName="Meal"
        handleChangeSearchInput={setSearchingPhrase}
      >
        {isModalOpen ? (
          <AddMeal
            isOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
            refetchMeals={() => {}} //TODO: Add refetchClients method
          />
        ) : null}
        {filteredMeals.map(meal => (
          <MealListItem meal={meal} refetchMeals={() => {}} key={meal.id} />
        ))}
      </ListWrapper>
    </Dashboard>
  );
}
