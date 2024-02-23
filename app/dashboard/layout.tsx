import SideNav from '@/app/ui/dashboard/sidenav';

import { Metadata } from 'next'; // import this line per chapter 16

export const metadata: Metadata = { title: 'Dashboard' , }; // import this line per chapter 16

export default function Layout({children}: {children: React.ReactNode} ){
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <SideNav />
      </div>
      <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>{children}</div>
    </div>
  );
}