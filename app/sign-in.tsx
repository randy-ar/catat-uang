import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

import { useSession } from '~/lib/context';
import { LogIn } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';

interface ErrorProps{
  email: string;
  password: string;
}

export default function SignInScreen() {
  const { signIn } = useSession();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<ErrorProps>({
    email: '',
    password: '',
  });
  const colorScheme = useColorScheme();

  return (
    <View className='flex-1 justify-center items-center gap-5 p-6'>
      <Card className='w-full max-w-sm rounded-2xl'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <View className='mb-4'>
            <Label nativeID='email' htmlFor='email' className='mb-2 block'>Email</Label>
            <Input
              placeholder='example@mail.com'
              value={email}
              onChangeText={setEmail}
              autoComplete='email'
              aria-labelledby='email'
              aria-errormessage={errors.email}
            />
          </View>
          <View className='mb-4'>
            <Label nativeID='password' htmlFor='password' className='mb-2 block'>Password</Label>
            <Input
              placeholder='Password'
              caretHidden
              secureTextEntry
              autoComplete='current-password'
              value={password}
              onChangeText={setPassword}
              aria-labelledby='password'
              aria-errormessage={errors.password}
            />
          </View>
        </CardContent>
        <CardFooter>
          <Button 
            className='w-full flex flex-row items-center justify-center'
            variant="default"
            onPress={() => {
              signIn();
              // Navigate after signing in. You may want to tweak this to ensure sign-in is
              // successful before navigating.
              router.replace('/');
            }}
          >
            <LogIn className='inline me-1 h-4 w-4' size={16} color={colorScheme.colorScheme === 'dark' ? 'black' : 'white'}/>
            <Text className='ms-2'>
              Sign In
            </Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
