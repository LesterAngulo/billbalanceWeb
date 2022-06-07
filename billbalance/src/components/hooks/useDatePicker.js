export const useDatePicker = (newValue) => {
  let dateobj, date, formatted, month, year;

  if (newValue != null) {
    dateobj = newValue;
    // eslint-disable-next-line no-unused-expressions
    (date = dateobj.getDate()),
      (month = dateobj.getMonth() + 1),
      (year = dateobj.getFullYear());
  }
  formatted = `${year}-${month}-${date}`;

  return [formatted];
};
