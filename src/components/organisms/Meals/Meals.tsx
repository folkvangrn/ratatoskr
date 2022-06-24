import { Dashboard } from '@/components/molecules/Dashboard/Dashboard';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { useGet } from '@/hooks/useGet';
import { useModal } from '@/hooks/useModal';
import { Meal } from '@/types';
import { useState } from 'react';
import { filterBySearchingPhrase } from '../helpers';
import { AddMeal } from './AddMeal';
import { MealListItem } from './MealListItem';

const GET_MEALS_QUERY = 'http://localhost:8080/take/restaurant/meal';
export function Meals() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');
  document.title = 'Meals';

  const {
    data: meals = [],
    error,
    isLoading,
    refetchData: refetchMeals,
  } = useGet<Meal[]>({ query: GET_MEALS_QUERY });

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
            refetchMeals={refetchMeals}
          />
        ) : null}
        {(filteredMeals || []).map(meal => (
          <MealListItem meal={meal} refetchMeals={refetchMeals} key={meal.id} />
        ))}
      </ListWrapper>
    </Dashboard>
  );
}
