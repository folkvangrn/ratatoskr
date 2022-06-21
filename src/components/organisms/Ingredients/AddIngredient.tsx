import * as Yup from 'yup';

import { TextFieldInput } from '@/components/atoms/TextFieldInput/TextFieldInput';
import { GenericCreateForm } from '@/components/molecules/GenericCreateForm/GenericCreateForm';
import { Ingredient } from '@/types/Ingredient';
import { useGet } from '@/hooks/useGet';

type AddIngredientProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  ingredientId?: number | undefined;
  refetchIngredients: VoidFunction;
};

const GET_INGREDIENTS_QUERY =
  'http://localhost:8080/take/restaurant/ingredient';

export function AddIngredient({
  isOpen,
  handleCloseModal,
  ingredientId,
  refetchIngredients,
}: AddIngredientProps) {
  const initialValues: Ingredient = {
    name: '',
    quantity: 10,
  };
  const {
    data: ingredient,
    error,
    isLoading,
  } = useGet<Ingredient>({ query: `${GET_INGREDIENTS_QUERY}/${ingredientId}` });
  const initialData = ingredientId ? ingredient : initialValues;

  return (
    <GenericCreateForm
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      initialId={ingredientId}
      initialFormValues={initialData}
      singularName="Ingredient"
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        quantity: Yup.number()
          .integer()
          .min(1, 'Quantity must be equal or greater than 1'),
      })}
      refetchData={refetchIngredients}
      query={GET_INGREDIENTS_QUERY}
    >
      <TextFieldInput label="Name" name="name" />
      <TextFieldInput label="Quantity" name="quantity" type="number" min={1} />
    </GenericCreateForm>
  );
}
