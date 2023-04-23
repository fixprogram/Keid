export const getDifferenceBetweenDates = (
  firstDate: number,
  secondDate: number
) => {
  const date1 = new Date(firstDate);
  const date2 = new Date(secondDate);

  console.log("Date  1: ", date1);
  console.log("Date  2: ", date2);

  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
