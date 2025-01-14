import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';

const EditProfile = () => {
    const nav = useNavigation();
    const [file, setFile] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); // To control modal visibility
    const [selectedImageUri, setSelectedImageUri] = useState(null); // To store the URI of the selected image

    // Redux selectors
    const { profiledata } = useSelector((state) => state.userProfile);
    const { data } = useSelector((state) => state.userInfo);

    // React Hook Form
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            setFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Unknown error: ', err);
            }
        }
    };

    const onSubmit = async (formData) => {
        setLoading(true);
        const { name, phone, address, city, state, gender } = formData;

        const formImg = new FormData();
        if (file) {
            formImg.append('profile_image', file[0]);
            try {
                await axios.post('https://rentsphere.onavinfosolutions.com/api/profile-pic-update', formImg, {
                    headers: {
                        'Authorization': `Bearer ${data.token}`,
                    }
                });
            } catch (err) {
                console.error('Profile image update failed', err);
            }
        }

        const userData = new FormData();
        userData.append('name', name);
        userData.append('gender', gender);
        userData.append('phone', phone);
        userData.append('address', address);
        userData.append('city', city);
        userData.append('state', state);

        try {
            await axios.post('https://rentsphere.onavinfosolutions.com/api/update-profile', userData, {
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                }
            });
            nav.goBack();
        } catch (err) {
            console.error('Profile update failed', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Set initial form values from profiledata
        if (profiledata) {
            setValue('name', profiledata.data.name);
            setValue('phone', profiledata.data.phone);
            setValue('address', profiledata.data.address);
            setValue('city', profiledata.data.city);
            setValue('state', profiledata.data.state);
            setValue('gender', profiledata.data.gender);
        }
    }, [profiledata, setValue]);

    // Open modal with the image
    const handleImageClick = (uri) => {
        setSelectedImageUri(uri);
        setModalVisible(true);
    };

    return (
        <ScrollView style={{ padding: 20 }}>
            {/* Profile Image */}
            <TouchableOpacity onPress={() => handleImageClick( profiledata.data ? `https://rentsphere.onavinfosolutions.com/public/${profiledata.data.profile_img}` : '')}>
                {file == null ? (
                    <Image
                        style={{ height: 200, width: '100%', borderRadius: 10 }}
                        source={profiledata.data ? { uri: `https://rentsphere.onavinfosolutions.com/public/${profiledata.data.profile_img}` } : ''}
                    />
                ) : (
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 50 }}
                        source={{ uri: file[0].uri }}
                    />
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={pickDocument}>
                <Text style={{ textAlign: 'center', marginVertical: 10 }}>Change Profile</Text>
            </TouchableOpacity>

            {/* Form Fields */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            onChangeText={onChange}
                            style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: '70%' }}
                            value={value}
                            placeholder="Enter your name"
                        />
                    )}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 }}>
                <View style={{ flex: 1 }}>
                    <Controller
                        control={control}
                        name="gender"
                        render={({ field: { onChange, value } }) => (
                            <Picker
                                selectedValue={value}
                                onValueChange={onChange}
                                style={{ height: 50, width: '100%' }}
                            >
                                <Picker.Item label="Male" value="M" />
                                <Picker.Item label="Female" value="F" />
                            </Picker>
                        )}
                    />
                </View>
                <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            keyboardType="numeric"
                            onChangeText={onChange}
                            style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: '40%' }}
                            value={value}
                            placeholder="Enter phone number"
                        />
                    )}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 }}>
                <Controller
                    control={control}
                    name="city"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            onChangeText={onChange}
                            style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: '40%' }}
                            value={value}
                            placeholder="Enter city"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="address"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            onChangeText={onChange}
                            style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: '40%' }}
                            value={value}
                            placeholder="Enter address"
                        />
                    )}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 }}>
                <Controller
                    control={control}
                    name="state"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            onChangeText={onChange}
                            style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: '40%' }}
                            value={value}
                            placeholder="Enter state"
                        />
                    )}
                />
            </View>

            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ backgroundColor: '#1C183D', paddingVertical: 10, borderRadius: 10, marginVertical: 20 }}>
                {isLoading ? (
                    <ActivityIndicator size={20} color="white" />
                ) : (
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Update</Text>
                )}
            </TouchableOpacity>

            {/* Modal for Fullscreen Image */}
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
                        {/* Close button */}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        <Image
                            style={styles.fullScreenImage}
                            source={{ uri:`${selectedImageUri}` }}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // Ensures the image scales correctly
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        borderRadius: 30,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default EditProfile;
