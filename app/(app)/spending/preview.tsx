import { Image as ImageIcon, Save } from "lucide-react-native";
import { Alert, ImageSourcePropType, useColorScheme, View} from "react-native";
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
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Portal } from '@rn-primitives/portal';
import * as Toast from '@rn-primitives/toast';
import * as z from 'zod';
import { Form, FormField, FormSelect } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import * as FileSystem from 'expo-file-system';
import { SpendingType } from "~/lib/types/spending/spending";
import api from "~/lib/useAxios";
import { AxiosError } from "axios";

const formSchema = z.object({
  category: z.object({
    value: z.string().min(1, { message: 'Please select a category.' }),
    label: z.string()
  }).optional().refine((data) => data !== undefined, {
    message: 'Please select a category.', // Pesan untuk ketika seluruh objek category undefined
    path: ['category'], // Menentukan path error
  }),
});

const PreviewSpendingScreen = () => {
  const [open, setOpen] = useState(false);
  const [seconds, setSeconds] = useState(3);
  const {image, spendingData} = useLocalSearchParams<{image: string, spendingData: string}>();
  const [spending, setSpending] = useState<SpendingType | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: {
        value: '',
        label: '',
      },
    },
  })

  const { image: paramImageUri } = useLocalSearchParams<{ image: string }>(); // Ambil dari params
  const [displayImageUri, setDisplayImageUri] = useState<string | null>(paramImageUri || null); // State untuk URI gambar
  console.log("DISPLAY IMAGE URI: ", displayImageUri);
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  
  // Mencoba untuk render image dari local storage TODO:
  useEffect(() => {
    setLoading(true)
    const loadImageFromStorage = async () => {
      try {
        const storedUri = await FileSystem.getContentUriAsync(image);
        console.log("Loaded image from storage:", storedUri);
        if (storedUri) {
          setDisplayImageUri(storedUri);
          console.log("Loaded image from storage:", storedUri);
        }
      } catch (e) {
        console.error("Failed to load image from storage:", e);
      }
    };
    loadImageFromStorage();
    setSpending(JSON.parse(spendingData));
    setLoading(true)
    api.get('/spendings/categories')
    .then(res => res.data)
    .then((res) => {
      setCategories(res.map((category: any) => ({
        value: category.id.toString(),
        label: category.name,
      })));
      console.log("SPENDING DATA: ", spendingData);
      console.log("SPENDING: ", spending)
      if(spending?.category){
        form.setValue('category', {
          value: spending.category.id.toString(),
          label: spending.category.name,
        });
      }
    })
    .catch((err) => {
      const e = err as AxiosError;
      console.log(e.toJSON());
      Alert.alert('Error', JSON.stringify(e.toJSON()));
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (open) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            setOpen(false);
            if (interval) {
              clearInterval(interval);
            }
            return 3;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
      setSeconds(3);
    }

    if (interval && !open) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [open, seconds]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setLoading(true)
    api.post('/spendings/save-scanned', spending)
    .then(res => res.data)
    .then((res) => {
      console.log(res)
      setOpen((prev) => !prev)
      router.navigate('/spending');
    }).catch((err) => {
      const e = err as AxiosError;
      console.log(e.toJSON())
      Alert.alert('Error', JSON.stringify(e.toJSON()));
    }).finally(() => {
      setLoading(false)
    })
  };

  return ( 
    <>
      <Form {...form}>
        <ScrollView className="flex-1">
          {spending ? (
            <View className="flex-1 gap-4 p-8 min-h-screen">
              {open && (
                <Portal name='toast-example'>
                  <View style={{ top: insets.top + 72 }} className='px-4 absolute w-full'>
                    <Toast.Root
                      type='foreground'
                      open={open}
                      onOpenChange={setOpen}
                      className='opacity-95 bg-primary text-primary-foreground border border-border flex-col p-4 rounded-xl'
                    >
                      <View className='gap-1.5'>
                        <Toast.Title className='text-xl font-semibold text-primary-foreground'>Success!</Toast.Title>
                        <Toast.Description className="text-primary-foreground">
                          Income has been created.
                        </Toast.Description>
                      </View>
                      <View className='gap-2 mt-3 flex-row justify-end'>
                        <Toast.Action>
                          <Button variant="secondary" size="sm" onPress={() => setOpen(false)}>
                            <Text>Ok</Text>
                          </Button>
                        </Toast.Action>
                      </View>
                    </Toast.Root>
                  </View>
                </Portal>
              )}
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
                      <Text className="w-7/12">{item.quantity} x Rp. {item.price.toLocaleString('id-ID')}</Text>

                    </View>
                  ))}
                  {/* <Text className="text-xl font-bold mb-4 mt-4">Image</Text>
                  {displayImageUri ? (
                    <Image key={displayImageUri} source={{ uri: displayImageUri, width: 200, height: 200 }} contentFit="contain" className="w-full h-full rounded-lg object-fit" />
                  ) : (
                    <Text>No image selected or loaded.</Text> // Fallback
                  )} */}
                </CardContent>
              </Card>
              <Text className="text-xl font-bold mb-0 mt-4">Select Spending Category</Text>
              <FormField
                name='category'
                control={form.control}
                render={({ field }) => (
                  <FormSelect
                    label='What this spending belong to?'
                    description='This used to describe this spending category.'
                    {...field}
                    onChange={(value) => {
                      if(value?.value){
                        var _spending = spending
                        _spending.category = {
                          id: parseInt(value?.value),
                          name: value?.label!
                        }
                        setSpending(_spending);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        className={cn(
                          'text-sm native:text-lg',
                          field.value ? 'text-foreground' : 'text-muted-foreground'
                        )}
                        placeholder='Select a category'
                      />
                    </SelectTrigger>
                    <SelectContent insets={{ left: 28, right: 28 }} className="w-full">
                      <SelectGroup>
                        <ScrollView>
                          {categories.map((category) => (
                            <SelectItem key={category.value} label={category.label} value={category.value}>
                              <Text>{category.label}</Text>
                            </SelectItem>
                          ))}
                        </ScrollView>
                      </SelectGroup>
                    </SelectContent>
                  </FormSelect>
                )}
                />
            </View>
          ):(
            <View className="flex-1 gap-4 p-8 min-h-screen flex flex-col items-center justify-center">
              <ImageIcon size={32} color={colorScheme === 'dark' ? 'white' : 'black'}/>
              <Text className="mt-2">No image selected or loaded.</Text>
            </View>
          )}
        </ScrollView>
        <View className="sticky bottom-0 flex-row justify-between items-center px-8 pt-6 pb-4">
          <Button className="w-full flex flex-row items-center justify-center" onPress={form.handleSubmit(onSubmit)}>
            <Save size={16} color={colorScheme === 'dark' ? 'black' : 'white'} className="inline"/><Text className="ms-2">Save</Text>
          </Button>
        </View>
      </Form>
    </>
   );
}
 
export default PreviewSpendingScreen;