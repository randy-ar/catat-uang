import { router, useLocalSearchParams } from "expo-router";
import { Trash2 } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { H2, H3, Large, Muted, Small } from "~/components/ui/typography";
import { IncomeData } from "~/lib/constDummyData";
import { IncomeType } from "~/lib/types/income/income";
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
import { Portal } from "@rn-primitives/portal";
import * as Toast from '@rn-primitives/toast';
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DetailsIncomeScreen = () => {
  const { id } = useLocalSearchParams();
  const incomeList: IncomeType[] = IncomeData;
  const income = incomeList.find((item) => item.id === parseInt(id as string));

  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const onSubmit = () => {
    setOpen(true);
    router.navigate('/income');
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
                  Income has been deleted.
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
          <Card>
            <CardContent className="py-4">
              <View className="flex flex-row justify-between items-center mb-2">
                <Muted>{income?.date}</Muted>
                <Badge><Text>{income?.category?.name}</Text></Badge>
              </View>
              <H3 className="mb-4">Rp. {income?.amount.toLocaleString('id-ID')}</H3>
              <Muted className="mb-4">{income?.description}</Muted>
            </CardContent>
          </Card>
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
 
export default DetailsIncomeScreen;