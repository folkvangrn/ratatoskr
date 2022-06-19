import { TextFieldInput } from '@/components/atoms/TextFieldInput/TextFieldInput';

import { Button } from '@/components/atoms/Button/Button';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Modal } from '@/components/molecules/Modal/Modal';
import { Meal } from '@/types';

type AddClientProps = {
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
}: AddClientProps) {
  return (
    <Modal
      headerText={!orderId ? 'Add Order' : 'Edit Order'}
      isOpen={isOpen}
      handleClose={handleCloseModal}
    >
      <Card style={{ overflowY: 'scroll' }}>
        <CardContent>
          <Formik
            enableReinitialize={true}
            onSubmit={values => console.log(values)}
            initialValues={{
              meals: [
                {
                  name: '',
                  price: 0,
                  availability: true,
                  ingredients: [{ name: '', quantity: 0 }],
                },
              ],
              totalPrice: 0,
            }}
          >
            {({ values, errors }) => (
              <Form>
                <FieldArray name="meals">
                  {({ push, remove }) => (
                    <>
                      {values.meals.map((val, index) => (
                        <Grid
                          container
                          style={{ backgroundColor: 'lightgray' }}
                        >
                          <Grid item>
                            <TextFieldInput
                              name={`meals.${index}.name`}
                              label="Name"
                            />
                            <TextFieldInput
                              name={`meals.${index}.price`}
                              label="Price"
                            />
                            {() => {
                              values.totalPrice += values.meals[index].price;
                            }}
                            <TextFieldInput
                              name={`meals[${index}].availability`}
                              label="Availability"
                            />
                            <Card>
                              Ingredients:
                              <CardContent
                                style={{ backgroundColor: 'lightblue' }}
                              >
                                <FieldArray name={`meals.${index}.ingredients`}>
                                  {({ push, remove }) => (
                                    <>
                                      {values.meals[index].ingredients.map(
                                        (val, ingIndex) => (
                                          <Grid container>
                                            <Grid item>
                                              Ingredient {ingIndex + 1}
                                            </Grid>
                                            <Grid item>
                                              <TextFieldInput
                                                name={`meals.${index}.ingredients.${ingIndex}.name`}
                                                label="Name"
                                              />
                                              <TextFieldInput
                                                name={`meals.${index}.ingredients.${ingIndex}.quantity`}
                                                label="Quantity"
                                              />
                                            </Grid>
                                          </Grid>
                                        )
                                      )}
                                      <Button
                                        text="Remove ingredient"
                                        type="button"
                                        onClick={() => {
                                          remove(index);
                                        }}
                                      />
                                      <Button
                                        text="Add ingredient"
                                        type="button"
                                        onClick={() => {
                                          push({
                                            name: '',
                                            quantity: 0,
                                          });
                                        }}
                                      />
                                    </>
                                  )}
                                </FieldArray>
                              </CardContent>
                            </Card>
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
                          push({
                            name: '',
                            price: 0,
                            availability: true,
                            ingredients: [{ name: '', quantity: 0 }],
                          });
                        }}
                      />
                    </>
                  )}
                </FieldArray>
                <p>
                  Total price:
                  {
                    (values.totalPrice = values.meals.reduce(
                      (accumulator: number, currentValue, index, array) => {
                        return (accumulator += Number(currentValue.price));
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
        </CardContent>
      </Card>
    </Modal>
  );
}
