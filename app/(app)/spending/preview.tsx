import { Image as ImageIcon, Save } from "lucide-react-native";
import { ImageSourcePropType, useColorScheme, View} from "react-native";
import { Image } from 'expo-image';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SpendingType{
  name: string;
  date: string;
  amount: number;
  items: SpendingItemType[];
}

interface SpendingItemType{
  name: string;
  amount: number;
  quantity: number;
  price: number;
}

const spending: SpendingType = {
  name: "Almaz Fried Chicken",
  date: "21 July 2023",
  amount: 66000,
  items: [
    {
      name: "Fried Chicken",
      amount: 1,
      quantity: 1,
      price: 33000
    },
    {
      name: "French Fries",
      amount: 1,
      quantity: 1,
      price: 20000
    },
    {
      name: "Salad",
      amount: 1,
      quantity: 1,
      price: 13000
    }
  ]
}

const PreviewSpendingScreen = () => {
  const { image: paramImageUri } = useLocalSearchParams<{ image: string }>(); // Ambil dari params
  const [displayImageUri, setDisplayImageUri] = useState<string | null>(paramImageUri || null); // State untuk URI gambar
  console.log(displayImageUri);
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  // Mencoba untuk render image dari local storage TODO:
  // useEffect(() => {
  //   const loadImageFromStorage = async () => {
  //     try {
  //       const storedUri = await AsyncStorage.getItem('lastSavedImageUri');
  //       console.log("Loaded image from storage:", storedUri);
  //       if (storedUri) {
  //         setDisplayImageUri(storedUri);
  //         console.log("Loaded image from storage:", storedUri);
  //       }
  //     } catch (e) {
  //       console.error("Failed to load image from storage:", e);
  //     }
  //   };
  //   loadImageFromStorage();
  // }, [paramImageUri]);

  return ( 
    <>
      <ScrollView className="flex-1">
        <View className="flex-1 gap-4 p-8 min-h-screen">
          <Card className="w-full shadow-none">
            <CardContent className="flex-1 flex flex-col h-full m-0 p-4 relative">
              <Text className="text-xl font-bold mb-4">Purchase Receipt</Text>
              <View className="flex flex-row justify-between items-center mb-1">
                <Text className="w-5/12">Name</Text>
                <Text className="w-7/12">{spending.name}</Text>
              </View>
              <View className="flex flex-row justify-between items-center mb-1">
                <Text className="w-5/12">Date</Text>
                <Text className="w-7/12">{spending.date}</Text>
              </View>
              <View className="flex flex-row justify-between items-center mb-1">
                <Text className="w-5/12">Amount</Text>
                <Text className="w-7/12">Rp. {spending.amount.toLocaleString('id-ID')}</Text>
              </View>
              <Text className="text-xl font-bold mb-4 mt-4">Items Detail</Text>
              {spending.items.map((item, index) => (
                <View className="flex flex-row justify-between items-center mb-1" key={index}>
                  <Text className="w-5/12">{item.name}</Text>
                  <Text className="w-7/12">{item.amount} x Rp. {item.price.toLocaleString('id-ID')}</Text>

                </View>
              ))}
              {/* <Text className="text-xl font-bold mb-4 mt-4">Image</Text>
              {displayImageUri ? (
                <Image key={displayImageUri} source={{ uri: displayImageUri }} contentFit="contain" className="w-full h-full rounded-lg object-fit" />
              ) : (
                <Text>No image selected or loaded.</Text> // Fallback
              )} */}
            </CardContent>
          </Card>
          <Text className="text-xl font-bold mb-0 mt-4">Select Spending Category</Text>
          <Select defaultValue={{ value: 'apple', label: 'Apple' }} className='w-full'>
            <SelectTrigger className='w-full'>
              <SelectValue
                className='text-foreground text-sm native:text-lg'
                placeholder='Select spendin category'
              />
            </SelectTrigger>
            <SelectContent insets={contentInsets} className='w-full'>
              <ScrollView className='max-h-full'>
                <SelectGroup>
                  <SelectItem label='Foods' value='foods'>
                    Foods
                  </SelectItem>
                  <SelectItem label='Transportation' value='transportation'>
                    Transportation
                  </SelectItem>
                  <SelectItem label='Health' value='health'>
                    Health
                  </SelectItem>
                  <SelectItem label='Education' value='education'>
                    Education
                  </SelectItem>
                  <SelectItem label='Communication' value='communication'>
                    Communication
                  </SelectItem>
                  <SelectItem label='Hobbies' value='hobbies'>
                    Hobbies
                  </SelectItem>
                  <SelectItem label='Utilities' value='utilities'>
                    Utilities
                  </SelectItem>
                  <SelectItem label='Travel' value='travel'>
                    Travel
                  </SelectItem>
                  <SelectItem label='Gifts' value='gifts'>
                    Gifts
                  </SelectItem>
                  <SelectItem label='Bills' value='bills'>
                    Bills
                  </SelectItem>
                  <SelectItem label='Entertainment' value='entertainment'>
                    Entertainment
                  </SelectItem>
                  <SelectItem label='Shoppings' value='shoppings'>
                    Shoppings
                  </SelectItem>
                  <SelectItem label='Clothing' value='clothing'>
                    Clothing
                  </SelectItem>
                  <SelectItem label='Other' value='other'>
                    Other
                  </SelectItem>
                </SelectGroup>
              </ScrollView>
            </SelectContent>
          </Select>
        </View>
      </ScrollView>
      <View className="sticky bottom-0 flex-row justify-between items-center px-8 pt-6 pb-4">
        <Button className="w-full flex flex-row items-center justify-center">
          <Save size={16} color={colorScheme === 'dark' ? 'black' : 'white'} className="inline"/><Text className="ms-2">Save</Text>
        </Button>
      </View>
    </>
   );
}
 
export default PreviewSpendingScreen;