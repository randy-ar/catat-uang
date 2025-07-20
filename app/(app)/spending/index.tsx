import { router } from "expo-router";
import { ChevronRight, Plus, TrendingUp } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";
import { H3, Muted, Small } from "~/components/ui/typography";
import { Badge } from "~/components/ui/badge";
import { SpendingData } from "~/lib/constDummyData"
import { SpendingType } from "~/lib/types/spending/spending";
iconWithClassName(ChevronRight);
iconWithClassName(Plus);
iconWithClassName(TrendingUp);

const SpendingScreen = () => {
  const colorScheme = useColorScheme();
  const spending : SpendingType[] = SpendingData;
  return ( 
    <>
      <ScrollView className="flex-1 bg-background">
        <View className="flex-1 min-h-screen p-8">
          <Card className="shadow-none mb-6">
            <CardContent className="py-4">
              <View className="flex flex-row justify-between items-center mb-2">
                <Muted>Total Spending</Muted>
                <Badge variant="danger" className="flex flex-row items-center justify-center gap-2">
                  <TrendingUp className="text-rose-950 dark:text-rose-700" size={14}/>
                  <Text>+ 12.5%</Text>
                </Badge>
              </View>
              <H3 className="mb-6">Rp. 1.000.000</H3>
              <View className="flex flex-row justify-start items-center mb-3 gap-2">
                <Text>
                  Trending up this month 
                </Text>
                <TrendingUp color={colorScheme.colorScheme === 'dark' ? 'white' : 'black'} size={16}/>
              </View>
              <Small>
                +12.5% since last month
              </Small>
            </CardContent>
          </Card>
          {spending.map((item, index) => (
            <TouchableOpacity onPress={() => {
              router.push(`/spending/${item.id}`);
            }}
            key={index}
            >
              <Card className="shadow-none mb-3">
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
            </TouchableOpacity>
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