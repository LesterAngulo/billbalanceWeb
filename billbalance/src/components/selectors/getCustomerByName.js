export const getBy = (text = '', data) => {
  if (text === '') {
    return data;
  }
  text = text.toLowerCase();
  return data.filter((entity) => {
    for (const key in entity) {
      if (entity[key] == null) continue;
      if (entity[key].toString().toLowerCase().includes(text)) return true;
    }
    return false;
  });
};
