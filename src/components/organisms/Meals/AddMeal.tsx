import { TextFieldInput } from '@/components/atoms/TextFieldInput/TextFieldInput';
import * as Yup from 'yup';

import { Button } from '@/components/atoms/Button/Button';
import { SelectFieldInput } from '@/components/atoms/SelectFieldInput/SelectFieldInput';
import { Modal } from '@/components/molecules/Modal/Modal';
import { useGet } from '@/hooks/useGet';
import { Ingredient, Meal } from '@/types';
import { Grid } from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';
import { useState } from 'react';
import axios from 'axios';

type AddMealProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  mealId?: number | undefined;
  refetchMeals: VoidFunction;
};

const GET_MEALS_QUERY = 'http://localhost:8080/take/restaurant/meal';
const GET_INGREDIENTS_QUERY =
  'http://localhost:8080/take/restaurant/ingredient';

const GET_MEAL_INGREDIENTS_QUERY =
  'http://localhost:8080/take/restaurant/mealIngredient';
export function AddMeal({
  isOpen,
  handleCloseModal,
  mealId,
  refetchMeals,
}: AddMealProps) {
  const { data: meal } = useGet<Meal>({
    query: `${GET_MEALS_QUERY}/${mealId}`,
    skip: !mealId,
  });

  const { data: ingredients } = useGet<Ingredient[]>({
    query: GET_INGREDIENTS_QUERY,
  });

  const initialValues: Meal = {
    mealIngredients: [],
    name: '',
    price: 1,
    availability: true,
  };
  const initialData: Meal = (mealId ? meal : initialValues)!;

  const DiscountForm = () => {
    const [discount, setDiscount] = useState(0);

    if (!mealId) return null;

    const handleDiscount = async () => {
      try {
        const response = await fetch(
          `${GET_MEALS_QUERY}/promotions/${mealId}/${discount}`,
          {
            method: 'PUT',
            //@ts-ignore
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        );
        const status = response.status;
        if (status.toString().startsWith('2')) {
          handleCloseModal();
          refetchMeals();
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong');
      }
    };

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
        <Button text="Submit discount" onClick={handleDiscount} />
      </div>
    );
  };

  const handleSendMealIngredients = async (
    mealResponse: Response,
    mealIngredients: any
  ) => {
    if (!mealResponse?.status?.toString().startsWith('2')) return;

    const handleAfterCreate = () => {
      refetchMeals();
      handleCloseModal();
    };
    const meal = await mealResponse.json();
    const createdMealId = meal.objectToReturn.id;

    const mealIngredientsWithMealId = mealIngredients.map((mi: any) => {
      mi['meal'] = {
        id: Number(createdMealId),
      };

      return mi;
    });
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    try {
      const mealIngredientsPostCalls = mealIngredientsWithMealId.map(
        async (mi: any) => {
          return await axios.post(GET_MEAL_INGREDIENTS_QUERY, mi, { headers });
        }
      );

      await axios.all(mealIngredientsPostCalls);
      handleAfterCreate();
    } catch (e) {
      console.error(e);
      alert('Something went wrong');
    }
  };

  const handleSubmitForm = async (values: any, mealIngredients: any) => {
    try {
      const response = await fetch(GET_MEALS_QUERY, {
        method: !mealId ? 'POST' : 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values }),
      });

      handleSendMealIngredients(response, mealIngredients);
    } catch (e) {
      console.error(e);
      alert('Something went wrong');
    }
  };

  const displayMealIngredients = (values: any, index: number) => {
    if (!meal) {
      return ingredients?.map(i => (
        <option value={Number(i.id)} key={i.id}>
          Name: {i.name}, quantity:{i.quantity}
        </option>
      ));
    }
    //@ts-ignore
    const name = meal?.mealIngredients?.[index]?.ingredient?.name!;
    //@ts-ignore
    const quantity = meal?.mealIngredients?.[index]?.ingredient?.quantity!;

    return (
      <option value={meal?.mealIngredients?.[index]?.ingredient?.id!}>
        Name: {name}, quantity:
        {quantity}
      </option>
    );
  };

  return (
    <Modal
      headerText={!mealId ? 'Add Meal' : "Meal's details"}
      isOpen={isOpen}
      handleClose={handleCloseModal}
    >
      <Formik
        validationSchema={Yup.object({
          mealIngredients: Yup.array().test(
            'Unique',
            'Values need te be unique',
            values => {
              const ings = values?.map(ing => Number(ing?.ingredient));
              return new Set(ings).size === values?.length!;
            }
          ),
        })}
        enableReinitialize={true}
        onSubmit={values => {
          //@ts-ignore
          const newValues = { ...values };
          const valuesIngredients = newValues.mealIngredients!;
          const newIngredients = valuesIngredients.map(ni => {
            ni['ingredient'] = {
              id: Number(ni.ingredient)!,
            };
            return ni;
          });

          handleSubmitForm(
            { ...newValues, mealIngredients: null },
            newIngredients
          );
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
            <FieldArray name="mealIngredients">
              {({ push, remove }) => (
                <>
                  {(values?.mealIngredients || []).map((val, index) => (
                    <Grid
                      container
                      style={{ backgroundColor: 'lightgray' }}
                      key={`ing-${index}`}
                    >
                      <Grid item>
                        <SelectFieldInput
                          name={`mealIngredients[${index}].ingredient`}
                          label="Ingredient"
                          disabled={!!mealId}
                        >
                          {displayMealIngredients(values, index)}
                        </SelectFieldInput>
                        <TextFieldInput
                          disabled={!!mealId}
                          name={`mealIngredients[${index}].quantity`}
                          label="Quantity"
                          type="number"
                          min={1}
                        />
                        <Button
                          disabled={!!mealId}
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
                    disabled={!!mealId}
                    text="Add ingredient"
                    type="button"
                    onClick={() => {
                      if (ingredients?.[0])
                        push({
                          ingredient: ingredients[0]?.id,
                          quantity: 1,
                          meal: null,
                        });
                    }}
                  />
                </>
              )}
            </FieldArray>
            <Button type="submit" text="Submit" disabled={!!mealId} />
            <Button onClick={handleCloseModal} text="Cancel" />
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
