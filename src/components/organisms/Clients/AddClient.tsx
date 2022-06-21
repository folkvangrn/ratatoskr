import * as Yup from 'yup';

import { TextFieldInput } from '@/components/atoms/TextFieldInput/TextFieldInput';
import { GenericCreateForm } from '@/components/molecules/GenericCreateForm/GenericCreateForm';
import { useGet } from '@/hooks/useGet';
import { Client } from '@/types/Client';

type AddClientProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  clientId?: number | undefined;
  refetchClients: VoidFunction;
};

const GET_CLIENTS_QUERY = 'http://localhost:8080/take/restaurant/client';
export function AddClient({
  isOpen,
  handleCloseModal,
  clientId,
  refetchClients,
}: AddClientProps) {
  const {
    data: client,
    error,
    isLoading,
  } = useGet<Client>({
    query: `${GET_CLIENTS_QUERY}/${clientId}`,
    skip: !clientId,
  });

  const initialValues: Client = {
    name: '',
    surname: '',
    address: '',
    email: '',
  };

  const initialData = clientId ? client : initialValues;

  return (
    <GenericCreateForm
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      initialId={clientId}
      initialFormValues={initialData}
      singularName="Client"
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        surname: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        email: Yup.string().required('Required'),
      })}
      refetchData={refetchClients}
      query={GET_CLIENTS_QUERY}
    >
      <TextFieldInput label="Name" name="name" />
      <TextFieldInput label="Surname" name="surname" />
      <TextFieldInput label="Address" name="address" />
      <TextFieldInput label="Email" name="email" />
    </GenericCreateForm>
  );
}
