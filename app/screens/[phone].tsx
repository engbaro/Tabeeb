import Colors from "@/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const Page = () => {
  const { phone , signIn } = useLocalSearchParams<{ phone: string; signIn: string }>();
  const verifySignIn = async () => {};
  const resendCode = async () => {};
    const verifyCode = async () => { };
    const [code, setCode] = useState('');
    const CELL_COUNT = 6;
    const ref = useBlurOnFulfill({ value:code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode
    })
    useEffect(() => {
    if (code.length == 6) {
      console.log("code", code);
    }
  }, [code]);

  return (
      <View style={styles.container}>
          <Stack.Screen options={{title:phone}}/>
          <Text style={styles.legal}>
              We have sent you an SMS with a code to the number above.
          </Text>
          <Text style={styles.legal}>To complete your phone number verification, please enter the 6-digit-activation code</Text>
          <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <View
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor/> : null)}</Text>
          </View>
        )}
      />
          <TouchableOpacity style={styles.button} onPress={resendCode}>
              <Text style={styles.buttonText}>Didn't receive a notification code?</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  loading: {
    backgroundColor: "rgba(0,0,0,0.5",
    alignItems: "center",
    justifyContent: "center",
  },
  legal: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.gray,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.lightgray,
    fontSize: 22,
    fontWeight: "500",
    },
    codeFieldRoot: {
        marginTop: 20,
        width: 260,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap:4,
    },
    cellRoot: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#000',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        paddingBottom: 4,
        borderBottomColor: '#000',
        borderBottomWidth:2
    },
});

export default Page;
