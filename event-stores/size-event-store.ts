import { SizeColumn } from '@/app/(dashboard)/[storeId]/(routes)/sizes/components/columns';
import axios from 'axios';
import { format } from 'date-fns';
import { create } from 'zustand';

export const useSizesEventStore = create((set) => ({
  sizes: [],
  getSizesByEvent: async () => {
    const sizes = await axios.get(
      `${process.env.NEXT_PUBLIC_QUERIES_SERVICE_API_URL}/listing/sizes`
    );
    const formattedSizes: SizeColumn[] = sizes.data.map((item: SizeColumn) => ({
      sizeId: item.sizeId,
      sizeValue: item.sizeValue,
      sizeType: item.sizeType,
      createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));
    set(() => ({ sizes: formattedSizes }));
  },
}));
