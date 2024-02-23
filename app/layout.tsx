import '@/app/ui/global.css';
import {inter} from '@/app/ui/fonts';
import { Metadata } from 'next'; // import this line per chapter 15

export const metadata: Metadata = { 
  // title: 'ACME Dashboard Tutorial' , 
  title: {
    template: '%s | ACME Dashboard Tutorial',
    default: 'ACME Dashboard Tutorial', 
  } , 
  description: 'The official Next.js Course Dashboard, built with App Router',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
}; // import this line per chapter 15

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body>{children}</body> */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
