'use client';

import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import { Button } from '@/registry/default/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/registry/new-york/ui/separator';
import { BillboardColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { ApiList } from '@/components/ui/api-list';
import React, { useEffect } from 'react';
import { useBillboardEventStore } from '@/events/billboard-event-store';

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const getBillboardsByEvent = useBillboardEventStore(
    (state: any) => state.getBillboardsByEvent
  );

  const billboardsFromEventStore = useBillboardEventStore(
    (state: any) => state.billboards
  );

  useEffect(() => {
    getBillboardsByEvent();
  }, []);

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Billboards (${billboardsFromEventStore.length})`}
          description='Manage billboards for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey='billboardTitle'
        columns={columns}
        data={billboardsFromEventStore}
      />
      {/* <Heading title='API' description='API calls for Billboards' />
      <Separator /> */}
      {/* <ApiList entityName='billboards' entityIdName='billboardId' /> */}
    </>
  );
};

export default BillboardClient;
