export default function isToday(d: Date) {
  const today = new Date();
  return (
    today.getDate() === d.getDate() &&
    today.getMonth() === d.getMonth() &&
    today.getFullYear() === d.getFullYear()
  );
}
