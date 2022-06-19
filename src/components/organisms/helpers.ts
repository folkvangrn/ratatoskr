export const filterBySearchingPhrase = (
  searchingPhrase: string,
  fields: any[]
): boolean => {
  if (searchingPhrase === '') return true;
  return fields.some(field =>
    field.toLowerCase().includes(searchingPhrase.toLowerCase())
  );
};
