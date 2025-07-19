import { router } from "expo-router";
import { ChevronRight, Plus } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";
iconWithClassName(ChevronRight);
iconWithClassName(Plus);


interface SpendingType{
  name: string;
  date: string;
  amount: number;
}

const spending: SpendingType[] = [
  {
    name: "Almaz Fried Chicken",
    date: "21 July 2023",
    amount: 66000
  },  {
    name: "Starbucks",
    date: "20 July 2023",
    amount: 50000
  },
  {
    name: "Cinema XXI",
    date: "19 July 2023",
    amount: 80000
  },
  {
    name: "Gramedia",
    date: "18 July 2023",
    amount: 120000
  },
  {
    name: "Gojek",
    date: "17 July 2023",
    amount: 25000
  },
  {
    name: "Indomaret",
    date: "16 July 2023",
    amount: 35000
  },
  {
    name: "Netflix Subscription",
    date: "15 July 2023",
    amount: 150000
  },
  {
    name: "Local Cafe",
    date: "14 July 2023",
    amount: 45000
  },
  {
    name: "Online Shopping",
    date: "13 July 2023",
    amount: 200000
  },
  {
    name: "Gym Membership",
    date: "12 July 2023",
    amount: 100000
  },
  {
    name: "Restaurant Dinner",
    date: "11 July 2023",
    amount: 90000
  },

]

const SpendingScreen = () => {
  const colorScheme = useColorScheme();
  return ( 
    <>
      <ScrollView className="flex-1 bg-background">
        <View className="flex-1 min-h-screen p-8">
          {spending.map((item, index) => (
            <Card key={index} className="shadow-none mb-3">
              <CardContent className="flex-1 flex flex-row h-full m-0 p-4 items-between justify-center relative">
                <View className="grow">
                  <Text>{item.name}</Text>
                  <Text>{item.date}</Text>
                </View>
                <View className="flex-none my-auto flex-row items-center justify-end">
                  <Text className="me-3">Rp. {item.amount.toLocaleString('id-ID')}</Text>
                  <ChevronRight color={colorScheme.colorScheme === 'dark' ? 'white' : 'black'} className="inline" />
                </View>
              </CardContent>
            </Card>
          ))}
        </View>
      </ScrollView>
      <View className="sticky bottom-0 flex-row justify-between items-center px-8 pt-6 pb-4">
        <Text className="text-2xl font-bold">Spending</Text>
        <Button className="flex flex-row items-center justify-between" onPress={() => {
          router.navigate('/spending/create');
        }}>
          <Plus size={16} color={colorScheme.colorScheme === 'dark' ? 'black' : 'white'} />
          <Text className="text-sm ms-2 font-medium">Add Spending</Text>
        </Button>
      </View>
    </>
   );
}
 
export default SpendingScreen;