import * as Yup from 'yup';

import { TextFieldInput } from '@/components/atoms/TextFieldInput/TextFieldInput';
import { GenericCreateForm } from '@/components/molecules/GenericCreateForm/GenericCreateForm';
import { Client } from '@/types/Client';

type AddClientProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  orderId?: number | undefined;
  refetchClients: VoidFunction;
};

const GET_ORDERS_QUERY = 'http://localhost:8000/api/clients';

export function AddClient({
  isOpen,
  handleCloseModal,
  orderId,
  refetchClients,
}: AddClientProps) {
  const initialValues: Client = {
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
  };

  return (
    <GenericCreateForm
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      initialId={orderId}
      initialFormValues={initialValues}
      singularName="Order"
      validationSchema={Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        phoneNumber: Yup.string().required('Required'),
      })}
      refetchData={refetchClients}
      query={orderId ? `${GET_ORDERS_QUERY}/${orderId}` : GET_ORDERS_QUERY}
    >
      <TextFieldInput label="First name" name="firstName" />
      <TextFieldInput label="Last name" name="lastName" />
      <TextFieldInput label="Address" name="address" />
      <TextFieldInput label="Phone number" name="phoneNumber" />
    </GenericCreateForm>
  );
}
