import { Button } from '@/components/atoms/Button/Button';
import { FieldArray, Form, Formik } from 'formik';
import { Grid } from '@material-ui/core';
import { Modal } from '@/components/molecules/Modal/Modal';
import { Client, Meal, ClientId, Order } from '@/types';
import { SelectFieldInput } from '@/components/atoms/SelectFieldInput/SelectFieldInput';
import { useGet } from '@/hooks/useGet';

type AddOrderProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  orderId?: number | undefined;
  refetchOrders: VoidFunction;
};

const GET_ORDERS_QUERY = 'http://localhost:8080/take/restaurant/order';
const GET_CLIENTS_QUERY = 'http://localhost:8080/take/restaurant/client';
const GET_MEALS_QUERY = 'http://localhost:8080/take/restaurant/meal';

export function AddOrder({
  isOpen,
  handleCloseModal,
  orderId,
  refetchOrders,
}: AddOrderProps) {
  const { data: clients = [] } = useGet<Client[]>({ query: GET_CLIENTS_QUERY });
  const { data: meals = [] } = useGet<Meal[]>({ query: GET_MEALS_QUERY });
  const { data: order } = useGet<Order>({
    query: `${GET_ORDERS_QUERY}/${orderId}`,
    skip: !orderId,
  });

  type InitializedValues = {
    meals: Meal[];
    totalPrice: number;
    client: ClientId;
  };

  const initialValues: InitializedValues = {
    meals: [],
    totalPrice: 0,
    client: {
      id: clients?.[0].id!,
    },
  };

  const initialData = orderId ? { ...order, totalPrice: 0 } : initialValues;

  const handleAddOrder = async (newOrder: any) => {
    try {
      const response = await fetch(GET_ORDERS_QUERY, {
        method: !orderId ? 'POST' : 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newOrder }),
      });
      if (response.status.toString().startsWith('2')) {
        handleCloseModal();
        refetchOrders();
      }
    } catch (e) {
      console.error(e);
      alert('Something went wrong!');
    }
  };

  const calculateTotalPrice = (values: any) => {
    const tMeals = values?.meals;
    let totalPrice = 0;

    for (let i = 0; i < tMeals?.length; i++) {
      const id = tMeals[i]?.id || tMeals[i];

      const meal = meals?.find(m => m.id === Number(id));
      totalPrice += meal?.price!;
    }
    return totalPrice;
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
          const clientId = values.client?.id;
          const tempValues = { ...values };
          const newMeals = tempValues?.meals?.map(meal => {
            return {
              id: Number(meal?.id || meal),
            };
          });
          const newOrder = {
            ...tempValues,
            meals: newMeals,
            client: { id: clientId },
          };
          handleAddOrder(newOrder);
        }}
        initialValues={initialData!}
      >
        {({ values, errors }) => (
          <Form style={{ overflowY: 'scroll' }}>
            <SelectFieldInput
              name="client.id"
              label="Client"
              disabled={!!orderId}
            >
              {orderId ? (
                <option>
                  {values?.client?.name!} {values?.client?.surname!}
                </option>
              ) : (
                (clients || [])?.map(c => (
                  <option value={Number(c.id)}>
                    {c.name} {c.surname}
                  </option>
                ))
              )}
            </SelectFieldInput>
            <FieldArray name="meals">
              {({ push, remove }) => (
                <>
                  {(values?.meals || [])?.map((val, index) => (
                    <Grid container style={{ backgroundColor: 'lightgray' }}>
                      <Grid item>
                        <SelectFieldInput name={`meals[${index}]`} label="Meal">
                          {val?.id ? (
                            <option value={val?.id} key={`${val?.id}-${index}`}>
                              Name: {val?.name}, price:{val?.price}
                            </option>
                          ) : (
                            (meals || []).map(m => {
                              if (m.availability === false) return null;
                              return (
                                <option value={m.id} key={`${m.id}-${index}`}>
                                  Name: {m.name}, price:{m.price}
                                </option>
                              );
                            })
                          )}
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
                      push(meals?.[0].id!);
                    }}
                  />
                </>
              )}
            </FieldArray>
            <p>
              Total price:
              {(values.totalPrice = calculateTotalPrice(values))}
            </p>
            <Button type="submit" text="Submit" />
            <Button onClick={handleCloseModal} text="Cancel" />
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
