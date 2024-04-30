import React from "react";
import { Button } from "react-native";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import awsconfig from "../../../src/aws-exports";

Amplify.configure(awsconfig);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator loginMechanisms={["phone_number"]}>
        <SignOutButton />
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
