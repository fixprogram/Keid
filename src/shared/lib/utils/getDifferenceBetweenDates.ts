export const getDifferenceBetweenDates = (
  firstDate: number,
  secondDate: number
) => {
  const date1 = new Date(firstDate).getTime();
  const date2 = new Date(secondDate).getTime();

  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
