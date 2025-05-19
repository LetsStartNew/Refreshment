
import React, { useState } from 'react';
import { Address } from './AddressSelection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ManualAddressFormProps {
  onSubmit: (address: Address) => void;
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  number: z.string()
    .min(10, { message: 'number number must be at least 10 digits' })
    .regex(/^[0-9]+$/, { message: 'number number must contain only digits' }),
  street: z.string().min(1, { message: 'Street address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  pincode: z.string()
    .min(6, { message: 'Pincode must be 6 digits' })
    .max(6, { message: 'Pincode must be 6 digits' })
    .regex(/^[0-9]+$/, { message: 'Pincode must contain only digits' }),
  landmark: z.string().optional(),
  is_save: z.boolean().default(false)
});

const ManualAddressForm = ({ onSubmit }: ManualAddressFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      number: '',
      street: '',
      city: 'chennai',
      pincode: '',
      landmark: '',
      is_save: true
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
  const address: Address = {
    name: values.name,
    number: values.number,
    street: values.street,
    city: values.city,
    pincode: values.pincode,
    landmark: values.landmark || undefined,
    is_save: values.is_save,
  };
  try {
    const token = localStorage.getItem('authToken');

    const response = await fetch('http://localhost:5000/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': token,
      },
      body: JSON.stringify(address),
    });

    if (!response.ok) {
      throw new Error('Failed to save address');
    }

    const result = await response.json();
    console.log('Address submitted successfully:', result);

    // Optionally trigger the parent callback
    onSubmit(address);
  } catch (error) {
    console.error('Error submitting address:', error);
    // You can show an error toast or alert here
  }
};

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Enter Address Manually</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name for this address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>number Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="Street address, building, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="6-digit pincode" {...field} maxLength={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="landmark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landmark (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Nearby landmark for easier navigation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="is_save"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Save this address for future orders</FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">Confirm Address</Button>
        </form>
      </Form>
    </div>
  );
};

export default ManualAddressForm;
