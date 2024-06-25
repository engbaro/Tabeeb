// awsService.js
import { Amplify } from "aws-amplify";
import { signUp, confirmSignUp, autoSignIn, signIn, signOut } from "aws-amplify/auth";
import awsconfig from "../../../src/aws-exports";
import { SignUpParemeters } from "../../models/patient";

Amplify.configure(awsconfig);
export async function handleSignUp({
  username,
  email,
  phone_number,
  address,
  firstname,
  lastname,
  paymentmethod,
  gender,
  creditcard,
  birthyear,
  password,
  locale,
  specialization,
  category,
  doctorl_status,
  role
}: SignUpParemeters): Promise<SignUpOutput | null> {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username:username,
      password:password,
      options: {
        userAttributes: {
          address:address,
          given_name:firstname,
          family_name:lastname,
          gender:gender,
          birthdate:birthyear,
          email:email,
          phone_number:`+${phone_number.replace(/\D/g, '')}`,
          locale:locale,
          'custom:specialization':specialization,
          'custom:category':category,
          'custom:doctorl_status':doctorl_status,
          'custom:card_number':creditcard,
          'custom:payment_type':paymentmethod,
          'custom:role':role
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true
        }
      },
    });
    return { isSignUpComplete, userId, nextStep };
  } catch (error) {
    console.log("error signing up", error);
  }
}
export async function handleSignUpConfirmation({ username, confirmationCode }) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username,
      confirmationCode,
    });
    return { isSignUpComplete, nextStep };
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

export async function handleAutoSignIn() {
  try {
    const signInOutput = await autoSignIn();
    // handle sign-in steps
    return signInOutput;
  } catch (error) {
    console.log(error);
  }
}

export async function handleSignIn({ username, password }) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password,
      options: {
        authFlowType: "USER_PASSWORD_AUTH",
      },
     });
    return { isSignedIn, nextStep };
  } catch (error) {
    console.log('error signing in', error, "with " , username, password);
  }
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
