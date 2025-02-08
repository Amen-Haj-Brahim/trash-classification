import React, { useState } from "react";
import { View, Button, Image, Alert, Text, TextInput } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const ImagePickerComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [res, setRes] = useState("");

  console.log("ImagePickerComponent is rendering...");

  // Function to select an image
  const pickImage = () => {
    launchImageLibrary(
      { mediaType: "photo", includeBase64: true },
      (response) => {
        if (response.didCancel) {
          Alert.alert("Selection cancelled");
        } else if (response.errorMessage) {
          Alert.alert("Error:", response.errorMessage);
        } else {
          setSelectedImage(response.assets[0]);
        }
      }
    );
  };

  // Function to upload image
  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName,
    });

    // try {
    //   const response = await axios.post(
    //     'http://127.0.0.1:8000/upload/',
    //     formData,
    //     { headers: { 'Content-Type': 'multipart/form-data' },
    //     body: JSON.stringify({
    //       image: photo.base64,
    //       name:"amen"
    //     }), },
    //   );
    //   Alert.alert("Result:", response.data.classification);
    // } catch (error) {
    //   Alert.alert('Error uploading image', error.message);
    // }
    fetch("http://192.168.1.24:8000/upload/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: selectedImage.base64,
      }),
    })
      .then((res) => res.json())
      .then((res) => setRes(res))
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> Image Picker Screen</Text>
      <Button title="Select Image" onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: 300, height: 300 }}
        />
      )}
      <Button title="Upload & Classify" onPress={uploadImage} />
      <Text style={{ fontSize: 20 }}>Result:</Text>
      <TextInput
        style={{ fontSize: 20, textAlign: "center" }}
        value={res.res}
      ></TextInput>
    </View>
  );
};

export default ImagePickerComponent;
