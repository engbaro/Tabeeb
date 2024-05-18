function generateRandom10DigitNumber(): string {
  const min = 1000000000000; // Minimum 10-digit number
  const max = 9999999999999; // Maximum 10-digit number
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString().padStart(10, "0"); // Ensure 10 digits with leading zeros if necessary
}

export default { generateRandom10DigitNumber };
