import { Alert, View, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import { Calendar } from 'react-native-calendars';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useColorScheme } from '~/lib/useColorScheme';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { H3, Lead, Muted, Small } from '~/components/ui/typography';
import { Badge, Wallet2 } from 'lucide-react-native';
import {
  WalletType,
  MarkedDatesType,
  AreaChartSeriesType,
  AreaChartDatasetType,
  PieChartSeriesType,
  MonthlyReportResponse,
} from '~/lib/types/report/report'; // Import semua tipe yang relevan
import { useCallback, useEffect, useState } from 'react';
import { useApi } from '~/lib/useAxios';
import { AxiosError } from 'axios';
import { MONTHS } from '~/lib/constants';
import { Skeleton } from '~/components/ui/skeleton';
import { useFocusEffect } from 'expo-router';

const screenWidth = Dimensions.get("window").width;


export default function Index() {
  const api = useApi()
  const colorScheme = useColorScheme()
  const [loading, setLoading] = useState(false)
  const [wallet, setWallet] = useState<WalletType>()
  const [markers, setMarkers] = useState<MarkedDatesType>()
  const [dataArea, setDataArea] = useState<AreaChartSeriesType>()
  const [dataPie, setDataPie] = useState<PieChartSeriesType>()
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1 - 1 + 1;

  const monthName = MONTHS.find(m => m.id == month)?.name

  // run fetch ini setiap kali user membuka screen ini
  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      api.get(`/reports/month?year=${year}&month=${month}`)
      .then(res => res.data as MonthlyReportResponse)
      .then(res => {      
        setWallet(res.wallet)
        setMarkers(res.markedDates)
        const mapedAreaChartData = res.areaChartData?.datasets?.map((dataset : AreaChartDatasetType, index : number) => {
          return {
            data: dataset.data,
            color: (opacity = 1) => index == 0 ? `rgba(0, 130, 54, ${opacity})` : `rgba(199, 0, 54, ${opacity})`, // optional
            strokeWidth: 4, // optional
          }
        })
        const areaChart = {
          datasets: mapedAreaChartData,
          labels: res.areaChartData?.labels
        }
        setDataArea(areaChart)
        setDataPie(res.pieChartData)
      }).catch(err => {
        const e = err as AxiosError
        console.log(e.toJSON())
      })
      .finally(() => {
        setLoading(false)
      })

      return () => {
      };
    }, [api, year, month])
  )

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 130, 54, ${opacity})`, // optional
        strokeWidth: 4, // optional
      },
      {
        data: [30, 10, 10, 40, 70, 20],
        color: (opacity = 1) => `rgba(199, 0, 54, ${opacity})`, // optional
        strokeWidth: 4, // optional
      }
    ],
  };

  const colors = {
    light: {
      green: "#0d542b",
      rose: "#8b0836",
    },
    dark: {
      green: "#008236",
      rose: "#c70036"
    }
  }

  const calendarTheme = {
    light: {
      backgroundColor: '#ffffff',
      calendarBackground: '#ffffff',
      textSectionTitleColor: '#71717A',
      selectedDayBackgroundColor: '#212529',
      selectedDayTextColor: '#FAFAFA',
      todayBackgroundColor: '#E4E4E2',
      todayTextColor: '#18181B',
      dayTextColor: '#18181B',
      textDisabledColor: '#71717A',
      dotColor: '#212529',
      arrowColor: '#212529',
      monthTextColor: '#09090B',
      selectedDotColor: '#FAFAFA',
    },
    dark: {
      backgroundColor: '#09090B',
      calendarBackground: '#09090B',
      textSectionTitleColor: '#A1A1AA',
      selectedDayBackgroundColor: '#FAFAFA',
      selectedDayTextColor: '#27272A',
      todayBackgroundColor: '#27272A',
      todayTextColor: '#FAFAFA',
      dayTextColor: '#E4E4E2',
      textDisabledColor: '#A1A1AA',
      dotColor: '#FAFAFA',
      arrowColor: '#FAFAFA',
      monthTextColor: '#FAFAFA',
      selectedDotColor: '#09090B',
    }
  }

  const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: colorScheme.colorScheme == "dark" ? "#09090B" : "#ffffff",
    backgroundGradientTo: colorScheme.colorScheme == "dark" ? "#09090B" : "#ffffff",
    fillShadowGradientTo: colorScheme.colorScheme == "dark" ? "#09090B" : "#FAFAFA",
    fillShadowGradientFrom: colorScheme.colorScheme == "dark" ? "#FAFAFA" : "#18181B",
    fillShadowGradientFromOpacity: .2,
    fillShadowGradientToOpacity: 0,
    useShadowColorFromDataset: false, // optional
    decimalPlaces: 0, // optional, defaults to 2dp
    withVerticalLines: false,
    withHorizontalLines: false,
    color: (opacity = 1) => colorScheme.colorScheme == "dark" ?`rgba(214, 211, 209, ${opacity})` : `rgba(12, 10, 9, ${opacity})`,
    labelColor: (opacity = 1) => colorScheme.colorScheme == "dark" ?`rgba(214, 211, 209, ${opacity})` : `rgba(12, 10, 9, ${opacity})`,
    style: {
      borderRadius: 16,
      backgorundColor: colorScheme.colorScheme == "dark" ? "#09090B" : "#ffffff",
      margin: 0,
      padding:0, 
    },
    propsForDots: {
      r: "0",
    },
  };

  return (
    <ScrollView className='flex-1'>
      {!loading ? (
      <View className='flex-1 justify-start p-8 min-h-screen gap-6'>
        {wallet && (
        <Card className="shadow-none">
          <CardContent className="py-4">
            <View className="flex flex-row justify-between items-center mb-2">
              <Muted>Total Money</Muted>
              <Wallet2 size={20} color={colorScheme.colorScheme == "dark" ? "white" : "black"}/>
            </View>
            <H3 className="mb-6">Rp. {wallet.amount.toLocaleString('id-ID')}</H3>
            <View className="flex flex-row justify-start items-center mb-3 gap-2">
              <Small>
                Total spending in {monthName} {wallet.spendingPercent}%
              </Small>
            </View>
          </CardContent>
        </Card>
        )}
        {markers && (
        <Card className="shadow-none">
          <CardContent>
            <Calendar
              key={colorScheme.colorScheme === 'dark' ? 'calendar-dark' : 'calendar-light'}
              theme={colorScheme.colorScheme === 'dark' ? calendarTheme.dark : calendarTheme.light}
              markingType={'multi-dot'}
              // theme={}
              // Specify the current date
              // Callback that gets called when the user selects days'
              onMonthChange={(month) => {
                console.log('month changed', month);
              }}
              // Mark specific dates as marked
              markedDates={markers}
            />
          </CardContent>
        </Card>
        )}
        {dataArea && (
        <Card className='px-0 mx-0'>
          <CardHeader className='py-0 pt-6'>
            <CardTitle>
              <Lead>Cash flow on half year</Lead>
            </CardTitle>
          </CardHeader>
          <CardContent className='px-0 mx-0 mt-8 flex justify-center items-center'>
            <LineChart
              data={dataArea}
              width={screenWidth - 64}
              height={240}
              verticalLabelRotation={0}
              chartConfig={chartConfig}
              bezier
              withInnerLines={false}
              withOuterLines={false}
              yLabelsOffset={20}
              formatYLabel={(value) => {
                if(parseInt(value) >= 1000000)
                  return (parseInt(value) / 1000000).toFixed(0) + 'M'
                return (parseInt(value) / 1000).toFixed(0) + 'K'
                
              }}
              xLabelsOffset={0} 
              withHorizontalLines={false}
              withVerticalLines={false}
              fromZero={true}
              onDataPointClick={(data) => {
                Alert.alert("Details", `Rp. ${data.value.toLocaleString('id-ID')}`)
              }}
            />
          </CardContent>
        </Card>
        )}
        {dataPie?.data && (
        <Card className='px-0 mx-0'>
          <CardHeader className='py-0 pt-6'>
            <CardTitle>
              <Lead>Spending category on July</Lead>
            </CardTitle>
          </CardHeader>
          <CardContent className='px-0 pt-0 mx-0 mt-8 flex justify-center items-center'>
              <ProgressChart
                data={dataPie}
                width={screenWidth - 72}
                height={250}
                strokeWidth={12}
                radius={24}
                chartConfig={chartConfig}
                hideLegend={false}
              />
          </CardContent>
        </Card>
        )}
      </View>
      ):(
      <View className='flex-1 justify-start p-8 min-h-screen gap-6'>
        <Skeleton className="w-full h-32"/>
        <Skeleton className="w-full h-72"/>
        <Skeleton className="w-full h-64"/>
        <Skeleton className="w-full h-64"/>
      </View>
      )}
    </ScrollView>
  );
}
