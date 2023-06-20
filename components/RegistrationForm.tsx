'use client';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  firstname: z
    .string({
      required_error: 'First Name is required',
      invalid_type_error: 'First Name must be a string',
    })
    .min(2, {
      message: 'First Name must be at least 2 characters.',
    }),
  lastname: z
    .string({
      required_error: 'Last Name is required',
      invalid_type_error: 'Last Name must be a string',
    })
    .min(2, {
      message: 'Last Name must be at least 2 characters.',
    }),
  email: z
    .string({
      required_error: 'email Level is required',
      invalid_type_error: 'email must be a string',
    })
    .min(2, {
      message: 'E-Mail must be at least 2 characters.',
    }),
  climbinglevel: z.string({
    required_error: 'Climbing Level is required',
    invalid_type_error: 'Climbing Level must be a string',
  }),
});

export function RegistrationForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      climbinglevel: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="climbinglevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the difficulty range you currently climb in" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="v1-v3">Beginners(V1-V3)</SelectItem>
                  <SelectItem value="v4-v6">Intermediate(V4-V6)</SelectItem>
                  <SelectItem value="v7-v9">Advanced(V7-V9)</SelectItem>
                  <SelectItem value="v10-v12">Pro(v10-V12)</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
