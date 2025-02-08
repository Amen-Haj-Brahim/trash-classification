import React, { useState } from 'react';
import { View, Button, Image, Alert, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const ImagePickerComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  console.log("ImagePickerComponent is rendering...");

  // Function to select an image
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('Selection cancelled');
      } else if (response.errorMessage) {
        Alert.alert('Error:', response.errorMessage);
      } else {
        setSelectedImage(response.assets[0]); 
  }});
  };

  // Function to upload image
  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName,
    });

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/upload/', 
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      Alert.alert("Result:", response.data.classification);
    } catch (error) {
      Alert.alert('Error uploading image', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>📸 Image Picker Screen</Text>
      <Button title="Select Image" onPress={pickImage} />
      {selectedImage && (
        <Image source={{ uri: selectedImage.uri }} style={{ width: 300, height: 300 }} />
      )}
      <Button title="Upload & Classify" onPress={uploadImage} />
    </View>
  );
};

export default ImagePickerComponent;
