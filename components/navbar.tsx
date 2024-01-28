import { UserButton } from '@clerk/nextjs';

import { MainNav } from '@/components/main-nav';

import { ThemeToggle } from '@/components/theme-toggle';
import { Search } from '@/app/(dashboard)/[storeId]/(routes)/components/search';
import { UserNav } from '@/app/(dashboard)/[storeId]/(routes)/components/user-nav';

const Navbar = async () => {
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeToggle />
          <UserButton afterSignOutUrl='/' />
          {/* 
          Maybe we can use this for the user nav?
          <UserNav /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
