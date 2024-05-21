// UserModel.js
type SignUpParemeters = {
    username: string;
    email: string;
    phone_number: string;
    address: string;
    firstname: string;
    lastname: string;
    paymentmethod: string;
    gender: string;
    creditcard: string;
    birthyear: string;
    password: string;
    locale:string;
  };
  
  type UpdateParemeters = {
    username: string;
    email: string;
    phone_number: string;
    address: string;
    firstname: string;
    lastname: string;
    paymentmethod: string;
    gender: string;
    creditcarda: string;
    birthyear: Number;
  };
  
  export { SignUpParemeters, UpdateParemeters };
  