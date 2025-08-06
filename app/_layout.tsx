import '~/global.css';

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Redirect, RelativePathString, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ActivityIndicator, Appearance, Platform, View } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { Text } from '~/components/ui/text';
import { SessionProvider, useSession } from '~/lib/context';
import { SplashScreenController } from '~/lib/splash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getAuth, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

const LOGIN = true;

export default function RootLayout() {
  usePlatformSpecificSetup();
  const auth = getAuth();
  const { isDarkColorScheme } = useColorScheme();
  
  return (
    <GestureHandlerRootView>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <SessionProvider>
          <BottomSheetModalProvider>
            <SplashScreenController />
            <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
            <RootNavigator />
          </BottomSheetModalProvider>
        </SessionProvider>
        <PortalHost />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const { token, firstTime } = useSession();

  console.log("First Time (RootNavigator): ", firstTime);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Protected 
        guard={token ? true : false}
      >
        <Stack.Screen
          name='(app)'
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>

      <Stack.Protected
        guard={!token}
      >
        <Stack.Screen
          name='sign-in'
          options={{
            headerShown: true,
            title: '',
            headerRight: () => <ThemeToggle />,
          }}
        />
      </Stack.Protected>

      <Stack.Screen 
        name='onboarding'
        options={{
          headerShown: true,
          title: '',
          headerRight: () => <ThemeToggle />,
        }}
        />
    </Stack>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add('bg-background');
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? 'light');
  }, []);
}

function noop() {}

function toOptions(name: string) {
  const title = name
    .split('-')
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(' ');
  return title;
}
