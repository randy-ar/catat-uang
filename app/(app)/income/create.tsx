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
import React, { use, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Portal } from '@rn-primitives/portal';
import * as Toast from '@rn-primitives/toast';
import api from '~/lib/useAxios';
import { AxiosError } from "axios";
import { Option } from "@rn-primitives/select";
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { fi } from "zod/v4/locales";
import { ScrollView } from "react-native-gesture-handler";

interface IncomeType{
  name: string;
  amount: number;
  date: Date;
  description: string | null;
  category: IncomeCategoryType | null;
}

interface IncomeCategoryType{
  label: string;
  value: string;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Enter a income name.',
  }),
  amount: z.number().min(1000, {
    message: 'Income amount must be at least Rp. 1.000.',
  }),
  date: z.date().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.looseObject({}).optional().nullable(),
});

const CreateIncomeScreen = () => {
  const [open, setOpen] = React.useState(false);
  const [seconds, setSeconds] = React.useState(3);
  const [incomeCategories, setIncomeCategories] = React.useState<IncomeCategoryType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState<DateType>();

  const defaultStyles = useDefaultStyles();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setLoading(true)
    api.get('/incomes/categories')
    .then(res => res.data)
    .then((res) => {
      setIncomeCategories(res.map((item : { name: string, id: string }) => ({
        label: item.name,
        value: item.id,
      })));
      console.log(incomeCategories);
    }).catch((err) => {
      const e = err as AxiosError;
      console.log(e);
    }).finally(() => {
      setLoading(false)
    })
  }, [])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: undefined,
      description: null,
      date: new Date(),
      category: {label: "Salary", value: 1} // init hardcode
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    console.log({
      name: values.name,
      amount: values.amount,
      description: values.description ?? '',
      date: values.date?.toISOString().split('T')[0],
      category: {
        id: values.category?.value,
        name: values.category?.label,
      },
    });
    api.post('/incomes', {
      name: values.name,
      amount: values.amount,
      description: values.description ?? '',
      date: values.date?.toISOString().split('T')[0],
      category: {
        id: values.category?.value,
        name: values.category?.label,
      },
    })
    .then(res => res.data)
    .then((res) => {
      console.log(res);
      setOpen((prev) => !prev)
      router.navigate('/income')
    }).catch((err) => {
      const e = err as AxiosError;
      console.log(e);
    }).finally(() => {
      setLoading(false)
    })
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
    <ScrollView className="flex-1">
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
              control={form.control}
              name='date'
              render={({ field }) => (
                <DateTimePicker
                  mode="single"
                  date={selected}
                  styles={defaultStyles}
                  {...field}
                  onChange={({ date }) => {
                    field.value = date as Date;
                    setSelected(date)
                  }}
                />
              )}
            />
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
                  value={field.value as Partial<Option>}
                >
                  <SelectTrigger disabled={loading}>
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
                      {incomeCategories.map((category) => (
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
          <Button disabled={loading} onPress={form.handleSubmit(onSubmit)} className="flex flex-row items-center justify-center gap-2 mt-8">
            <Save size={16} color={colorScheme.colorScheme === 'dark' ? 'black' : 'white'} className="inline"/><Text>Save</Text>
          </Button>
        </Form>
      </View>
    </ScrollView>
  );
}
 
export default CreateIncomeScreen;