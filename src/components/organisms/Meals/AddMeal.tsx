import { TextFieldInput } from '@/components/atoms/TextFieldInput/TextFieldInput';

import { Button } from '@/components/atoms/Button/Button';
import { FieldArray, Form, Formik } from 'formik';
import { Grid } from '@material-ui/core';
import { Modal } from '@/components/molecules/Modal/Modal';
import { Ingredient } from '@/types';
import { SelectFieldInput } from '@/components/atoms/SelectFieldInput/SelectFieldInput';
import { useState } from 'react';

type AddMealProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  mealId?: number | undefined;
  refetchMeals: VoidFunction;
};

const GET_ORDERS_QUERY = 'http://localhost:8000/api/clients';

export function AddMeal({
  isOpen,
  handleCloseModal,
  mealId,
  refetchMeals,
}: AddMealProps) {
  const ingredients: Ingredient[] = [
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
  ];

  const initialData = {
    ingredients: [],
    name: '',
    price: 1,
    availability: true,
  };

  const DiscountForm = () => {
    const [discount, setDiscount] = useState(0);

    return (
      <div onSubmit={val => {}}>
        <label htmlFor="discount">Discount</label>
        <input
          type="number"
          id="discount"
          value={discount}
          min={0}
          onChange={e => setDiscount(Number(e.target.value))}
        />
        <Button
          text="Submit discount"
          onClick={() => {
            console.log('xd', discount);
          }}
        />
      </div>
    );
  };

  return (
    <Modal
      headerText={!mealId ? 'Add Meal' : 'Edit Meal'}
      isOpen={isOpen}
      handleClose={handleCloseModal}
    >
      <Formik
        enableReinitialize={true}
        onSubmit={values => {
          const ingredientsId = values.ingredients;
          const newIngredients = ingredientsId.map((id: string) => {
            return ingredients.find(ingredient => ingredient.id === Number(id));
          });
          const newValues = { ...values, ingredients: newIngredients };
          console.log('vv', newValues);
        }}
        initialValues={initialData}
      >
        {({ values, errors }) => (
          <Form style={{ overflowY: 'scroll' }}>
            <TextFieldInput label="Name" name="name" />
            <TextFieldInput label="Price" name="price" type="number" min={1} />
            <SelectFieldInput label="Availability" name="availability">
              <option value={'true'} key={'true'}>
                Yes
              </option>
              <option value={'false'} key={'false'}>
                No
              </option>
            </SelectFieldInput>
            <DiscountForm />
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <>
                  {values.ingredients.map((val, index) => (
                    <Grid
                      container
                      style={{ backgroundColor: 'lightgray' }}
                      key={`ing-${index}`}
                    >
                      <Grid item>
                        <SelectFieldInput
                          name={`ingredients[${index}]`}
                          label="Ingredient"
                        >
                          {ingredients.map(i => (
                            <option value={i.id} key={i.id}>
                              Name: {i.name}, quantity:{i.quantity}
                            </option>
                          ))}
                        </SelectFieldInput>

                        <Button
                          text="Remove ingredient"
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                        />
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    text="Add ingredient"
                    type="button"
                    onClick={() => {
                      push(ingredients[0].id);
                    }}
                  />
                </>
              )}
            </FieldArray>
            <Button type="submit" text="Submit" />
            <Button onClick={handleCloseModal} text="Cancel" />
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
