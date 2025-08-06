import { UserCircle } from "lucide-react-native";
import { Button } from "./ui/button";
import { useColorScheme } from "~/lib/useColorScheme";
import { router } from "expo-router";

const SignOutButton = () => {
  const color = useColorScheme();

  return ( 
    <Button variant="ghost" onPress={() => {
      router.push('/(app)/setting');
    }}>
      <UserCircle color={color.colorScheme === 'dark' ? 'white' : 'black'}/>
    </Button>
   );
}
 
export default SignOutButton;