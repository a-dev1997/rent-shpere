import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput,Image,Button,Linking } from "react-native";
import Input from "../component/input";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { useState } from "react";
import DocumentPicker from 'react-native-document-picker'
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import GetLocation from "react-native-get-location";
import { WebView } from 'react-native-webview';




const PropertyForm = () => {
  const nav=useNavigation()
  const [latitude,setLatitude] =useState(40.7128) ;
  const [longitude ,setLongitude]=useState(-74.0060) ;

 
  const { catData, catStatus } = useSelector((state) => state.category);
  const { data: userInfoData, status } = useSelector((state) => state.userInfo); 
  const [isLoading, setIsLoading] = useState(false); // Track the loading state
  console.log('Categories:', JSON.stringify(catData));
  const [location, setLocation] = useState(null);
  const [gradientColors, setGradientColors] = useState(['green', 'red']); // Ini
  const { control, handleSubmit,watch,setValue, formState: { errors } } = useForm(
    {
      defaultValues: {
        features: [], // Initialize as an empty array
      },
    }
  );
 const {statesData,statesStatus}=useSelector((state)=>state.statesData)
 const selectedItems = watch("selectedItems", []);

 const [images,setImages]=useState([]);
 console.log("Form Errors:", errors);

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    
    handleUpload(data)
     handleSubmit(data); // Assuming handleLogin is defined elsewhere
  };
 

  const renderCustomRadioButton = (value, label, selectedValue, onChange,customWidth) => (
    <TouchableOpacity
      style={{
       
        marginVertical:5,
        width:customWidth
 
      }}
      onPress={() => onChange(value)}
    >
      <LinearGradient
        colors={selectedValue === value?['#315EE7', '#6246EA']:['white','white']}
        style={{ borderRadius: 20,borderWidth:1,borderColor:selectedValue === value?'white':'black' }}
      >
        <Text
          style={{ color:selectedValue === value? 'white':'black', fontWeight: 700, fontSize: 14, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10 }}
        >
          {label}
        </Text>
      </LinearGradient>

    </TouchableOpacity>
  );

   // Function to get the current location
   const currentLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });

      // Set the location in state and populate form fields
      setLocation(location);
      setValue('latitude', location.latitude.toString());
      setValue('longitude', location.longitude.toString());
      setLatitude(location.latitude);
      setLongitude(location.longitude)

    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const handleImages=async(onChange)=>{
    try {
      const res  = await DocumentPicker.pick({
          type: [DocumentPicker.types.images], // You can specify file types like .pdf, .docx, etc.
          allowMultiSelection:true
      });
setImages((oldimg)=>  [...oldimg,...res])
onChange(res);
      console.log('Picked document2:',images );
  } catch (err) {
      if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the picker');
      } else {
          console.log('Unknown error: ', err);
      }
  }
  }


  
  // Checkbox options
  const checkboxOptions = [
    { label: 'Wi-Fi', value: 'wifi' },
    { label: 'Pool', value: 'pool' },
    { label: 'Gym', value: 'gym' },
    { label: 'Parking', value: 'parking' },
  ];

 
// Handle form data upload
const handleUpload = async (data) => {
  setIsLoading(true); // Set loading state to true when API starts
  const formData = new FormData();

  // Append images to FormData (if images are selected)
  if (images) {
    images.forEach((file) => {
      formData.append('images[]', {
        uri: file.uri,
        type: file.type, // MIME type of the file
        name: file.name, // File name
      });
    });
  }

  // Convert features array into a string, if it's an array
  if (Array.isArray(data.features)) {
    formData.append('features', data.features.join(',')); // Join the array into a string
  } else {
    formData.append('features', data.features); // If it's already a string, just append it
  }

  // Append other form data
  formData.append("category_id", data.category);
  formData.append("property_name", data.property_name);
  formData.append("price", data.price);
  formData.append("description", data.description);
  formData.append("phone", 1234567890);
  formData.append("zip_code", data.zip_code);
  formData.append("bathroom", data.bathrooms);
  formData.append("construction_status", data.construction_status);
  formData.append("maintenance", data.maintenance);
  formData.append("super_builtup_area", data.super_builtup_area);
  formData.append("floors", data.floors);
  formData.append("bedrooms", data.bedrooms);
  formData.append("total_floors", data.total_floors);
  formData.append("carparking", 1);
  formData.append("project_name", data.project_name);
  formData.append("state", data.state);
  formData.append("listed_by", data.listed_by);
  formData.append("facing", data.facing);
  formData.append("status", data.status);
  formData.append("payment_type", data.payment_type);
  formData.append("address", data.address);
  formData.append("carpet_area", data.carpet_area);
  formData.append("city", data.city);
  formData.append("furnishing", data.furnishing);
  formData.append("latitude",data.latitude)
  formData.append("longitude",data.longitude);
  console.log('Form Data:', formData);

  try {
    // Make the upload request using axios
    const response = await axios.post('https://rentsphere.onavinfosolutions.com/api/property-added-to-user', formData, {
      headers: {
        'Authorization': `Bearer ${userInfoData.token}`,
        'Content-Type': 'multipart/form-data', // Set Content-Type as multipart/form-data for file uploads
      },
    });
    
    console.log('Upload Result:', response.data);
    // Handle result if necessary

     // Show the BookingSuccessScreen modal on successful upload
       // Use useNavigation to navigate to the modal
   if(response.data.message){
    nav.navigate('showmodal', {
      message: 'Your property has been successfully submitted!',
      buttonname:'back to home',
      componentId:'Mytabs',
    });
  }else{

    nav.navigate('showmodal', {
      message: 'Your property submission has been failed',
      buttonname:'back to home',
      componentId:'Mytabs',
    });
    
  }
  } catch (err) {
    console.log('Upload Error:', err);
    // Handle error if necessary
  } finally {
    setIsLoading(false); // Ensure loading state is false when done
  }
};

// Function to handle navigation state changes and extract coordinates
  const handleNavigationStateChange = (event) => {
    const { url } = event; // Get the current URL

    console.log("Current URL:", url); // Log the URL for debugging

    // Regular expression to match the pattern of the URL with latitude and longitude
    const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/); // Matches latitude and longitude
    if (match) {
      const newLatitude = parseFloat(match[1]); // Extract latitude
      const newLongitude = parseFloat(match[2]); // Extract longitude
console.log('new'+newLatitude)
     
        setValue('latitude',newLatitude.toString()); // Update latitude state
        setValue('longitude',newLongitude.toString()); // Update longitude state
      
    }
  };


  const removeImage = (indx) => {
    console.log(indx)
    let b = images.slice(0, indx)
    console.log(b)
    setImages(b)
  setValue('images',images)
  if(images.length==1){
    setValue('images','')
  }
  }
  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
      <ScrollView>
        <Text style={{ fontWeight: '500', fontSize: 20, color: 'black' }}>Add Property</Text>

      {/* <Controller
      control={control}
      name="featureImage"

         render={({field: {onChange,value}})=>(
         <TouchableOpacity onPress={()=>{handleImagePicker(onChange)}} style={[styles.uploadButton,{borderStyle:value?'':'dashed'}]} >
        
        {value ? 
            // <Text style={styles.fileInfo}>{`Selected: ${value[0]?.name}`}</Text>
            <Image style={{width:'100%',height:'100%'}} source={{uri:value[0].uri}} />:<Text style={styles.uploadText}>Upload</Text>
          }
      </TouchableOpacity>
  )}
        /> */}
<View  style={{backgroundColor:'#F2F3F3',flexDirection:'row',justifyContent:'flex-start',flexWrap:'wrap',marginVertical:10,borderRadius:10}}>
{images!=null ? 
           images?.map((val,index)=>{
            return(
              <View style={{width:'30%',margin:5,position:'relative'}}>
                 <TouchableOpacity onPress={()=>{removeImage(index)}} style={{position:"absolute",top:5,right:5,zIndex:999 }}>
                    <Image style={{height:20,width:20,}} source={require('../assets/appimages/trash.png')} />
                    </TouchableOpacity>
<Image key={index} style={{height:100,width:'100%'}} source={{uri:val.uri}} /> 
 </View>)
           }):''
           
            
}
<Controller
      control={control}
      name="images"
      rules={{
        required: 'please upload atleast one image',
      }}
         render={({field: {onChange,value}})=>(
         <TouchableOpacity onPress={()=>{handleImages(onChange)}} style={[styles.uploadButton,{margin:5}]} >
        <Text style={styles.uploadText}>+ Upload</Text>
        {/* {value && (
            <Text style={styles.fileInfo}>{`Selected: ${value[0]?.name}`}</Text>
          )} */}
      </TouchableOpacity>
  )}
        />
        {errors.images && <Text style={styles.errorText}>{errors.images.message}</Text>}
</View>
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
           {/* payment with React Hook Form Controller */}
        <Text style={{marginTop:5,fontWeight:500}}>Payment type</Text>
        {errors.payment_type && <Text style={styles.errorText}>{errors.payment_type.message}</Text>}
     
        <Controller
          control={control}
          name="payment_type"
          rules={{
            required: 'please select category', // Category validation rule
          }}
          render={({ field: { onChange, value } }) => (

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '99%', alignContent: 'center',marginTop:10 }}>
              {renderCustomRadioButton('month', 'month', value, onChange,'45%')}
              {renderCustomRadioButton('year', 'year', value, onChange,'45%')}

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
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{width:'48%'}}>
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
        </View>
         <View style={{width:'48%'}}>
          
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
         </View>

        </View>

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

             {/* sucurity name input with numeric validation */}
        <Controller
          control={control}
          name="maintenance"
          rules={{
            required: 'security deposit is required',
            validate: (value) => {
              // Regular expression to check if the value contains only numeric values
              const regex = /^[0-9]+$/;
              if (!regex.test(value)) {
                return 'security deposit must be numeric';
              }
              return true; // Return true if validation passes
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput placeholder="Security amount" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50, marginTop: 10 }} value={value} onChangeText={onChange} />
          )}
        />
        {errors.maintenance && <Text style={styles.errorText}>{errors.maintenance.message}</Text>}

         {/* sucurity name input with numeric validation */}
         <Controller
          control={control}
          name="construction_status"
          rules={{
            required: 'construction status is required',
            // validate: (value) => {
            //   // Regular expression to check if the value contains only numeric values
            //   const regex = /^[0-9]+$/;
            //   if (!regex.test(value)) {
            //     return 'security deposit must be numeric';
            //   }
            //   return true; // Return true if validation passes
            // },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput placeholder="construction status ie:ready to move" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50, marginTop: 10 }} value={value} onChangeText={onChange} />
          )}
        />
        {errors.construction_status && <Text style={styles.errorText}>{errors.construction_status.message}</Text>}

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>

          <View style={{width:'48%'}}>
                 {/* bedroom name input with numeric validation */}
          <Controller
          control={control}
          name="bedrooms"
          rules={{
            required: ' this field is required',
            validate: (value) => {
              // Regular expression to check if the value contains only numeric values
              const regex = /^[0-9]+$/;
              if (!regex.test(value)) {
                return ' this must be numeric';
              }
              return true; // Return true if validation passes
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput placeholder="bedrooms" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50, marginTop: 10 }}  value={value} onChangeText={onChange} />
          )}
        />
        {errors.bedrooms && <Text style={styles.errorText}>{errors.bedrooms.message}</Text>}
        </View>
        <View style={{width:'48%'}}>
           {/* bathrooms name input with numeric validation */}
           <Controller
          control={control}
          name="bathrooms"
          rules={{
            required: 'this is required',
            validate: (value) => {
              // Regular expression to check if the value contains only numeric values
              const regex = /^[0-9]+$/;
              if (!regex.test(value)) {
                return ' this must be numeric';
              }
              return true; // Return true if validation passes
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput placeholder="bathrooms" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50, marginTop: 10 }} value={value} onChangeText={onChange} />
          )}
        />
        {errors.bathrooms && <Text style={styles.errorText}>{errors.bathrooms.message}</Text>}

        </View>

        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>

{/* super built up area name input with numeric validation */}
<View style={{width:'48%'}}>
<Controller
control={control}
name="super_builtup_area"
rules={{
required: 'zip code is required',
validate: (value) => {
// Regular expression to check if the value contains only numeric values
const regex = /^[0-9]+$/;
if (!regex.test(value)) {
return ' this must be numeric';
}
return true; // Return true if validation passes
},
}}
render={({ field: { onChange, onBlur, value } }) => (
<TextInput placeholder="BuiltUp area" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50, marginTop: 10 }}  value={value} onChangeText={onChange} />
)}
/>
{errors.super_builtup_area && <Text style={styles.errorText}>{errors.super_builtup_area.message}</Text>}
</View>
<View style={{width:'48%'}}>
{/* carpet_area name input with numeric validation */}
<Controller
control={control}
name="carpet_area"
rules={{
required: 'this is required',
validate: (value) => {
// Regular expression to check if the value contains only numeric values
const regex = /^[0-9]+$/;
if (!regex.test(value)) {
return ' this must be numeric';
}
return true; // Return true if validation passes
},
}}
render={({ field: { onChange, onBlur, value } }) => (
<TextInput placeholder="Carpet area" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50, marginTop: 10 }} value={value} onChangeText={onChange} />
)}
/>
{errors.carpet_area && <Text style={styles.errorText}>{errors.carpet_area.message}</Text>}
</View>


</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{width:'48%'}}>
{/* floors up area name input with numeric validation */}
<Controller
control={control}
name="floors"
rules={{
required: 'zip code is required',
validate: (value) => {
// Regular expression to check if the value contains only numeric values
const regex = /^[0-9]+$/;
if (!regex.test(value)) {
return ' this must be numeric';
}
return true; // Return true if validation passes
},
}}
render={({ field: { onChange, onBlur, value } }) => (
<TextInput placeholder="Floor" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50, marginTop: 10 }}  value={value} onChangeText={onChange} />
)}
/>
{errors.floors && <Text style={styles.errorText}>{errors.floors.message}</Text>}
</View>
<View style={{width:'48%'}}>
{/* total floors name input with numeric validation */}
<Controller
control={control}
name="total_floors"
rules={{
required: 'this is required',
validate: (value) => {
// Regular expression to check if the value contains only numeric values
const regex = /^[0-9]+$/;
if (!regex.test(value)) {
return ' this must be numeric';
}
return true; // Return true if validation passes
},
}}
render={({ field: { onChange, onBlur, value } }) => (
<TextInput placeholder="Total floors" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50, marginTop: 10 }} value={value} onChangeText={onChange} />
)}
/>
{errors.total_floors && <Text style={styles.errorText}>{errors.total_floors.message}</Text>}
</View>


</View>
 
 <Text style={{marginTop:5,fontWeight:500}}>Facilities</Text>
{errors.features && <Text style={styles.errorText}>{errors.features.message}</Text>}
   {/* Controller for managing checkbox group */}
   <Controller
        control={control}
        name="features"
        rules={{
          required: 'please select ',
        }}
        render={({ field: { onChange, value = [] } }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center',marginTop:10,flexWrap:'wrap',width:'99%' }}>
           {checkboxOptions.map((option) => (
              <CustomCheckbox
                key={option.value}
                label={option.label}
                value={value.includes(option.value)} // Check if the option is selected
                onChange={(checked) => {
                  const newValue = checked
                    ? [...value, option.value] // Add option if checked
                    : value.filter((v) => v !== option.value); // Remove option if unchecked
                  onChange(newValue); // Update form state with new array
                }}
                customWidth={100} // Optionally pass custom width for each checkbox
              />
            ))}
          </View>
        )}
      />
    
 {/* RadioButton with React Hook Form Controller */}
<Text style={{marginTop:5,fontWeight:500}}>Facing</Text>
{errors.facing && <Text style={styles.errorText}>{errors.facing.message}</Text>}

       
        <Controller
          control={control}
          name="facing"
          rules={{
            required: 'please select ',
          }}
          render={({ field: { onChange, value } }) => (

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignContent: 'center',marginTop:10,flexWrap:'wrap',width:'99%' }}>
              {renderCustomRadioButton('north', 'North', value, onChange)}
              {renderCustomRadioButton('south', 'South', value, onChange)}
              {renderCustomRadioButton('east', 'East', value, onChange)}
              {renderCustomRadioButton('west', 'West', value, onChange)}
              {renderCustomRadioButton('north-east', 'North-East', value, onChange)}
              {renderCustomRadioButton('north-west', 'North-west', value, onChange)}
              {renderCustomRadioButton('south-east', 'South-East', value, onChange)}
              {renderCustomRadioButton('south-west', 'South-West', value, onChange)}

              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="third" />
              <Text>Third Option</Text>
            </View> */}
            </View>

          )}
        />
         
            {/* furnishing by with React Hook Form Controller */}
            <Text style={{marginTop:5,fontWeight:500}}>Furnishing</Text>
            {errors.furnishing && <Text style={styles.errorText}>{errors.furnishing.message}</Text>}
        <Controller
          control={control}
          name="furnishing"
          rules={{
            required: 'please select one',
          }}
          // defaultValue="first"
          render={({ field: { onChange, value } }) => (

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '99%', alignContent: 'center',marginTop:10 }}>
              {renderCustomRadioButton('fully-furnished', 'fully-furnished', value, onChange)}
              {renderCustomRadioButton('semi-furnished', 'Semi-furnished', value, onChange)}
              {renderCustomRadioButton('unfurnished', 'Unfurnished', value, onChange)}

              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="third" />
              <Text>Third Option</Text>
            </View> */}
            </View>

          )}
        />
       
          


          {/* listed by with React Hook Form Controller */}
          <Text style={{marginTop:5,fontWeight:500}}>Listed by</Text>
          {errors.listed_by && <Text style={styles.errorText}>{errors.listed_by.message}</Text>}
        <Controller
          control={control}
          name="listed_by"
          rules={{
            required: 'please select one',
          }}
          // defaultValue="first"
          render={({ field: { onChange, value } }) => (

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '99%', alignContent: 'center',marginTop:10 }}>
              {renderCustomRadioButton('agent', 'Agent', value, onChange,'45%')}
              {renderCustomRadioButton('owner', 'Owner', value, onChange,'45%')}

              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="third" />
              <Text>Third Option</Text>
            </View> */}
            </View>

          )}
        />
      

         <Text style={{marginTop:5,fontWeight:500}}>Status</Text>
         {errors.status && <Text style={styles.errorText}>{errors.status.message}</Text>}
        {/* RadioButton with React Hook Form Controller */}
        <Controller
          control={control}
          rules={{
            required: 'please select one',
          }}
          name="status"
          // defaultValue="first"
          render={({ field: { onChange, value } }) => (

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '99%', alignContent: 'center',marginTop:10 }}>
              {renderCustomRadioButton('active', 'Active', value, onChange,'45%')}
              {renderCustomRadioButton('inactive', 'Inactive', value, onChange,'45%')}

              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="third" />
              <Text>Third Option</Text>
            </View> */}
            </View>

          )}
        />
           {/* Property name input */}
           <Controller
          control={control}
          name="project_name"
          rules={{
            required: 'project name is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput placeholder="Project name" style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50 ,marginVertical:5}} value={value} onChangeText={onChange} />
          )}
        />
        {errors.project_name && <Text style={styles.errorText}>{errors.project_name.message}</Text>}
        

                {/* Property name input */}
                <Controller
          control={control}
          name="latitude"
          // rules={{
          //   required: 'latitude name is required',
          // }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput placeholder="latitude " style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50 ,marginVertical:5}} value={value} onChangeText={onChange} />
          )}
        />
        {errors.latitude && <Text style={styles.errorText}>{errors.latitude.message}</Text>}

                  {/* Property name input */}
                  <Controller
          control={control}
          name="longitude"
          // rules={{
          //   required: 'longitude ',
          // }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput placeholder="longitude " style={{ backgroundColor: '#F2F3F3', borderRadius: 10, color: "#888888", height: 50 ,marginVertical:5}} value={value} onChangeText={onChange} />
          )}
        />
        {errors.longitude && <Text style={styles.errorText}>{errors.longitude.message}</Text>}
        <WebView
        source={{ uri: `https://www.google.com/maps?q=${latitude},${longitude}` }}
        style={{height:600}}
        onNavigationStateChange={handleNavigationStateChange} // Track URL changes
      />



<TouchableOpacity
      style={{
       
        marginVertical:5,
        
 
      }}
      onPress={currentLocation}
    >
      <LinearGradient
        colors={['#315EE7', '#6246EA']}
        style={{ borderRadius: 20,}}
      >
        <Text
          style={{ color:'white', fontWeight: 700, fontSize: 20, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10,textAlign:'center' }}
        >
          get current logitude and latitude
        </Text>
      </LinearGradient>

    </TouchableOpacity>          


         <TouchableOpacity
      style={{
       
        marginVertical:5,
        
 
      }}
      onPress={handleSubmit(onSubmit)}
    >
      <LinearGradient
        colors={['#315EE7', '#6246EA']}
        style={{ borderRadius: 20,}}
      >
        <Text
          style={{ color:'white', fontWeight: 700, fontSize: 20, fontStyle: 'italic', paddingHorizontal: 15, paddingVertical: 10,textAlign:'center' }}
        >
          Submit
        </Text>
      </LinearGradient>

    </TouchableOpacity>
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
  uploadButton: {
    
    height: 100,
    width:100,
    borderWidth: 2,
    borderStyle: 'dashed', // This makes the border dotted
    borderColor: '#315EE7', // You can change the color here
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Rounded corners
    backgroundColor: '#F4F8FF', // Light background
  },
  uploadText: {
    color: '#315EE7', // Text color for upload
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// CustomCheckbox component
const CustomCheckbox = ({ label, value, onChange, customWidth }) => {
  return (
    <TouchableOpacity
      style={{
        marginVertical: 5,
        width: customWidth,
      }}
      onPress={() => onChange(!value)} // Toggle the checkbox value when clicked
    >
      <LinearGradient
        colors={value ? ['#315EE7', '#6246EA'] : ['white', 'white']}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: value ? 'white' : 'black',
          backgroundColor: value ? 'transparent' : 'white', // Adjust for color based on state
        }}
      >
        <Text
          style={{
            color: value ? 'white' : 'black',
            fontWeight: '700',
            fontSize: 14,
            fontStyle: 'italic',
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        >
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
