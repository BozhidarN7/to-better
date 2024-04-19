export default function converDateToString(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  // Concatenate and return formatted date
  return `${day}.${month}.${year}`;
}
