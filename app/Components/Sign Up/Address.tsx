import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import RNPickerSelect from 'react-native-picker-select'
import Countries from "@/app/constants/Countries";

const AddressForm = ({ updateFullAddress }) => {
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<string[]>([])
  const [postalCode, setPostalCode] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [houseOrUnit, setHouseOrUnit] = useState("");
  const [locale, setLocale] = useState("");
  const pickerItems: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.JSX.Element[] | null | undefined = [];
  const concatenatedProps = `${country}, ${postalCode}, ${addressLine1}, ${houseOrUnit}`;

  const handleCountryChange = (countrytoSet) => {
    setCountry(countrytoSet);
    
    const selectedCountryData = Countries.find(item => item.country === countrytoSet);
    setLocale(selectedCountryData ? selectedCountryData.locale : "en-US")
    setCities(selectedCountryData ? selectedCountryData.cities : []);
  };
  useEffect(() => {
    const concatenatedProps = `${country} ${city} ${postalCode} ${addressLine1} ${houseOrUnit} ${locale}`;
    updateFullAddress(concatenatedProps);
  }, [
    country,
    city,
    postalCode,
    addressLine1,
    houseOrUnit,
    locale,
    updateFullAddress,
  ]);

  return (
    <View style={pickerStyle.container}>
      <View >
        <RNPickerSelect
        onValueChange={(value) => { handleCountryChange(value) }}
        items={Countries.map(countryItem => ({
          label: countryItem.country,
          value:countryItem.country
        }))}
        placeholder={{label:"Select Country", value:null}}
        value={country}
        />
      </View>
      {country && (
        <>
          <RNPickerSelect
            onValueChange={(value) => setCity(value)}
            items={cities.map(city => ({
              label: city,
              value: city,
            }))}
            placeholder={{ label: "Select a city", value: null }}
            value={city}
          />
        </>
      )}
      <TextInput
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={(text) => setPostalCode(text)}
        keyboardType="numeric"
        maxLength={7}
      />
      <TextInput
        placeholder="Address Line 1"
        value={addressLine1}
        onChangeText={(text) => setAddressLine1(text)}
      />
      <TextInput
        placeholder="House or Unit number"
        value={houseOrUnit}
        onChangeText={(text) => setHouseOrUnit(text)}
      />
    </View>
  );
};
const pickerStyle = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    gap: 20,
  },
  picker: {
    flex: 1, // This makes each picker take up half of the available space
    marginRight: 10, // Adds some space between the pickers
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});
export default AddressForm;
