export default function determinePastAndFutureYears(
  firstYearWithTasks: number,
) {
  const currenyYear = new Date().getFullYear();

  const years = [];
  for (let year = firstYearWithTasks; year <= currenyYear + 1; year++) {
    years.push(year);
  }
  return years;
}
