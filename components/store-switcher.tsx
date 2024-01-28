'use client';

import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useStoreModal } from '@/hooks/use-store-modal';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/default/ui/popover';
import { Button } from '@/registry/default/ui/button';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/registry/default/ui/command';
import { randomUUID } from 'crypto';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface IStore {
  storeId: string;
  storeTitle: string;
  street: string;
  postalCode: number;
  city: string;
}

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: IStore[];
  isCollapsed?: boolean;
}

export default function StoreSwitcher({
  className,
  items = [],
  isCollapsed,
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    storeTitle: item.storeTitle,
    storeId: item.storeId,
  }));

  const currentStore = formattedItems.find(
    (item) => item.storeId === params.storeId
  );

  const [open, setOpen] = useState<boolean>(false);

  const onStoreSelect = (store: { storeTitle: string; storeId: string }) => {
    setOpen(false);
    router.push(`/${store.storeId}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'flex w-full items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
            isCollapsed &&
              'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto'
          )}
        >
          <StoreIcon className={isCollapsed ? 'h-4 w-4' : 'mr-2 h-4 w-4'} />
          {isCollapsed ? '' : currentStore?.storeTitle || 'Select a store'}
          {isCollapsed ? (
            ''
          ) : (
            <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search store...' />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading='Stores'>
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.storeTitle}
                  onSelect={() =>
                    onStoreSelect({
                      storeTitle: store.storeTitle,
                      storeId: store.storeId,
                    })
                  }
                  className='text-sm'
                >
                  <StoreIcon className='mr-2 h-4 w-4' />
                  {store.storeTitle}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentStore?.storeId === store.storeId
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className='mr-2 h-5 w-5' />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
