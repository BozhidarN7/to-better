export default function getDateAndMonth(d: Date) {
  const dateString = d.toLocaleDateString('en-GB');
  const [date, month] = dateString.split('/');

  return `${date}.${month}`;
}
