import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ShowModel = () => {
  const nav = useNavigation();
  const route = useRoute();
  const { message, componentId, buttonname } = route.params;

  useEffect(() => {
    const backAction = () => {
      nav.navigate(componentId); // Replace 'Home' with the name of your home screen
      return true; // Prevent the default back action
    };

    // Add back handler listener
    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup the listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [nav]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontWeight: '500', fontSize: 20 }}>{message}</Text>
      <TouchableOpacity
        style={{ backgroundColor: '#13C39C' }}
        onPress={() => { nav.navigate(componentId); }}
      >
        <Text style={{ fontSize: 16, color: 'white', paddingVertical: 10, paddingHorizontal: 20, textAlign: 'center' }}>
          {buttonname}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShowModel;
