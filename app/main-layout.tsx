'use server';
import { cookies } from 'next/headers';

import { ResizeLayoutWrapper } from '@/components/resize-layout-wrapper';
import { accounts, mails } from '@/lib/data';
import { Separator } from '@/registry/new-york/ui/separator';
import Navbar from '@/components/navbar';
import axios from 'axios';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layout = cookies().get('react-resizable-panels:layout');
  const collapsed = cookies().get('react-resizable-panels:collapsed');
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  const stores = await axios.get(
    `${process.env.NEXT_PUBLIC_QUERIES_SERVICE_API_URL}/listing/stores`
  );

  return (
    <ResizeLayoutWrapper
      accounts={accounts}
      mails={mails}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
      stores={stores.data}
    >
      <Navbar />
      {children}
    </ResizeLayoutWrapper>
  );
}
