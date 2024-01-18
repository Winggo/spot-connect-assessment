export function isValidNumber(value) {
  const number = Number(value);
  return !isNaN(number);
}

export function generateUniqueId() {
  // Get the current timestamp in milliseconds
  const timestamp = new Date().getTime();

  // Generate a random number (between 0 and 99999)
  const random = Math.floor(Math.random() * 100000);

  // Combine timestamp and random number to create a unique ID
  const uniqueId = `${timestamp}-${random}`;

  return uniqueId;
}
