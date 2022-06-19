import * as Yup from 'yup';

import { TextFieldInput } from '@/components/atoms/TextFieldInput/TextFieldInput';
import { GenericCreateForm } from '@/components/molecules/GenericCreateForm/GenericCreateForm';
import { Ingredient } from '@/types/Ingredient';

type AddIngredientProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  ingredientId?: number | undefined;
  refetchIngredients: VoidFunction;
};

const GET_CLIENTS_QUERY = 'http://localhost:8000/api/clients';

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

  return (
    <GenericCreateForm
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      initialId={ingredientId}
      initialFormValues={initialValues}
      singularName="Ingredient"
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
      })}
      refetchData={refetchIngredients}
      query={
        ingredientId
          ? `${GET_CLIENTS_QUERY}/${ingredientId}`
          : GET_CLIENTS_QUERY
      }
    >
      <TextFieldInput label="Name" name="name" />
      <TextFieldInput label="Quantity" name="quantity" type="number" />
    </GenericCreateForm>
  );
}
