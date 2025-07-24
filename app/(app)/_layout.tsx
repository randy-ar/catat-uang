import { Tabs } from 'expo-router';
import { PieChart, PiggyBank, ShoppingCart } from 'lucide-react-native';
import { View } from 'react-native';
import SignOutButton from '~/components/SignOutButton';
import { ThemeToggle } from '~/components/ThemeToggle';
import { useColorScheme } from '~/lib/useColorScheme';

export default function TabsLayout() {
  return (
    <Tabs >
      <Tabs.Screen
        name='spending'
        options={{
          title: 'Spending',
          tabBarIcon: (tab) => <ShoppingCart color={tab.color}/>,
          headerRight: () => <ThemeToggle />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          title: 'Report',
          tabBarIcon: (tab) => <PieChart color={tab.color}/>,
          headerRight: () => <ThemeToggle />,
          headerLeft: () => {
            return (
              <View className="ms-3">
                <SignOutButton />
              </View>
            )
          },
        }}
      />
      <Tabs.Screen
        name='income'
        options={{
          title: 'Income',
          tabBarIcon: (tab) => <PiggyBank color={tab.color}/>,
          headerRight: () => <ThemeToggle />,
          headerShown: false
        }}
      />
    </Tabs>
  );
}