import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next'; // import this line per chapter 16

export const metadata: Metadata = { title: 'Customers' , }; // import this line per chapter 16

export default async function Page(
  {
    searchParams
  } : {
    searchParams?: {
      query?: string;
      page?: string;
    }
  }
){
  
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}

/* export default function Page(){
  return <p>Customers Page, baby!</p>;
} */