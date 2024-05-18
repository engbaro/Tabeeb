import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button, StyleSheet, View } from "react-native";
import { ConfirmSignUpInput, SignInInput, autoSignIn, confirmSignUp, signIn, signOut, signUp } from "aws-amplify/auth";

import awsconfig from "../../aws-exports";
import { SignUpParemeters } from "../../models/patient";

Amplify.configure(awsconfig);

async function handleSignUp({
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
}: SignUpParemeters) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          address,
          firstname,
          lastname,
          paymentmethod,
          gender,
          creditcard,
          birthyear,
        },
      },
    });
  } catch (error) {
    console.log("error signing up", error);
  }
}

async function handleSignUpConfirmation({
  username,
  confirmationCode
}: ConfirmSignUpInput) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username,
      confirmationCode
    });
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}
async function handleAutoSignIn() {
  try {
    const signInOutput = await autoSignIn();
    // handle sign-in steps
  } catch (error) {
    console.log(error);
  }
}

async function handleSignIn({ username, password }: SignInInput) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
  } catch (error) {
    console.log('error signing in', error);
  }
}

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}


export default{ handleAutoSignIn, handleSignIn, handleSignOut, handleSignUpConfirmation, handleSignUp };
