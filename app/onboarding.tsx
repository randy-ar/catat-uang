import { View, Image } from "react-native";
import { Text } from "~/components/ui/text";
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { Button } from "~/components/ui/button";
import { useColorScheme } from "~/lib/useColorScheme";
import { JSX, use, useEffect, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Large } from "~/components/ui/typography";
import { CheckCircle } from "lucide-react-native";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";
import { size } from "zod";
import { useSession } from "~/lib/context";
import { router } from "expo-router";
iconWithClassName(CheckCircle)


const Circle = ({ isLight, selected } : {isLight: boolean, selected: boolean}) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  }
  return (
    <View
      className={`w-2 h-2 mx-1 rounded-full ${selected ? 'bg-primary' : 'bg-primary/30'}`}
    />
  );
};

const Next = ({ ...props }) => (
  <Button className="me-8" {...props}>
    <Text>Next</Text>
  </Button>
);

const OnBoardingScreen = () => {
  const colorScheme = useColorScheme();
  const { firstTime, doneJourney } = useSession();
  const [backgroundColor, setBackgroundColor] = useState<string>()
  const [textColor, setTextColor] = useState<string>();

  console.log("First Time (OnBoardingScreen): ", firstTime);

  useEffect(() => {
    if(colorScheme.colorScheme === 'dark'){
      setBackgroundColor('#09090B')
      setTextColor('#FFFFFF')
    }else{
      setBackgroundColor('#FFFFFF')
      setTextColor('#09090B')
    }
  }, [colorScheme, backgroundColor, textColor])

  return ( 
    <Onboarding
      bottomBarColor={backgroundColor}
      bottomBarHeight={100}
      NextButtonComponent={Next}
      SkipButtonComponent={(props : any) : JSX.Element => (
        <Button variant="secondary" className="ms-8" {...props} onPress={() => {
          doneJourney();
          router.replace('/sign-in');
        }}>
          <Text>Skip</Text>
        </Button>
      )}
      DoneButtonComponent={(props : any) : JSX.Element => (
        <Button className="me-8" {...props} onPress={() => {
          doneJourney();
          router.replace('/sign-in');
        }}>
          <Text>Done</Text>
        </Button>
      )}
      DotComponent={Circle}
      titleStyles={{
        color: textColor,
        fontSize: 22,
        fontWeight: '800',
      }}
      subTitleStyles={{
        color: textColor+'80',
        fontSize: 14,
        fontWeight: '400',
      }}
      pages={[
        {
          backgroundColor: {backgroundColor},
          image: (
            <View className="w-full h-96 px-8">
              <LottieView source={require('../assets/images/boarding-1.json')} style={{width: "100%", height: "100%"}} autoPlay loop/>
            </View>
          ),
          title: 'Effortless Expense Tracking',
          subtitle: "Effortless. Simply snap a photo of your receipt, and we'll automatically log your expenses.",
        },
        {
          backgroundColor: {backgroundColor},
          image: (
            <View className="w-full h-96 px-8">
              <LottieView source={require('../assets/images/boarding-2.json')} style={{width: "100%", height: "100%"}} autoPlay loop/>
            </View>
          ),
          title: 'Input Your Income',
          subtitle: 'Easily add your income and see where your money comes from. A clear picture of your earnings is just a tap away.',
        },
        {
          backgroundColor: {backgroundColor},
          image: (
            <View className="w-full h-96 px-8">
              <LottieView source={require('../assets/images/boarding-3.json')} style={{width: "100%", height: "100%"}} autoPlay loop/>
            </View>
          ),
          title: 'See Your Financial Insights',
          subtitle: 'Get a clear monthly summary of your spending and income with visual reports that are easy to understand.',
        },
      ]}
    />
  );
}
 
export default OnBoardingScreen;