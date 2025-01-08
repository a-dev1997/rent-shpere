import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
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
 const {statesData,statesStatus}=useSelector((state)=>state.statesData)
 console.log(statesData)
  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    handleLogin(data); // Assuming handleLogin is defined elsewhere
  };
  // Handle gradient color change on click
  const handlePress = () => {
    setGradientColors(['blue', 'purple']); // Change gradient colors on press
  };

  const renderCustomRadioButton = (value, label, selectedValue, onChange) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
       
        width: '45%',

      }}
      onPress={() => onChange(value)}
    >
      <LinearGradient
        colors={selectedValue === value?['#315EE7', '#6246EA']:['white','white']}
        style={{ borderRadius: 20,width:'100%',borderWidth:1,borderColor:selectedValue === value?'black':'' }}
      >
        <Text
          style={{ color:selectedValue === value? 'white':'black', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}
        >
          {label}
        </Text>
      </LinearGradient>

    </TouchableOpacity>
  );


  const customCheckbox = ( isChecked, onToggle, label ) => {
    // const borderRadius = shape === 'circle' ? size / 2 : shape === 'square' ? 0 : size / 4; // Conditional shape logic
  
    return (
      <TouchableOpacity onPress={onToggle} style={{ flexDirection: 'row', alignItems: 'center' ,flexWrap:"wrap"}}>
       
          <LinearGradient
        colors={isChecked?['#315EE7', '#6246EA']:['white','white']}
        style={{ borderRadius: 20,borderWidth:1,borderColor:isChecked?'':'black' }}
      >
        <Text
          style={{ color:isChecked? 'white':'black', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}
        >
          {label}
        </Text>
      </LinearGradient>
        {/* </View> */}
        
      </TouchableOpacity>
    );
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
            <TextInput placeholder="Property name" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50 }} value={value} onChangeText={onChange} />
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
            <TextInput placeholder="Price" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50, marginTop: 10 }} value={value} onChangeText={onChange} />
          )}
        />
        {errors.price && <Text style={styles.errorText}>{errors.price.message}</Text>}
        {/* RadioButton with React Hook Form Controller */}
        <Controller
          control={control}
          name="radioOption"
          defaultValue="first"
          render={({ field: { onChange, value } }) => (

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignContent: 'center',marginTop:10 }}>
              {renderCustomRadioButton('month', 'month', value, onChange)}
              {renderCustomRadioButton('year', 'year', value, onChange)}

              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="third" />
              <Text>Third Option</Text>
            </View> */}
            </View>

          )}
        />
         {/* Description name input */}
         <Controller
          control={control}
          name="description"
          rules={{
            required: 'description name is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput placeholder="description" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50 ,marginTop:10}} value={value} onChangeText={onChange} multiline={true} />
          )}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}

           {/* address name input */}
         <Controller
          control={control}
          name="address"
          rules={{
            required: 'address name is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput placeholder="address" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50 ,marginTop:10}} value={value} onChangeText={onChange} multiline={true} />
          )}
        />
        {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}

           {/* city name input */}
         <Controller
          control={control}
          name="city"
          rules={{
            required: 'city name is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput placeholder="city" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50 ,marginTop:10}} value={value} onChangeText={onChange}  />
          )}
        />
        {errors.city && <Text style={styles.errorText}>{errors.city.message}</Text>}

         {/* Select category */}
         <Controller
          control={control}
          name="state"
          rules={{
            required: 'Category is required', // Category validation rule
          }}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value} // The currently selected value
              onValueChange={onChange} // Updates the form state when an option is selected
              style={styles.picker}
            >
              <Picker.Item label="Select state" value="" />
              {statesData?.data?.map((val, index) => {
                return (
                  <Picker.Item key={index} label={val.states} value={val.id} />
                );
              })}
            </Picker>
          )}
        />
        {errors.state && <Text style={styles.errorText}>{errors.state.message}</Text>}


          {/* zipcode name input with numeric validation */}
          <Controller
          control={control}
          name="zip_code"
          rules={{
            required: 'zip code is required',
            validate: (value) => {
              // Regular expression to check if the value contains only numeric values
              const regex = /^[0-9]+$/;
              if (!regex.test(value)) {
                return 'zip code must be numeric';
              }
              return true; // Return true if validation passes
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput placeholder="Zip code" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50, marginTop: 10 }} value={value} onChangeText={onChange} />
          )}
        />
        {errors.zip_code && <Text style={styles.errorText}>{errors.zip_code.message}</Text>}

  {/* Custom Checkbox with React Hook Form */}
  <Controller
        control={control}
        name="facilities"
        defaultValue={false}
        rules={{
          required: 'You must select the checkbox.',
        }}
        render={({ field: { onChange, value } }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center',flexWrap:'wrap' }}>
          {/* Use the CustomCheckbox function */}
          {customCheckbox(value, () => onChange(!value), 'wifi')}
          {customCheckbox(value, () => onChange(!value), 'Ari condition')}
          {customCheckbox(value, () => onChange(!value), 'security')}
        </View>

        )}
      />


      </ScrollView>
    </View>
  );
};

export default PropertyForm;

const styles = StyleSheet.create({

  picker: {
    height: 50,
    width: '100%',
    marginTop: 10,
    backgroundColor: '#F2F3F3',
    borderRadius: 10,
    overflow: 'hidden',
    color: '#888888'
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  submitText: {
    color: 'blue',

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
