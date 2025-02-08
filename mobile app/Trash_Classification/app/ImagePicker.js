import React,{ useState } from 'react';
import { View , Button, Image, Alert} from 'react-native';
import { launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';


const ImagePickerComponent = async () => {

    const [ selectedImage, setSelectedImage ] = useState(null);

    const pickImage=()=>{
        launchImageLibrary({ mediaType: 'photo'}, (response) => {
            if (response.didCancel){
                Alert.alert('Selection cancelled');
            }else if(response.errorMessage){
                Alert.alert('Error:', response.errorMessage);
        }else{
            setSelectedImage(response.assets[0]);
        }
        });
};
    const uploadImage= async()=>{
        if(!selectedImage){
            Alert.alert('Please select an image');
            return;
        }
}
    const formData = new FormData();
    formData.append('file', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName,
    });
    try{
        const response = await axios.post('http://127.0.0.1:8000/upload/', formData, {headers : {'Content-Type': 'multipart/form-data'}});
        Alert.alert("Result :", response.data.classification );
    }catch (error){
        Alert.alert('Error uploading image ', error.message);
    }
    return(
        <View>
            <Button title="Select Image " onPress={pickImage}/>
            {selectedImage && <Image source={{uri: selectedImage.uri}} style={{width: 300, height: 300}} />}
            <Button title="Upload & Classify" onPress={uploadImage}/>
        </View>
    );

};

export default ImagePickerComponent;

