import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";



const Input = ({ label, placeholder, secure,handlechange,value }) => {
  // State to control whether the password is visible or not
  const [isSecure, setIsSecure] = useState(secure);

  // Toggle the secureTextEntry value
  const toggleSecureTextEntry = () => {
    setIsSecure((prevState) => !prevState);
  };

  return (
    <View >
      <Text style={{ marginVertical: 10, color: "#888888", fontWeight: 400, fontSize: 14 }}>
        {label}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          secureTextEntry={isSecure}
          onChangeText={handlechange}
          value={value}
        />
        {/* Eye Icon to toggle visibility */}
        {secure?
        <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.eyeIcon}>
          <Image source={isSecure ? require('../assets/appimages/closed-eye.png'):require('../assets/appimages/open-eye.png')} size={20} color="#888888" />
        </TouchableOpacity>:''}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 50,
    borderRadius: 10, // Rounded corners
    paddingLeft: 15, // Padding inside the text input
    fontSize: 16, // Font size
    backgroundColor: "#F2F3F3", // Background color
    paddingRight: 40, // Extra space for the icon inside the input field
  },
  inputContainer: {
    position: "relative", // Allow positioning the icon inside the input field
  },
  eyeIcon: {
    position: "absolute", // Position the eye icon inside the TextInput
    right: 10, // Position the icon at the right end of the input field
    top: 15, // Adjust the vertical position of the icon
  },
});
