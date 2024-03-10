'use client';
import * as React from 'react';
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from 'lucide-react';

import { Nav } from '@/components/nav';
import { Mail } from '@/lib/data';
import { cn, setToast } from '@/lib/utils';
import { Separator } from '@/registry/new-york/ui/separator';

import { TooltipProvider } from '@/registry/new-york/ui/tooltip';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/registry/new-york/ui/resizable';
import StoreSwitcher from '@/components/store-switcher';
import { useBillboardEventStore } from '@/event-stores/billboard-event-store';

interface ResizeLayoutWrapperProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  stores: any;
}

export function ResizeLayoutWrapper({
  defaultCollapsed = false,
  navCollapsedSize,
  children,
  stores,
}: ResizeLayoutWrapperProps & { children: React.ReactNode }) {
  const resizeGroupRef = React.useRef(null);
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const getBillboardsByEvent = useBillboardEventStore(
    (state: any) => state.getBillboardsByEvent
  );

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        id='resize-group'
        ref={resizeGroupRef}
        direction='horizontal'
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className='min-h-screen h-full items-stretch'
      >
        <ResizablePanel
          defaultSize={isCollapsed ? 4 : 20}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => setIsCollapsed(true)}
          onExpand={() => setIsCollapsed(false)}
          className={cn(
            isCollapsed &&
              'min-w-[50px] transition-all duration-300 ease-in-out'
          )}
        >
          <div
            className={cn(
              'flex h-16 items-center justify-center',
              isCollapsed ? 'h-16' : 'px-2'
            )}
          >
            <StoreSwitcher isCollapsed={isCollapsed} items={stores} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: 'Inbox',
                label: '128',
                icon: Inbox,
                variant: 'default',
                onClick: () => {
                  setIsCollapsed((prev) => !prev);
                  // @ts-ignore
                  resizeGroupRef.current?.setLayout(
                    isCollapsed ? [20, 80] : [4, 96]
                  );
                },
              },
              {
                title: 'Drafts',
                label: '9',
                icon: File,
                variant: 'ghost',
              },
              {
                title: 'Sent',
                label: '',
                icon: Send,
                variant: 'ghost',
              },
              {
                title: 'Junk',
                label: '23',
                icon: ArchiveX,
                variant: 'ghost',
              },
              {
                title: 'Trash',
                label: '',
                icon: Trash2,
                variant: 'ghost',
              },
              {
                title: 'Archive',
                label: '',
                icon: Archive,
                variant: 'ghost',
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: 'Social',
                label: '972',
                icon: Users2,
                variant: 'ghost',
              },
              {
                title: 'Updates',
                label: '342',
                icon: AlertCircle,
                variant: 'ghost',
              },
              {
                title: 'Forums',
                label: '128',
                icon: MessagesSquare,
                variant: 'ghost',
              },
              {
                title: 'Shopping',
                label: '8',
                icon: ShoppingCart,
                variant: 'ghost',
              },
              {
                title: 'Promotions',
                label: '21',
                icon: Archive,
                variant: 'ghost',
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={isCollapsed ? 96 : 80} minSize={30}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
