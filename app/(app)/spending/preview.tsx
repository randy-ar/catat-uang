import { Image as ImageIcon, Save, RefreshCcw, Sparkle } from "lucide-react-native";
import { ActivityIndicator, Alert, ImageSourcePropType, KeyboardAvoidingView, View} from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
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
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Portal } from '@rn-primitives/portal';
import * as Toast from '@rn-primitives/toast';
import * as z from 'zod';
import { Form, FormField, FormInput, FormSelect } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import * as FileSystem from 'expo-file-system';
import { SpendingType } from "~/lib/types/spending/spending";
import { useApi } from "~/lib/useAxios";
import { AxiosError } from "axios";
import { Muted } from "~/components/ui/typography";
import {Animated} from 'react-native';
import { Easing } from "react-native-reanimated";

const AnimatedSparkle = Animated.createAnimatedComponent(Sparkle);

const formSchema = z.object({
  adjustAmount: z.number().min(1000, {
    message: 'Income amount must be at least Rp. 1.000.',
  }),
  category: z.object({
    value: z.string().min(1, { message: 'Please select a category.' }),
    label: z.string()
  }).optional().refine((data) => data !== undefined, {
    message: 'Please select a category.', // Pesan untuk ketika seluruh objek category undefined
    path: ['category'], // Menentukan path error
  }),
});

const PreviewSpendingScreen = () => {
  const api = useApi();
  const [open, setOpen] = useState(false);
  const [seconds, setSeconds] = useState(3);
  const {image, spendingData} = useLocalSearchParams<{image: string, spendingData: string}>();
  const [spending, setSpending] = useState<SpendingType | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [adjusting, setAdjusting] = useState(false);
  const pulseAnim = useRef(new Animated.Value(0)).current; // Nilai awal untuk animasi
  const colorScheme = useColorScheme();
  const { image: paramImageUri } = useLocalSearchParams<{ image: string }>(); // Ambil dari params
  const [displayImageUri, setDisplayImageUri] = useState<string | null>(paramImageUri || null); // State untuk URI gambar

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: {
        value: '',
        label: '',
      },
    },
  })

  console.log("DISPLAY IMAGE URI: ", displayImageUri);
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
    api.get('/spendings/categories')
    .then(res => res.data)
    .then((res) => {
      setCategories(res.map((category: any) => ({
        value: category.id.toString(),
        label: category.name,
      })));
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

  useEffect(() => {
    if(spending?.category){
      form.setValue('category', {
        value: spending.category.id.toString(),
        label: spending.category.name,
      });
    }
    if(spending?.amount){
      form.setValue('adjustAmount', spending.amount);
    }
  }, [spending])

  useEffect(() => {
      if (adjusting) {
          // Loop animasi tanpa henti
          Animated.loop(
              Animated.sequence([
                  Animated.timing(pulseAnim, {
                      toValue: 1,
                      duration: 1000, // Durasi animasi dari 0 ke 1
                      useNativeDriver: true,
                  }),
                  Animated.timing(pulseAnim, {
                      toValue: 0,
                      duration: 1000, // Durasi animasi dari 1 ke 0
                      useNativeDriver: true,
                  }),
              ])
          ).start();
      } else {
          // Hentikan animasi jika tidak lagi loading (opsional, tergantung kebutuhan)
          pulseAnim.stopAnimation();
          pulseAnim.setValue(0); // Reset nilai animasi
      }
  }, [adjusting, pulseAnim]);

  // Interpolasi untuk ukuran dan opacity
  const sparkleSize = pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 18], // Ukuran dari 32px ke 40px
  });

  const sparkleOpacity = pulseAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.6, 1, 0.6], // Opacity dari 60% ke 100% dan kembali ke 60%
  });

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

  const onSubmitAdjust = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setAdjusting(true)
    form.getFieldState('category').isValidating = true;
    form.getFieldState('adjustAmount').isValidating = true;
    if(spending?.amount != data.adjustAmount){
      api.post('/spendings/adjust-scanned', {
        ...spending,
        adjustAmount: data.adjustAmount
      })
      .then(res => res.data)
      .then((res) => {
        console.log(res)
        setSpending(res.spending)
      }).catch((err) => {
        const e = err as AxiosError;
        console.log(e.toJSON())
        Alert.alert('Error', JSON.stringify(e.toJSON()));
      }).finally(() => {
        setAdjusting(false)
      })
    }else{
      setAdjusting(false)
    }
  }

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
                          Spending has been created.
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
              <Text className="text-xl font-bold mb-0 mt-4">Is this information correct?</Text>
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
              <Text className="text-xl font-bold mb-0 mt-4">Adjust this if you think it's incorrect</Text>
              <KeyboardAvoidingView>
                <FormField 
                  disabled={loading || adjusting}
                  name='adjustAmount'
                  control={form.control}
                  render={({ field }) => (
                    <FormInput
                    inputMode="numeric"
                    label="Amount"
                    placeholder="Enter Income Amount"
                    keyboardType="numeric"
                    description='Adjust amount if you think this total is not correct.'
                    {...field}
                    value={field.value ? field.value.toLocaleString('id-ID') : ''}
                    onChange={(text) => {
                      if(loading || adjusting) return
                      // Hapus karakter non-digit untuk menangani input yang diformat
                      const sanitizedText = text.replace(/[^0-9]/g, '');
                      const parsed = Number.parseInt(sanitizedText, 10);
                      field.onChange(Number.isNaN(parsed) ? undefined : parsed);
                    }}
                    disabled={loading || adjusting}
                    />
                  )}
                />
                <FormField
                  disabled={loading || adjusting}
                  name='category'
                  control={form.control}
                  render={({ field }) => (
                    <FormSelect
                      label='What this spending belong to?'
                      description='This used to describe this spending category.'
                      {...field}
                      onChange={(value) => {
                        if(loading || adjusting) return
                        if(value?.value){
                            var _spending = spending
                            _spending.category = {
                              id: parseInt(value?.value),
                              name: value?.label!
                            }
                            setSpending(_spending);
                            form.setValue('category', {
                              value: value?.value,
                              label: value?.label!,
                            });
                          }
                        }}
                        disabled={loading || adjusting}
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
                        <ScrollView>
                          <SelectGroup>
                            {categories.map((category) => (
                              <SelectItem key={category.value} label={category.label} value={category.value}>
                                <Text>{category.label}</Text>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </ScrollView>
                      </SelectContent>
                    </FormSelect>
                  )}
                />
              </KeyboardAvoidingView>
            </View>
          ):(
            <View className="flex-1 gap-4 p-8 min-h-screen flex flex-col items-center justify-center">
              <ImageIcon size={32} color={colorScheme.colorScheme === 'dark' ? 'white' : 'black'}/>
              <Text className="mt-2">No image selected or loaded.</Text>
            </View>
          )}
        </ScrollView>
        <View className="sticky bottom-0 flex-col justify-between items-center px-8 pt-6 gap-2 pb-4">
          <Button disabled={loading || adjusting} variant="outline" className="w-full grow flex flex-row items-center justify-center" onPress={form.handleSubmit(onSubmitAdjust)}>
            {adjusting ? (
            <Animated.View style={{ opacity: sparkleOpacity, transform: [{ scale: sparkleSize.interpolate({ inputRange: [14, 18], outputRange: [1, 1.25] }) }] }}>
              <AnimatedSparkle size={sparkleSize} color={colorScheme.colorScheme === 'dark' ? 'white' : 'black'} />
            </Animated.View>
            ):(
            <RefreshCcw size={16} color={colorScheme.colorScheme === 'dark' ? 'white' : 'black'} className="inline  animate-spin"/>
            )}
            <Text className="ms-2">{adjusting ? 'Adjusting spending' : 'Adjust'}</Text>
          </Button>
          <Button disabled={loading || adjusting} className="w-full grow flex flex-row items-center justify-center" onPress={form.handleSubmit(onSubmit)}>
            <Save size={16} color={colorScheme.colorScheme === 'dark' ? 'black' : 'white'} className="inline"/><Text className="ms-2">Save</Text>
          </Button>
        </View>
      </Form>
    </>
   );
}

export default PreviewSpendingScreen;