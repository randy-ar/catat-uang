import { Save } from "lucide-react-native";
import { Alert, View, Pressable } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormCheckbox,
  FormCombobox,
  FormDatePicker,
  FormField,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from '~/components/ui/form';
import { Label } from '~/components/ui/label';
import { RadioGroupItem } from '~/components/ui/radio-group';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useForm } from "react-hook-form";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { router } from "expo-router";
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Portal } from '@rn-primitives/portal';
import * as Toast from '@rn-primitives/toast';

interface IncomeType{
  name: string;
  amount: number;
  date: Date;
  description: string | null;
  category: IncomeCategoryType | null;
}

interface IncomeCategoryType{
  name: string;
}

const categories = [
  {
    value: 'salary',
    label: 'Salary',
  },
  {
    value: 'freelance',
    label: 'Freelance',
  },
  {
    value: 'gift',
    label: 'Gift',
  },
];

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Enter a income name.',
  }),
  amount: z.number().min(1000, {
    message: 'Income amount must be at least Rp. 1.000.',
  }),
  description: z.string().optional().nullable(),
  category: z.object(
    { value: z.string(), label: z.string() }
  ),
});

const CreateIncomeScreen = () => {
  const [open, setOpen] = React.useState(false);
  const [seconds, setSeconds] = React.useState(3);

  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: undefined,
      description: null,
      category: undefined,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen((prev) => !prev)
    router.navigate('/income');
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (open) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            setOpen(false);
            if (interval) {
              clearInterval(interval);
            }
            return 3;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
      setSeconds(3);
    }

    if (interval && !open) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [open, seconds]);

  return ( 
    <View className="flex-1 p-8 justify-between">
      {open && (
        <Portal name='toast-example'>
          <View style={{ top: insets.top + 72 }} className='px-4 absolute w-full'>
            <Toast.Root
              type='foreground'
              open={open}
              onOpenChange={setOpen}
              className='opacity-95 bg-primary text-primary-foreground border border-border flex-col p-4 rounded-xl'
            >
              <View className='gap-1.5'>
                <Toast.Title className='text-xl font-semibold text-primary-foreground'>Success!</Toast.Title>
                <Toast.Description className="text-primary-foreground">
                  Income has been created.
                </Toast.Description>
              </View>
              <View className='gap-2 mt-3 flex-row justify-end'>
                <Toast.Action>
                  <Button variant="secondary" size="sm" onPress={() => setOpen(false)}>
                    <Text>Ok</Text>
                  </Button>
                </Toast.Action>
              </View>
            </Toast.Root>
          </View>
        </Portal>
      )}
      <Form {...form}>
        <View className="flex-1 gap-6">
          <FormField 
            name='amount'
            control={form.control}
            render={({ field }) => (
              <FormInput
                inputMode="numeric"
                label="Amount"
                placeholder="Enter Income Amount"
                keyboardType="numeric"
                {...field}
                value={field.value ? field.value.toLocaleString('id-ID') : ''}
                onChange={(text) => {
                  // Hapus karakter non-digit untuk menangani input yang diformat
                  const sanitizedText = text.replace(/[^0-9]/g, '');
                  const parsed = Number.parseInt(sanitizedText, 10);
                  field.onChange(Number.isNaN(parsed) ? undefined : parsed);
                }}
              />
            )}
          />
          <FormField 
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormInput 
                label="Name"
                placeholder="Enter Income Name"
                description="Describe your income"
                autoCapitalize="words"
                {...field} 
              />
            )}
          />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormSelect
                label='What income category do you belong to?'
                description='This used to describe this income category.'
                {...field}
              >
                <SelectTrigger>
                  <SelectValue
                    className={cn(
                      'text-sm native:text-lg',
                      field.value ? 'text-foreground' : 'text-muted-foreground'
                    )}
                    placeholder='Select a category'
                  />
                </SelectTrigger>
                <SelectContent insets={{ left: 28, right: 28 }} className="w-full">
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem key={category.value} label={category.label} value={category.value}>
                        <Text>{category.label}</Text>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </FormSelect>
            )}
          />
          <FormField 
            name='description'
            control={form.control}
            render={({ field }) => (
              <FormTextarea
                label='Describe about this income'
                placeholder='Describe this income'
                description='This used to describe this income.'
                {...field}
                value={field.value ?? ''}
              />
            )}
          />
        </View>
        <Button onPress={form.handleSubmit(onSubmit)} className="flex flex-row items-center justify-center gap-2">
          <Save size={16} color={colorScheme.colorScheme === 'dark' ? 'black' : 'white'} className="inline"/><Text>Save</Text>
        </Button>
      </Form>
    </View>
  );
}
 
export default CreateIncomeScreen;