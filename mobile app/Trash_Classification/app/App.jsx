import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import ImagePickerComponent from './ImagePicker';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text> App Loaded</Text>  
      <ImagePickerComponent />
    </SafeAreaView>
  );
};

export default App;
