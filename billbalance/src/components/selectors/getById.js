export const getById = (id, data) => {
  return data.find((entity) => entity.id === id);
};
