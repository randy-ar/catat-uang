import * as React from 'react';
import { View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';
  
interface ErrorProps{
  email: string;
  password: string;
}

export default function SignUpScreen() {
  const [progress, setProgress] = React.useState(78);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<ErrorProps>({
    email: '',
    password: '',
  });

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }

  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Card className='w-full max-w-sm p-6 rounded-2xl'>
        <CardContent>
          <Label nativeID='email' htmlFor='email'>Email</Label>
          <Input
            placeholder='example@mail.com'
            value={email}
            onChangeText={setEmail}
            aria-labelledby='email'
            aria-errormessage={errors.email}
          />
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>
    </View>
  );
}
