export default function createDate(dateString: string) {
  // Regular expression to check if the date string is in the format DD/MM/YYYY
  const dateRegex =
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  // Check if the date string matches the regular expression
  if (!dateRegex.test(dateString)) {
    return null;
  }
  // Use split() method to split the dateString by "/" character
  const dateParts = dateString.split('/');

  // Extract the day, month, and year from the dateParts array
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Subtract 1 because months are 0-based in JavaScript Date object
  const year = parseInt(dateParts[2], 10);

  // Create a new Date object using the extracted day, month, and year
  const dateObj = new Date(year, month, day);

  // Return the date object
  return dateObj;
}
