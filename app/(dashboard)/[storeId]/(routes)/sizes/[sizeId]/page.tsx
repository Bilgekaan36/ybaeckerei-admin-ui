import axios from 'axios';
import { SizeForm } from './components/size-form';

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size =
    params.sizeId !== 'new'
      ? await axios.get(
          `${process.env.NEXT_PUBLIC_QUERIES_SERVICE_API_URL}/listing/sizes?sizeId=${params.sizeId}`
        )
      : { data: null };

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeForm initialData={size.data ? size.data[0] : null} />
      </div>
    </div>
  );
};

export default SizePage;
