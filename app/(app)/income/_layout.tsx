import { Stack, Tabs } from 'expo-router';
import { PieChart, PiggyBank, ShoppingCart } from 'lucide-react-native';
import { Alert } from 'react-native';
import SignOutButton from '~/components/SignOutButton';
import { ThemeToggle } from '~/components/ThemeToggle';
import { useColorScheme } from '~/lib/useColorScheme';

export default function IncomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '',
          headerLeft: () => <ThemeToggle />,
          headerRight: () => {
            return <SignOutButton />;
          },
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: 'Add Income',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Details Income',
        }}
      />
    </Stack>
  );
}