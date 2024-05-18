import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { allCountries } from "country-region-data";

const AddressForm = ({ updateFullAddress }) => {
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const pickerItems: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.JSX.Element[] | null | undefined = [];
  const [countries, setCountries] = useState(allCountries);
  const concatenatedProps = `${country}, ${province}, ${postalCode}, ${addressLine1}, ${addressLine2}`;
    const findCountryByName = (name) => {
      console.log("Countries:", allCountries)
    const foundCountry = countries.find(
      (inputCountry) => inputCountry.countryName === name
    );
    return foundCountry ? foundCountry.regions : null;
  };
  useEffect(() => {
    const concatenatedProps = `${country}, ${province}, ${postalCode}, ${addressLine1}, ${addressLine2}`;
    updateFullAddress(concatenatedProps);
  }, [
    country,
    province,
    postalCode,
    addressLine1,
    addressLine2,
    updateFullAddress,
  ]);
  // Check if allCountries is an array
  if (Array.isArray(allCountries)) {
    // Iterate over allCountries array
    allCountries.forEach((country, index) => {
      pickerItems.push(
        <Picker.Item key={index} label={`${country[0]}`} value={country} />
      );
    });
  } else {
    console.error("allCountries is not an array.");
  }
  return (
    <View>
      <TextInput
        placeholder="Country"
        value={country}
        onChangeText={(text) => setCountry(text)}
      />
      <View style={pickerStyle.container}>
        <Picker
          selectedValue={country}
          onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
        >
          <Picker.Item label={"Select Country"} value="" />
          {pickerItems}
        </Picker>
        {findCountryByName(country) ? (
          <Picker
            selectedValue={province}
            onValueChange={(itemValue, itemIndex) => setProvince(itemValue)}
            enabled={findCountryByName(country).length > 0}
          >
            <Picker.Item label={"Select Province/district/region"} value="" />
            {findCountryByName(country).map((provinceToSelect, index) => (
              <Picker.Item
                key={index}
                label={provinceToSelect.name}
                value={province}
              />
            ))}
          </Picker>
        ) : null}
      </View>
      <TextInput
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={(text) => setPostalCode(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Address Line 1"
        value={addressLine1}
        onChangeText={(text) => setAddressLine1(text)}
      />
      <TextInput
        placeholder="Address Line 2"
        value={addressLine2}
        onChangeText={(text) => setAddressLine2(text)}
      />
    </View>
  );
};
const pickerStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  picker: {
    flex: 1, // This makes each picker take up half of the available space
    marginRight: 10, // Adds some space between the pickers
  },
});
export default AddressForm;
