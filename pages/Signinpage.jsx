import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Input from "../component/input"; // Your custom Input component
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../reduxStore/store";

const Signin = () => {
  const nav = useNavigation();
  const [isLoading, setIsLoading] = useState(false); // Track the loading state
  const { control, handleSubmit, formState: { errors } } = useForm();
  console.log("Form Errors:", errors);


  //store use data on successfull login

  const storeuser=async(data)=>{
    await AsyncStorage.setItem('user',JSON.stringify({token:data})).then((res)=>{
        
            nav.navigate('Mytabs')
        
    })
}


  // Handle form submission
  const onSubmit = (data) => {
    console.log("onSubmit called");
    console.log("Form Submitted:", data);
    handleLogin(data); // Call login function with the form data
  };

  // Login API function
  const handleLogin = async ({ email, password }) => {
    try {
      setIsLoading(true); // Set loading state to true when API starts
      const response = await axios.post('https://rentsphere.onavinfosolutions.com/api/login', {
        email,
        password
      });

      console.log("Login Response:", response.data);
      
      // Check for the message in the response
      if (response.data.message === "Invalid Credentials") {
        // Show the toast with error message
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Login Failed',
          text2: response.data.message,
          visibilityTime: 4000, // Duration the toast will be visible
          autoHide: true, // Automatically hide the toast
        });
      } else {
        // You can handle successful login here (e.g., navigation)
        storeuser(response.data.access_token)
        console.log("Login successful"+ response.data.access_token);
      }

    } catch (error) {
      console.error("Login Error:", error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'An error occurred during login',
        visibilityTime: 4000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false); // Set loading state back to false after the request completes
    }
  };
  

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={styles.scrollViewContent}
    >
       <Toast ref={(ref) => Toast.setRef(ref)} />
      <View style={styles.maindiv}>
        <View style={{ width: "80%" }}>
          <Text style={styles.logotext}>RentSphere</Text>
          <Text style={styles.signintext}>Sign in</Text>

          {/* Email Input */}
          <Controller
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Please enter a valid email address'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="EMAIL"
                placeholder="ENTER EMAIL"
                onBlur={onBlur}
                handlechange={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          {/* Password Input */}
          <Controller
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="PASSWORD"
                placeholder="ENTER PASSWORD"
                secure={true}
                onBlur={onBlur}
                handlechange={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginbtn, isLoading && styles.disabledButton]} // Add a disabled style when loading
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading} // Disable the button while loading
        >
          <Text style={styles.logintext}>{isLoading ? "Logging in..." : "Login"}</Text>
        </TouchableOpacity>

        {/* Signup Link */}
        <TouchableOpacity style={{ marginTop: 30 }}>
          <Text style={{ color: "#121515", fontWeight: 700, fontSize: 16 }}>
            Don't have an account?
          </Text>
        </TouchableOpacity>

        {/* Navigate to Signup Page */}
        <TouchableOpacity
          style={{
            backgroundColor: "#222831",
            height: 50,
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 7,
          }}
          onPress={() => { nav.navigate('Signup') }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 500 }}>
            Create an Account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  logotext: {
    fontFamily: "Hind",
    fontWeight: 400,
    color: "#22215B",
    fontSize: 35,
  },
  signintext: {
    fontFamily: "Hind",
    fontWeight: 700,
    fontSize: 74,
    color: "#22215B",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  maindiv: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loginbtn: {
    backgroundColor: "#315EE7",
    height: 50,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    marginVertical: 20,
  },
  disabledButton: {
    backgroundColor: "#D3D3D3", // Grey background for the disabled state
  },
  logintext: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 28,
    fontFamily: "Hind",
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
