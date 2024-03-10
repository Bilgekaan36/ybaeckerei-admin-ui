"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Button } from '@/registry/default/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/registry/default/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/registry/default/ui/form';
import { Input } from '@/registry/new-york/ui/input';
import { AlertModal } from '@/components/modals/alert-modal';
import { SizeColumn } from '../../components/columns';

const formSchema = z.object({
  sizeValue: z.string().min(1),
  sizeType: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
  initialData: SizeColumn | null;
}

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const title = initialData ? 'Edit size' : 'Create size';
  const description = initialData ? 'Edit a size' : 'Add a new size';
  const toastMessage = initialData ? 'Size updated.' : 'Size created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    defaultValues: initialData || {
      sizeValue: '',
      sizeType: '',
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_COMMANDS_SERVICE_API_URL}/administration/editSize`,
          {
            sizeValue: data.sizeValue,
            sizeType: data.sizeType,
          }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_COMMANDS_SERVICE_API_URL}/registration/register-size`,
          data
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_COMMANDS_SERVICE_API_URL}/administration/removeSize`,
        {
          sizeId: params.sizeId,
        }
      );
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success('Size deleted.');
    } catch (error) {
      toast.error('Make sure you removed all products using this size first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            size='icon'
            onClick={() => setOpen(true)}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='sizeValue'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Size value'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sizeType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Size type'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
