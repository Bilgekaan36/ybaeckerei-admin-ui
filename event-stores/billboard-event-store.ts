import { BillboardColumn } from '@/app/(dashboard)/[storeId]/(routes)/billboards/components/columns';
import axios from 'axios';
import { format } from 'date-fns';
import { create } from 'zustand';

export const useBillboardEventStore = create((set) => ({
  billboards: [],
  getBillboardsByEvent: async () => {
    const billboards = await axios.get(
      `${process.env.NEXT_PUBLIC_QUERIES_SERVICE_API_URL}/listing/billboards`
    );
    const formattedBillboards: BillboardColumn[] = billboards.data.map(
      (item: BillboardColumn) => ({
        billboardId: item.billboardId,
        billboardTitle: item.billboardTitle,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
      })
    );
    set(() => ({ billboards: formattedBillboards }));
  },
}));
