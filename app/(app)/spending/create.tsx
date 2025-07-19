import { router } from "expo-router";
import { Image as ImageIcon } from "lucide-react-native";
import { useState } from "react";
import { View, Alert, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";

const CreateSpendingScreen = () => {
  const colorScheme = useColorScheme();
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async (source: 'gallery' | 'camera') => {
    let result;

    if (source === 'gallery') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
    } else {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera permissions to make this work!');
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        quality: 1,
      });
    }

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveImageToLocalStorage = async (uri: string) => {
    const fileName = uri.split('/').pop(); // Ambil nama file dari URI
    const newPath = `${FileSystem.documentDirectory}${fileName}`; // Path baru di local storage

    try {
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });
      console.log('Image saved to:', newPath);
      await AsyncStorage.setItem('lastSavedImageUri', newPath); // Simpan path di AsyncStorage
      return newPath;
    } catch (e) {
      console.error('Failed to save image:', e);
      Alert.alert('Error', 'Failed to save image locally.');
      return null;
    }
  };

  const handleChooseImage = () => {
    Alert.alert("Upload Image", "Choose an option", [
      { text: "Choose from Gallery", onPress: () => pickImage('gallery') },
      { text: "Take a Photo", onPress: () => pickImage('camera') },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleContinue = async () => {
    if (imageUri) {
      console.log('Image URI:', imageUri);
      const savedUri = await saveImageToLocalStorage(imageUri);
      if (savedUri) {
        // Navigasi ke preview.tsx dengan URI gambar yang sudah disimpan secara lokal
        router.navigate({ pathname: '/spending/preview', params: { image: savedUri } });
      }
    }
  };

  return ( 
    <View className="flex-1 justify-end items-center p-8 gap-4">
      <TouchableOpacity onPress={handleChooseImage} className="w-full grow">
        <Card className="w-full shadow-none grow border-dashed">
          <CardContent className="flex-1 flex flex-row h-full m-0 p-4 items-center justify-center relative">
            {imageUri ? 
            <Image source={{ uri: imageUri }} resizeMode="contain" className="w-full h-full rounded-lg object-fit" /> 
            : 
            <View className="flex-1 flex flex-col items-center justify-center">
              <ImageIcon size={32} color={colorScheme.colorScheme === 'dark' ? 'white' : 'black'}/>
              <Text className="mt-2">Tap to Upload Image</Text>
            </View>  
            }
          </CardContent>
        </Card>
      </TouchableOpacity>
      <Button className="w-full" disabled={!imageUri} onPress={handleContinue}>
        <Text>Continue</Text>
      </Button>
    </View>
   );
}
 
export default CreateSpendingScreen;