// import { Card } from '@/app/ui/dashboard/cards'; // waste this line per chapter 9
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import {lusitana} from '@/app/ui/fonts';

// import { 
  // fetchRevenue ,  // waste this line per chapter 9
  // fetchLatestInvoices , // waste this line per chapter 9
  // fetchCardData , // waste this line per chapter 9
// } from '@/app/lib/data';

import { Suspense } from 'react';  // import this line per chapter 9
import CardWrapper from '@/app/ui/dashboard/cards';  // import this line per chapter 9
import { 
  RevenueChartSkeleton , // import this line per chapter 9
  LatestInvoicesSkeleton , // import this line per chapter 9
  CardsSkeleton ,  // import this line per chapter 9
} from '@/app/ui/skeletons'; 



export default async function Page(){

  // const revenue = await fetchRevenue(); // waste this line per chapter 9
  // const latestInvoices = await fetchLatestInvoices(); // waste this line per chapter 9
  
  // waste the destructured statements per chapter 9
  
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();
  
  // await console.log("await revenue", await revenue);
  // await console.log("await latestInvoices", await latestInvoices);
  // await console.log("await numberOfInvoices", await numberOfInvoices);
  // await console.log("await numberOfCustomers", await numberOfCustomers);
  // await console.log("await totalPaidInvoices", await totalPaidInvoices);
  // await console.log("await totalPendingInvoices", await totalPendingInvoices);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      
      {/* Modify the div containing the multiple amount of Card components per chapter 9 */}
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" />
      </div> */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        
        {/* Modify the mark-up containing the RevenueChart component per chapter 9 */}
        {/* <RevenueChart revenue={revenue} /> */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        {/* Modify the mark-up containing the LatestInvoices component per chapter 9 */}
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}

/* export default function Page(){
  return <p>Dashboard Page, baby!</p>;
} */