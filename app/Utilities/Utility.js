import Countries from '@/app/constants/Countries'
function generateRandom10DigitNumber() {
  const min = 1000000000000; // Minimum 10-digit number
  const max = 9999999999999; // Maximum 10-digit number
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString().padStart(10, "0"); // Ensure 10 digits with leading zeros if necessary
}

// Function to format the phone number
const formatPhoneNumber = (input, country) => {
  // Find the country object based on the provided country parameter
  const countryData = Countries.find(countryData => countryData.country === country);

  if (countryData) {
    // Extract the calling code from the country data
    const callingCode = countryData.callingCode;

    // Remove any non-digit characters from the input phone number
    const cleanedNumber = input.replace(/\D/g, '');

    // Concatenate the calling code and the cleaned phone number
    const formattedNumber = `${callingCode}${cleanedNumber}`;
    console.log(formattedNumber)
    return formattedNumber;
  } else {
    // Handle case when country is not found
    return `Country '${country}' not found in the list.`;
  }
};

function getFirstPartBeforeSpace(str) {
  if (typeof str !== 'string') {
      return '';
  }
  const parts = str.split(' ');
  return parts[0];
}
const Utils ={
  generateRandom10DigitNumber,
  formatPhoneNumber,
  getFirstPartBeforeSpace
}

export default Utils;
