import { Redirect } from "expo-router";
import { useSession } from "~/lib/context";
import { useStorageState } from "~/lib/useStorageState";
import * as SecureStore from 'expo-secure-store';
import { boolean } from "zod";
import { View, Image, ActivityIndicator } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export default function IndexPage () {
  const { isLoadingFirstTime, firstTime, isLoading, session, token } = useSession();
  const colorScheme = useColorScheme();
  console.log("First Time (IndexPage): ", firstTime);
  
  if (isLoadingFirstTime || isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colorScheme.colorScheme === 'dark' ? 'white' : 'black'}/>
      </View>
    ); 
  }

  if(firstTime == "false" && session == null && token == null){
    return <Redirect href="/sign-in" />;
  }else if(firstTime == "false" && session != null && token != null){
    return <Redirect href="/(app)" />;
  }

  return <Redirect href="/onboarding" />;
};