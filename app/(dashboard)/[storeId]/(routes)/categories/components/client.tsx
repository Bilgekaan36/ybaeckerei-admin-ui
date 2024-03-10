'use client';

import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import { Button } from '@/registry/default/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/registry/default/ui/separator';
import { CategoryColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { ApiList } from '@/components/ui/api-list';
import { useCategoriesEventStore } from '@/event-stores/category-event-store';
import { useEffect } from 'react';

export const CategoryClient: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const getCategoriesByEvent = useCategoriesEventStore(
    (state: any) => state.getCategoriesByEvent
  );

  const categoriesFromEventStore = useCategoriesEventStore(
    (state: any) => state.categories
  );

  useEffect(() => {
    getCategoriesByEvent();
  }, []);

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Categories (${categoriesFromEventStore.length})`}
          description='Manage categories for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey='categoryName'
        columns={columns}
        data={categoriesFromEventStore}
      />
      {/* <Heading title='API' description='API calls for Categories' />
      <Separator />  */}
      {/* <ApiList entityName='categories' entityIdName='billboardId' /> */}
    </>
  );
};
