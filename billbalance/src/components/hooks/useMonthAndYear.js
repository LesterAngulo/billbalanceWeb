export const useMonthAndYear = (newValue) => {
  let dateobj, fMonth, fYear, month, year;

  if (newValue != null) {
    dateobj = newValue;
    // eslint-disable-next-line no-unused-expressions
    (month = dateobj.getMonth() + 1), (year = dateobj.getFullYear());
  }
  fMonth = `${month}`;
  fYear = `${year}`;

  return [fMonth, fYear];
};
