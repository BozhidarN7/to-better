export default function getDateAndMonth(d: string) {
  const [date, month] = d.split('.');

  return `${date}.${month}`;
}
