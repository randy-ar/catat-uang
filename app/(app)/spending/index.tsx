import { router } from "expo-router";
import { ChevronRight, Plus, TrendingDown, TrendingUp } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";
import { H3, Muted, Small } from "~/components/ui/typography";
import { Badge } from "~/components/ui/badge";
import { SpendingData } from "~/lib/constDummyData"
import { SpendingMonthlyReportType, SpendingType } from "~/lib/types/spending/spending";
import { use, useEffect, useState } from "react";
import { useApi } from "~/lib/useAxios";
import { AxiosError } from "axios";
import { Skeleton } from "~/components/ui/skeleton";
import {Animated} from 'react-native';
import { Easing } from "react-native-reanimated";
iconWithClassName(ChevronRight);
iconWithClassName(Plus);
iconWithClassName(TrendingUp);
iconWithClassName(TrendingDown);


const SpendingScreen = () => {
  const api = useApi();
  const colorScheme = useColorScheme();
  const [spending, setSpending] = useState<SpendingType[]>(SpendingData);
  const [monthlyReport, setMonthlyReport] = useState<SpendingMonthlyReportType>();
  const [loading, setLoading] = useState(false);
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  useEffect(() => {
    setLoading(true)
    api.get('/spendings')
    .then(res => res.data)
    .then((res) => {
      console.log(res)
      setSpending(res);
    })
    .catch((err) => {
      const e = err as AxiosError;
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })

    setLoading(true)
    api.get(`/spendings/monthly-report?year=${year}&month=${month}`)
    .then(res => res.data)
    .then((res) => {
      console.log("RESPONSE :", res);
      setMonthlyReport(res);
    }).catch((err) => {
      const e = err as AxiosError;
      console.log("ERROR :", e.request)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return ( 
    <>
      <ScrollView className="flex-1 bg-background">
        {!loading ? (
        <View className="flex-1 min-h-screen p-8">
          {monthlyReport && (
            <Card className="shadow-none mb-6">
              <CardContent className="py-4">
                <View className="flex flex-row justify-between items-center mb-2">
                  <Muted>Total Spending</Muted>
                  <Badge variant={monthlyReport.summary.percentageChange > 0 ? 'danger' : 'success'} className="flex flex-row items-center justify-center gap-2">
                    {monthlyReport.summary.percentageChange <= 0 ? (
                      <TrendingDown className={`text-green-950 dark:text-green-700`} size={14}/>
                    ):(
                      <TrendingUp className={`text-rose-950 dark:text-rose-700`} size={14}/>
                    )}
                    <Text>{monthlyReport.summary.percentageChange > 0 ? '' : '+'} {monthlyReport.summary.percentageChange}%</Text>
                  </Badge>
                </View>
                <H3 className="mb-6">Rp. {monthlyReport.summary.totalCurrentMonth.toLocaleString('id-ID')}</H3>
                <View className="flex flex-row justify-start items-center mb-3 gap-2">
                  <Text>
                    Trending {monthlyReport.summary.percentageChange <= 0 ? 'down' : 'up'} this month 
                  </Text>
                  {monthlyReport.summary.percentageChange <= 0 ? (
                    <TrendingDown color={colorScheme.colorScheme === 'dark' ? 'white' : 'black'} size={16}/>
                  ) : (
                    <TrendingUp color={colorScheme.colorScheme === 'dark' ? 'white' : 'black'} size={16}/>
                  )}
                </View>
                <Small>
                  {monthlyReport.summary.percentageChange > 0 ? '' : '+'} {monthlyReport.summary.percentageChange}% since last month
                </Small>
              </CardContent>
            </Card>
          )}
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
                    <Muted>{item.category?.name}</Muted>
                    <Small className="mt-2">{item.date}</Small>
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
        ): (
        <View className="flex-1 min-h-screen justify-center items-center p-8 gap-3">
          <Skeleton className='h-48 w-full rounded-lg' />
          {[...Array(5)].map((_, index) => (
            <Skeleton className="h-24 w-full rounded-lg" key={index}/>
          ))}
        </View>
        )}
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