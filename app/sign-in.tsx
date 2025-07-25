import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

import { LogIn, TerminalSquare } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { FirebaseError } from 'firebase/app';
import { FirebaseAuthTypes, getAuth } from '@react-native-firebase/auth';
import { useSession } from '~/lib/context';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormInput } from '~/components/ui/form';
import { Small } from '~/components/ui/typography';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';

const formSchema = z.object({
  email: z.email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});


export default function SignInScreen() {
  const auth = getAuth();
  const { signIn, saveToken } = useSession();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [errors, setErrors] = useState<FirebaseError>();

  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log(user);
    setUser(user);
    console.log(user?.uid);
    if(user?.uid){
      getAuth().currentUser?.getIdToken().then((token) => {
        console.log(token);
        saveToken(token);
      });
      signIn({uid: user.uid})
    }
    if (initializing) setInitializing(false);
  }

  // Handle user state changes.

  useEffect(() => {
    const subscriber = getAuth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  const onSubmitLogin = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setErrors(undefined);
    try {
      await getAuth().signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      const err = error as FirebaseError;
      setErrors(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const onSubmitRegister = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await getAuth().createUserWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      const err = error as FirebaseError;
      setErrors(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (initializing) 
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="small" color={colorScheme.colorScheme === 'dark' ? 'white' : 'black'} className='m-8'/>
      </View>
    );


  return (
    <View className='flex-1 justify-center items-center gap-5 p-8'>
      <KeyboardAvoidingView className='w-full flex-1 justify-center items-center gap-6'>
        {errors && (
          <Alert variant={'destructive'} icon={TerminalSquare} className='w-full'>
            <AlertTitle className='mb-3'>{errors.name}!</AlertTitle>
            <AlertDescription>
              {errors.message}
            </AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <Card className='w-full rounded-2xl'>
            <CardHeader>
              <CardTitle className='mb-6'>Loginnn</CardTitle>
            </CardHeader>
            <CardContent>
              <View className='mb-4'>
                <FormField 
                  name='email'
                  control={form.control}
                  render={({ field }) => (
                    <FormInput 
                    {...field}
                    label='Email'
                    placeholder='example@mail.com'
                    autoComplete='email'
                    aria-labelledby='email'
                    />
                  )}
                  />
              </View>
              <View className='mb-4'>
                <FormField 
                  name='password'
                  control={form.control}
                  render={({ field }) => (
                    <FormInput 
                      {...field}
                      label='Password'
                      placeholder='password'
                      autoComplete='password'
                      secureTextEntry
                      textContentType='password'
                      aria-labelledby='password'
                    />
                  )}
                  />
              </View>
            </CardContent>
            <CardFooter className='flex flex-col gap-4'>
              {!loading ? (
                <>
                <Button 
                  className='w-full flex flex-row items-center justify-center'
                  variant="default"
                  onPress={form.handleSubmit(onSubmitLogin)}
                >
                  <Text className='ms-2'>
                    Sign In
                  </Text>
                </Button>
                <Small>Or</Small>
                <Button 
                  className='w-full flex flex-row items-center justify-center'
                  variant="outline"
                  onPress={form.handleSubmit(onSubmitRegister)}
                >
                  <Text className='ms-2'>
                    Register
                  </Text>
                </Button>
                </>
              ) : (
                <ActivityIndicator size="small" color={colorScheme.colorScheme === 'dark' ? 'white' : 'black'} className='m-6'/>
              )}
            </CardFooter>
          </Card>
        </Form>
      </KeyboardAvoidingView>
    </View>
  );
}
