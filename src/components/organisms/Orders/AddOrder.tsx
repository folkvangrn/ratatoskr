import { Button } from '@/components/atoms/Button/Button';
import { FieldArray, Form, Formik } from 'formik';
import { Grid } from '@material-ui/core';
import { Modal } from '@/components/molecules/Modal/Modal';
import { Meal } from '@/types';
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
  type InitializedValues = {
    meals: Meal[];
    totalPrice: number;
  };

  const initialValues: InitializedValues = {
    meals: [],
    totalPrice: 0,
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
          <Form>
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

// import { TextFieldInput } from '@/components/atoms/TextFieldInput/TextFieldInput';

// import { Button } from '@/components/atoms/Button/Button';
// import { FieldArray, Form, Formik } from 'formik';
// import { Card, CardContent, Grid } from '@material-ui/core';
// import { Modal } from '@/components/molecules/Modal/Modal';

// type AddOrderProps = {
//   isOpen: boolean;
//   handleCloseModal: VoidFunction;
//   orderId?: number | undefined;
//   refetchOrders: VoidFunction;
// };

// const GET_ORDERS_QUERY = 'http://localhost:8000/api/clients';

// export function AddOrder({
//   isOpen,
//   handleCloseModal,
//   orderId,
//   refetchOrders,
// }: AddOrderProps) {
//   return (
//     <Modal
//       headerText={!orderId ? 'Add Order' : 'Edit Order'}
//       isOpen={isOpen}
//       handleClose={handleCloseModal}
//     >
//       <Card style={{ overflowY: 'scroll' }}>
//         <CardContent>
//           <Formik
//             enableReinitialize={true}
//             onSubmit={values => console.log(values)}
//             initialValues={{
//               meals: [],
//               totalPrice: 0,
//             }}
//           >
//             {({ values, errors }) => (
//               <Form>
//                 <FieldArray name="meals">
//                   {({ push, remove }) => (
//                     <>
//                       {values.meals.map((val, index) => (
//                         <Grid
//                           container
//                           style={{ backgroundColor: 'lightgray' }}
//                         >
//                           <Grid item>
//                             <TextFieldInput
//                               name={`meals.${index}.name`}
//                               label="Name"
//                             />
//                             <TextFieldInput
//                               name={`meals.${index}.price`}
//                               label="Price"
//                             />
//                             {() => {
//                               values.totalPrice += values.meals[index].price;
//                             }}
//                             <TextFieldInput
//                               name={`meals[${index}].availability`}
//                               label="Availability"
//                             />
//                             <Card>
//                               Ingredients:
//                               <CardContent
//                                 style={{ backgroundColor: 'lightblue' }}
//                               >
//                                 <FieldArray name={`meals.${index}.ingredients`}>
//                                   {({ push, remove }) => (
//                                     <>
//                                       {values.meals[index].ingredients.map(
//                                         (val, ingIndex) => (
//                                           <Grid container>
//                                             <Grid item>
//                                               Ingredient {ingIndex + 1}
//                                             </Grid>
//                                             <Grid item>
//                                               <TextFieldInput
//                                                 name={`meals.${index}.ingredients.${ingIndex}.name`}
//                                                 label="Name"
//                                               />
//                                               <TextFieldInput
//                                                 name={`meals.${index}.ingredients.${ingIndex}.quantity`}
//                                                 label="Quantity"
//                                               />
//                                             </Grid>
//                                           </Grid>
//                                         )
//                                       )}
//                                       <Button
//                                         text="Remove ingredient"
//                                         type="button"
//                                         onClick={() => {
//                                           remove(index);
//                                         }}
//                                       />
//                                       <Button
//                                         text="Add ingredient"
//                                         type="button"
//                                         onClick={() => {
//                                           push({
//                                             name: '',
//                                             quantity: 0,
//                                           });
//                                         }}
//                                       />
//                                     </>
//                                   )}
//                                 </FieldArray>
//                               </CardContent>
//                             </Card>
//                             <Button
//                               text="Remove meal"
//                               type="button"
//                               onClick={() => {
//                                 remove(index);
//                               }}
//                             />
//                           </Grid>
//                         </Grid>
//                       ))}
//                       <Button
//                         text="Add meal"
//                         type="button"
//                         onClick={() => {
//                           push({
//                             name: '',
//                             price: 0,
//                             availability: true,
//                             ingredients: [{ name: '', quantity: 0 }],
//                           });
//                         }}
//                       />
//                     </>
//                   )}
//                 </FieldArray>
//                 <p>
//                   Total price:
//                   {
//                     (values.totalPrice = values.meals.reduce(
//                       (accumulator: number, currentValue, index, array) => {
//                         return (accumulator += Number(currentValue.price));
//                       },
//                       0
//                     ))
//                   }
//                 </p>
//                 <Button type="submit" text="Submit" />
//                 <Button onClick={handleCloseModal} text="Cancel" />
//               </Form>
//             )}
//           </Formik>
//         </CardContent>
//       </Card>
//     </Modal>
//   );
// }
