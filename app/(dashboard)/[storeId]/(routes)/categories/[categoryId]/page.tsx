import axios from 'axios';
import { CategoryForm } from './components/category-form';
import { BillboardColumn } from '../../billboards/components/columns';
import { CategoryColumn } from '../components/columns';

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category =
    params.categoryId !== 'new'
      ? await axios.get(
          `${process.env.NEXT_PUBLIC_QUERIES_SERVICE_API_URL}/listing/categories?categoryId=${params.categoryId}`
        )
      : { data: null };

  const billboards = await axios.get(
    `${process.env.NEXT_PUBLIC_QUERIES_SERVICE_API_URL}/listing/billboards`
  );
  const formattedBillboards: BillboardColumn[] = billboards.data.map(
    (item: BillboardColumn) => ({
      billboardId: item.billboardId,
      billboardTitle: item.billboardTitle,
    })
  );

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm
          billboards={billboards.data ? formattedBillboards : []}
          initialData={category.data ? category.data[0] : null}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
