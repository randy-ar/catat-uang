import { LogOut, UserCircle2 } from "lucide-react-native";
import { Button } from "./ui/button";
import { useSession } from "~/lib/context";
import { useColorScheme } from "~/lib/useColorScheme";
import { getAuth } from "@react-native-firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import Animated, { FadeIn } from "react-native-reanimated";
import { TouchableOpacity } from "react-native";

const SignOutButton = () => {
  const { signOut } = useSession();
  const color = useColorScheme();
  const auth = getAuth();
  const contentInsets = useSafeAreaInsets();
  
  const logOut = () => {
    auth.signOut().finally(() => {
      signOut();
    });
  }

  return ( 
    <Button variant="ghost">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <UserCircle2  color={color.colorScheme === 'dark' ? 'white' : 'black'}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent insets={contentInsets} className='w-64 native:w-72 mt-2'>
          <TouchableOpacity >
            <DropdownMenuItem onPress={logOut}>
              <LogOut size={14} color={color.colorScheme === 'dark' ? 'white' : 'black'}/>
              <Text>Log out</Text>
            </DropdownMenuItem>
          </TouchableOpacity>
        </DropdownMenuContent>
      </DropdownMenu>
    </Button>
   );
}
 
export default SignOutButton;