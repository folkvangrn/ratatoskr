export const filterBySearchingPhrase = (
  searchingPhrase: string,
  fields: any[]
): boolean => {
  if (searchingPhrase === '') return true;
  return fields.some(field =>
    field.toLowerCase().includes(searchingPhrase.toLowerCase())
  );
};

type useDeleteProps = {
  query: string;
  afterDeleteFn: VoidFunction;
  beforeDeleteFn?: VoidFunction;
};

export const handleDeleteEntity = async ({
  query,
  afterDeleteFn,
  beforeDeleteFn,
}: useDeleteProps) => {
  try {
    beforeDeleteFn && (await beforeDeleteFn());

    const response = await fetch(query, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const status = await response.status;
    if (status.toString().startsWith('2')) {
      afterDeleteFn();
    } else {
      alert('Something went wrong!');
    }
  } catch (e) {}
};
