import { auth } from '@clerk/nextjs';
import axios from 'axios';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await axios.get(
    `${process.env.NEXT_PUBLIC_QUERIES_SERVICE_API_URL}/listing/stores`
  );

  if (stores.data.length === 0) {
    redirect('/');
  }

  return <>{children}</>;
}
