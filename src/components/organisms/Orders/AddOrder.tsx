import { Button } from '@/components/atoms/Button/Button';
import { FieldArray, Form, Formik } from 'formik';
import { Grid } from '@material-ui/core';
import { Modal } from '@/components/molecules/Modal/Modal';
import { Client, Meal, ClientId } from '@/types';
import { SelectFieldInput } from '@/components/atoms/SelectFieldInput/SelectFieldInput';

type AddOrderProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  orderId?: number | undefined;
  refetchOrders: VoidFunction;
};

const GET_ORDERS_QUERY = 'http://localhost:8000/api/clients';

export function AddOrder({
  isOpen,
  handleCloseModal,
  orderId,
  refetchOrders,
}: AddOrderProps) {
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

  const clients: Client[] = [
    {
      id: 1,
      firstName: 'imie',
      lastName: 'nazwisko',
      phoneNumber: 'phonenr',
      address: 'address',
    },
    {
      id: 2,

      firstName: 'lala',
      lastName: 'nazwisko',
      phoneNumber: 'phonenr',
      address: 'address',
    },
    {
      id: 3,

      firstName: 'oke',
      lastName: 'nazwisko',
      phoneNumber: 'phonenr',
      address: 'address',
    },
  ];

  type InitializedValues = {
    meals: Meal[];
    totalPrice: number;
    client: ClientId;
  };

  const initialValues: InitializedValues = {
    meals: [],
    totalPrice: 0,
    client: {
      id: clients[0].id!,
    },
  };

  return (
    <Modal
      headerText={!orderId ? 'Add Order' : 'Edit Order'}
      isOpen={isOpen}
      handleClose={handleCloseModal}
    >
      <Formik
        enableReinitialize={true}
        onSubmit={values => {
          const mealsId = values.meals;
          const newMeals = mealsId.map(id => {
            return meals.find(meal => meal.id === Number(id));
          });
          const newValues = { ...values, meals: newMeals };
          console.log('vv', newValues);
        }}
        initialValues={initialValues}
      >
        {({ values, errors }) => (
          <Form style={{ overflowY: 'scroll' }}>
            <SelectFieldInput name="client.id" label="Client">
              {clients.map(c => (
                <option value={Number(c.id)}>
                  Name: {c.firstName}, surname: {c.lastName}
                </option>
              ))}
            </SelectFieldInput>
            <FieldArray name="meals">
              {({ push, remove }) => (
                <>
                  {values.meals.map((val, index) => (
                    <Grid container style={{ backgroundColor: 'lightgray' }}>
                      <Grid item>
                        <SelectFieldInput name={`meals[${index}]`} label="Meal">
                          {meals.map(m => {
                            values.totalPrice += m.price;
                            return (
                              <option value={m.id} key={m.id}>
                                Name: {m.name}, price:{m.price}
                              </option>
                            );
                          })}
                        </SelectFieldInput>
                        <Button
                          text="Remove meal"
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                        />
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    text="Add meal"
                    type="button"
                    onClick={() => {
                      push(meals[0].id);
                    }}
                  />
                </>
              )}
            </FieldArray>
            <p>
              Total price:
              {
                (values.totalPrice = values.meals.reduce(
                  (accumulator: number, currentValue) => {
                    for (const meal of Object.values(meals)) {
                      if (meal.id === Number(currentValue))
                        return (accumulator += meal.price);
                    }
                    return accumulator;
                  },
                  0
                ))
              }
            </p>
            <Button type="submit" text="Submit" />
            <Button onClick={handleCloseModal} text="Cancel" />
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
