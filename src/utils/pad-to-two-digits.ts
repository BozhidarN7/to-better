export default function padToTwoDigits(num: number) {
  return num.toString().padStart(2, '0');
}
