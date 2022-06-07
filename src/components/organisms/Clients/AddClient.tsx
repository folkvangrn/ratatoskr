import * as Yup from 'yup';

import { TextFieldInput } from '@/components/atoms/TextFieldInput/TextFieldInput';
import { GenericCreateForm } from '@/components/molecules/GenericCreateForm/GenericCreateForm';
import { Client } from '@/types/Client';

type AddClientProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  clientId?: number | undefined;
  refetchClients: VoidFunction;
};

const GET_CLIENTS_QUERY = 'http://localhost:8000/api/clients';

export function AddClient({
  isOpen,
  handleCloseModal,
  clientId,
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
      initialId={clientId}
      initialFormValues={initialValues}
      singularName="Client"
      validationSchema={Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        phoneNumber: Yup.string().required('Required'),
      })}
      refetchData={refetchClients}
      query={clientId ? `${GET_CLIENTS_QUERY}/${clientId}` : GET_CLIENTS_QUERY}
    >
      <TextFieldInput label="First name" name="firstName" />
      <TextFieldInput label="Last name" name="lastName" />
      <TextFieldInput label="Address" name="address" />
      <TextFieldInput label="Phone number" name="phoneNumber" />
    </GenericCreateForm>
  );
}
