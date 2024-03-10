"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from '@/registry/default/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/registry/default/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { ApiList } from '@/components/ui/api-list';

import { SizeColumn, columns } from './columns';
import { useEffect } from 'react';
import { useSizesEventStore } from '@/event-stores/size-event-store';

export const SizesClient: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const getSizesByEvent = useSizesEventStore(
    (state: any) => state.getSizesByEvent
  );

  const sizesFromEventStore = useSizesEventStore((state: any) => state.sizes);

  useEffect(() => {
    getSizesByEvent();
  }, []);

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Sizes (${sizesFromEventStore.length})`}
          description='Manage sizes for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey='sizeType'
        columns={columns}
        data={sizesFromEventStore}
      />
      {/* <Heading title='API' description='API calls for Sizes' />
      <Separator />
      <ApiList entityName='sizes' entityIdName='sizeId' /> */}
    </>
  );
};
