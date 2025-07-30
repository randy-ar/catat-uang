import { Portal } from "@rn-primitives/portal";
import { router, useLocalSearchParams } from "expo-router";
import { Trash, Trash2 } from "lucide-react-native";
import { Alert, ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import { SpendingData } from "~/lib/constDummyData";
import { SpendingType } from "~/lib/types/spending/spending";
import * as Toast from '@rn-primitives/toast';
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { useApi } from "~/lib/useAxios";
import { AxiosError } from "axios";
import { Skeleton } from "~/components/ui/skeleton";


const DetailSpendingScreen = () => {
  const api = useApi();
  const { id } = useLocalSearchParams();
  const [spending, setSpending] = useState<SpendingType | null>(null);
  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setLoading(true)
    api.get(`/spendings/details/${id}`)
    .then(res => res.data)
    .then(res => {
      setSpending(res)
    })
    .catch(err => {
      const e = err as AxiosError
      console.log(e.toJSON())
      Alert.alert('Error', JSON.stringify(e.toJSON()))
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  const onSubmit = () => {
    setLoading(true)
    api.delete(`/spendings/delete/${id}`)
    .then(res => res.data)
    .then(res => {
      console.log(res);
      setOpen(true);
      router.navigate('/spending');
    }).catch(err => {
      const e = err as AxiosError;
      console.log(e.toJSON())
      Alert.alert('Error', JSON.stringify(e.toJSON()))
    }).finally(() => {
      setLoading(false)
    })
  }

  return ( 
    <>
      {open && (
        <Portal name='toast-example'>
          <View style={{ top: insets.top + 72 }} className='px-4 absolute w-full'>
            <Toast.Root
              type='foreground'
              open={open}
              onOpenChange={setOpen}
              className='opacity-95 bg-red-700 text-white border border-border border-red-700 flex-col p-4 rounded-xl'
            >
              <View className='gap-1.5'>
                <Toast.Title className='text-xl font-semibold text-white'>Deleted!</Toast.Title>
                <Toast.Description className="text-white">
                  Spending has been deleted.
                </Toast.Description>
              </View>
              <View className='gap-2 mt-3 flex-row justify-end'>
                <Toast.Action>
                  <Button variant="light" size="sm" onPress={() => setOpen(false)}>
                    <Text>Ok</Text>
                  </Button>
                </Toast.Action>
              </View>
            </Toast.Root>
          </View>
        </Portal>
      )}
      <ScrollView className="flex-1">
        <View className="flex-1 min-h-screen p-8">
          {spending ? (
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
                <View className="flex flex-row justify-between items-center mb-1">
                  <Text className="w-5/12">Category</Text>
                  <Text className="w-7/12">{spending.category?.name}</Text>
                </View>
                <Text className="text-xl font-bold mb-4 mt-4">Items Detail</Text>
                {spending.items.map((item, index) => (
                  <View className="flex flex-row justify-between items-center mb-1" key={index}>
                    <Text className="w-5/12">{item.name}</Text>
                    <Text className="w-7/12">{item.quantity} x Rp. {item.price.toLocaleString('id-ID')}</Text>
                  </View>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Skeleton className="w-full h-48 rounded-lg"/>
          )}
        </View> 
      </ScrollView>
      <View className="sticky bottom-0 flex-row justify-between items-center px-8 pt-6 pb-4">
        <View></View>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="flex flex-row items-center justify-between gap-2">
              <Trash2 size={16} color="white"/><Text>Delete</Text>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure want to delete?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your income and remove all related data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Cancel</Text>
              </AlertDialogCancel>
              <AlertDialogAction className="bg-red-700 text-white" onPress={onSubmit}>
                <Text>Delete</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </View>
    </>
   );
}
 
export default DetailSpendingScreen;