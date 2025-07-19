import { LogOut } from "lucide-react-native";
import { Button } from "./ui/button";
import { useSession } from "~/lib/context";
import { useColorScheme } from "~/lib/useColorScheme";

const SignOutButton = () => {
  const { signOut } = useSession();
  const color = useColorScheme();
  return ( 
    <Button variant="ghost" onPress={() => signOut()}>
      <LogOut color={color.colorScheme === 'dark' ? 'white' : 'black'}/>
    </Button>
   );
}
 
export default SignOutButton;