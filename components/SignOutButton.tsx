import { LogOut } from "lucide-react-native";
import { Button } from "./ui/button";
import { useSession } from "~/lib/context";

const SignOutButton = () => {
  const { signOut } = useSession();
  return ( 
    <Button variant="ghost" onPress={() => signOut()}>
      <LogOut />
    </Button>
   );
}
 
export default SignOutButton;