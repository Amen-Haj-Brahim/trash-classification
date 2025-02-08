import React,{ useState } from 'react';
import { View , Button, Image, Alert} from 'react-native';
import { launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';


const ImagePickerComponent = () => {

    const { selectedImage, setSelectedImage } = useState(null);

    const pickImage=()=>{
        launchImageLibrary({ mediaType: 'photo'}, (response) => {
            if (response.didCancel){
                Alert.alert('Selection cancelled');
            }else if(response.errorMessage){
                Alert.alert('Error:', response.errorMessage);
        }else{
            selectedImage(response.assets[0]);
        }
        });
};
    const uploadImage= async()=>{
        if(!selectedImage){
            Alert.alert('Please select an image');
            return;
        }
}
    const response = await axios.post('http://')

}

