import { CategoryColumn } from '@/app/(dashboard)/[storeId]/(routes)/categories/components/columns';
import axios from 'axios';
import { format } from 'date-fns';
import { create } from 'zustand';

export const useCategoriesEventStore = create((set) => ({
  categories: [],
  getCategoriesByEvent: async () => {
    const categories = await axios.get(
      `${process.env.NEXT_PUBLIC_QUERIES_SERVICE_API_URL}/listing/categories`
    );
    const formattedCategories: CategoryColumn[] = categories.data.map(
      (item: CategoryColumn) => ({
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        billboardTitle: item.billboardTitle,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
      })
    );
    set(() => ({ categories: formattedCategories }));
  },
}));
