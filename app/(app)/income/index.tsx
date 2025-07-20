import { router } from "expo-router";
import { ChevronRight, Plus, TrendingUp } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Code, H1, H3, Large, Lead, Muted, Small } from "~/components/ui/typography";
import { useColorScheme } from "~/lib/useColorScheme";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";
iconWithClassName(Plus);
iconWithClassName(TrendingUp);

interface IncomeType{
  name: string;
  amount: number;
  date: Date;
  description: string | null;
  category: IncomeCategoryType | null;
}

interface IncomeCategoryType{
  name: string;
}

const income: IncomeType[] = [
  {
    name: "Salary",
    amount: 10000,
    date: new Date(),
    description: "Monthly salary",
    category: {
      name: "Salary"
    }
  },
  {
    name: "Freelance",
    amount: 5000,
    date: new Date(),
    description: "Freelance work",
    category: {
      name: "Freelance"
    }
  },
  {
    name: "Gift",
    amount: 5000,
    date: new Date(),
    description: "Gift from parents",
    category: {
      name: "Gift"
    }
  }
]

const IncomeScreen = () => {
  const colorScheme = useColorScheme();
  console.log("Rendering Income Screen")
  return (
    <>
      <ScrollView className="flex-1">
        <View className="flex-1 min-h-screen p-8">
          <Card className="shadow-none mb-6">
            <CardContent className="py-4">
              <View className="flex flex-row justify-between items-center mb-2">
                <Muted>Total Income</Muted>
                <Badge variant="success" className="flex flex-row items-center justify-center gap-2">
                  <TrendingUp className="text-green-950 dark:text-green-700" size={14}/>
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
          {income.map((item, index) => (
            <Card key={index} className="shadow-none mb-3">
              <CardContent className="flex-1 flex flex-row h-full m-0 p-4 items-between justify-center relative">
                <View className="grow">
                  <Text>{item.name}</Text>
                  <Text>{item.date.toLocaleDateString()}</Text>
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
        <Text className="text-2xl font-bold">Income</Text>
        <Button className="flex flex-row items-center justify-between" onPress={() => {
          router.navigate('/income/create');
        }}>
          <Plus size={16} color={colorScheme.colorScheme === 'dark' ? 'black' : 'white'} />
          <Text className="text-sm ms-2 font-medium">Add Income</Text>
        </Button>
      </View>
    </> 
   );
}
 
export default IncomeScreen;