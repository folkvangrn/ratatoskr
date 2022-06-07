import { ReactNode } from 'react';
import { Formik } from 'formik';

import { Modal } from '@/components/molecules/Modal/Modal';
import { FormWrapper } from '@/components/atoms/FormWrapper/FormWrapper';
import { useGet } from '@/hooks/useGet';

type GenericCreateForm<T> = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  children: ReactNode[];
  singularName: string;
  validationSchema: any;
  initialFormValues: T;
  query: string;
  initialId?: number | string;
  refetchData: VoidFunction;
};

const getHeaderText = (isEditMode: boolean, singularName: string): string => {
  return !isEditMode ? `Add ${singularName}` : `Edit ${singularName}`;
};

export function GenericCreateForm<T>({
  isOpen,
  handleCloseModal,
  initialId,
  children,
  singularName,
  validationSchema,
  initialFormValues,
  query,
  refetchData,
}: GenericCreateForm<T>) {
  const headerText = getHeaderText(!!initialId, singularName);

  const { data: givenData } = useGet<T>({
    query,
    skip: initialId ? false : true,
  });

  const handleAfterCreate = () => {
    refetchData();
    handleCloseModal();
  };

  const handleSubmitForm = async (values: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(query, {
        method: !initialId ? 'POST' : 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values }),
      });
      if (response.status === 200) handleAfterCreate();
      else {
        console.error('something went wrong!');
      }
    } catch (e) {}
  };
  return (
    <Modal
      headerText={headerText}
      isOpen={isOpen}
      handleClose={handleCloseModal}
    >
      <Formik
        enableReinitialize={true}
        validationSchema={validationSchema}
        initialValues={initialFormValues}
        onSubmit={handleSubmitForm}
      >
        <FormWrapper handleCloseForm={handleCloseModal}>{children}</FormWrapper>
      </Formik>
    </Modal>
  );
}
