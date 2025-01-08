import { View, Text, ScrollView, StyleSheet,Touchable } from "react-native";
import Input from "../component/input";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { useState } from "react";

const PropertyForm = () => {
  const { catData, catStatus } = useSelector((state) => state.category);
  console.log('Categories:', JSON.stringify(catData));
  const [gradientColors, setGradientColors] = useState(['green', 'red']); // Ini
  const { control, handleSubmit, formState: { errors } } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    handleLogin(data); // Assuming handleLogin is defined elsewhere
  };
// Handle gradient color change on click
const handlePress = () => {
    setGradientColors(['blue', 'purple']); // Change gradient colors on press
  };
  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
      <ScrollView>
        <Text style={{ fontWeight: '500', fontSize: 20, color: 'black' }}>Add Property</Text>

        {/* Property name input */}
        <Controller
          control={control}
          name="property_name"
          rules={{
            required: 'Property name is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Property name"
              onBlur={onBlur}
              handlechange={onChange}
              value={value}
            />
          )}
        />
        {errors.property_name && <Text style={styles.errorText}>{errors.property_name.message}</Text>}

        {/* Select category */}
        <Controller
          control={control}
          name="category"
          rules={{
            required: 'Category is required', // Category validation rule
          }}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value} // The currently selected value
              onValueChange={onChange} // Updates the form state when an option is selected
              style={styles.picker}
            >
              <Picker.Item label="Select category" value="" />
              {catData?.data?.map((val, index) => {
                return (
                  <Picker.Item key={index} label={val.category} value={val.id} />
                );
              })}
            </Picker>
          )}
        />
        {errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}

       
             {/* price name input with numeric validation */}
        <Controller
          control={control}
          name="price"
          rules={{
            required: 'Price is required',
            validate: (value) => {
              // Regular expression to check if the value contains only numeric values
              const regex = /^[0-9]+$/;
              if (!regex.test(value)) {
                return 'Price must be numeric';
              }
              return true; // Return true if validation passes
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Price"
              onBlur={onBlur}
              handlechange={onChange}
              value={value}
            />
          )}
        />
        {errors.price && <Text style={styles.errorText}>{errors.price.message}</Text>}
        <View style={{ flexDirection: 'row', width: '99%', justifyContent: 'space-around' }}>
      {/* Property Name Input */}
      <Controller
        control={control}
        name="property_name"
        rules={{
          required: 'Property name is required',
          validate: (value) => {
            const regex = /^[0-9]+$/; // Only numeric values allowed
            if (!regex.test(value)) {
              return 'Property name must be numeric';
            }
            return true; // Validation passes
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <LinearGradient
            colors={gradientColors} // Dynamic gradient colors
            style={styles.gradient}
          >
            <Input
              placeholder="Property name"
              onBlur={onBlur}
              handlechange={onChange}
              value={value}
            />
          </LinearGradient>
        )}
      />
      {errors.property_name && <Text style={styles.errorText}>{errors.property_name.message}</Text>}

      {/* Category Selection with LinearGradient */}
      <Controller
        control={control}
        name="category"
        rules={{
          required: 'Category is required',
        }}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity onPress={handlePress}>
            <LinearGradient
              colors={gradientColors} // Dynamic gradient colors
              style={styles.gradient}
            >
              <Text style={styles.text}>Category Selection</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
      {errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}
    </View>
        

      </ScrollView>
    </View>
  );
};

export default PropertyForm;

const styles = StyleSheet.create({
  
  picker: {
    height: 60,
    width: '100%',
    marginTop: 10,
    backgroundColor:'#F2F3F3',
    borderRadius:10,
    overflow:'hidden',
    color:'#888888'
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  submitText: {
    color: 'blue',
    marginTop: 20,
  },
  gradient: {
    width: '45%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10, // Space between components
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
