import axios from 'axios';
import { BillboardForm } from './components/billboard-form';

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard =
    params.billboardId !== 'new'
      ? await axios.get(
          `${process.env.NEXT_PUBLIC_QUERIES_SERVICE_API_URL}/listing/billboards?billboardId=${params.billboardId}`
        )
      : { data: null };

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm
          initialData={billboard.data ? billboard.data[0] : null}
        />
      </div>
    </div>
  );
};

export default BillboardPage;
