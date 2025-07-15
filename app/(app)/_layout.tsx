import { Tabs } from 'expo-router';
import { PieChart, PiggyBank, ShoppingCart } from 'lucide-react-native';
import SignOutButton from '~/components/SignOutButton';
import { ThemeToggle } from '~/components/ThemeToggle';

export default function TabsLayout() {
  return (
    <Tabs 
      screenOptions={{
        headerLeft: () => {
          return <SignOutButton />;
        },
      }}>
      <Tabs.Screen
        name='spending'
        options={{
          title: 'Spending',
          tabBarIcon: () => <ShoppingCart />,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          title: 'Report',
          tabBarIcon: () => <PieChart/>,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name='income'
        options={{
          title: 'Income',
          tabBarIcon: () => <PiggyBank />,
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  );
}