import { router, Stack, Tabs } from 'expo-router';
import { ArrowLeft, PieChart, PiggyBank, ShoppingCart } from 'lucide-react-native';
import { Alert, Pressable } from 'react-native';
import SignOutButton from '~/components/SignOutButton';
import { ThemeToggle } from '~/components/ThemeToggle';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import { useColorScheme } from '~/lib/useColorScheme';
iconWithClassName(ArrowLeft);

export default function SettingLayout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: true,
        headerLeft: () => <Pressable onPress={() => router.back()}><ArrowLeft className='text-foreground' /></Pressable>,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '',
        }}
        />
    </Stack>
  );
}