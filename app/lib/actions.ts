'use server';  

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {signIn} from '@/auth'; // import this line per chapter 15
import {AuthError} from 'next-auth'; // import this line per chapter 15


const FormSchema = z.object( {
  id: z.string(),
  
  // customerId: z.string(), // Old value per chapter 14
  customerId: z.string( {
    invalid_type_error: 'Please select a customer.'
  } ), // NEW value per chapter 14
  
  // amount: z.coerce.number(), // Old value per chapter 14
  amount: z.coerce.number().gt(0, { message: 'Enter an amount GT $0.' } ), // NEW value per chapter 14
  
  // status: z.enum(['pending', 'paid']), // Old value per chapter 14
  status: z.enum(['pending', 'paid'] , {invalid_type_error: 'Select an invoice status.' } ), // NEW value per chapter 14

  date: z.string() ,
} );


const CreateInvoice = FormSchema.omit({
  id: true ,
  date: true ,
});

const UpdateInvoice = FormSchema.omit({
  id: true ,
  date: true ,
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
}; // NEW value per chapter 14

// export async function createInvoice(formData: FormData){ // Old format per chapter 14
export async function createInvoice(prevState: State, formData: FormData){ // New format per chapter 14

  // v1
  // const rawFormData_v1 = { customerId: formData.get('customerId'), amount: formData.get('amount') , status: formData.get('status') , };
  // console.log('rawFormData_v1' , rawFormData_v1 , '\n');

  // v2
  // const formDataIterator = formData.entries();
  // const rawFormData_v2 = Object.fromEntries(formDataIterator);
  // console.log('formDataIterator' , formDataIterator, '\n' ); // Object [FormData Iterator] {}
  // console.log('typeof formDataIterator' , typeof formDataIterator, '\n' ); // object
  // console.log('rawFormData_v2' , rawFormData_v2, '\n' );
  // console.log('typeof rawFormData_v2.amount' , typeof rawFormData_v2.amount, '\n' );

  // v.twentify-billion... and three octo-eleventh... Bbbb-bbb-bbb-bbb-bb...
  // const { customerId, amount, status } = CreateInvoice.parse( {
  //   customerId: formData.get('customerId'), 
  //   amount: formData.get('amount') , 
  //   status: formData.get('status') ,
  // } );

  // To quote Sir Billy Connolly b/c I should have stopped counting a while back -- Oh, for fa-a!!!
  const validatedFields = CreateInvoice.safeParse( { // New value per chapter 14
    customerId: formData.get('customerId'), 
    amount: formData.get('amount') , 
    status: formData.get('status') ,
  } );

  // New block insertion per chapter 14
  // If form validation fails, return errors early. Otherwise continue
  if(!validatedFields.success){
    return {
      errors: validatedFields.error.flatten().fieldErrors ,
      message: 'Missing fields - failed to create invoice'
    };
  }

  const { customerId, amount, status } = validatedFields.data; // Necessitated var assignments per chapter 14
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // wrap this section in try\catch clause per chapter 13
  try{
    await sql `
      INSERT INTO invoices (customer_id, amount, status, date)
          VALUES 
              (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  }
  catch(error){
    return {
      message: 'Database derrpage: Failed to create invoice.'
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// export async function updateInvoice(id: string, formData: FormData ){ // Old format per chapter 14
export async function updateInvoice(id: string, prevState: State, formData: FormData ){ // New format per chapter 14

  // knock-knock... who's there? flippin' chapter 14
  // const { customerId, amount, status } = UpdateInvoice.parse( {
  //   customerId: formData.get('customerId'), 
  //   amount: formData.get('amount') , 
  //   status: formData.get('status') ,
  // } );

  const validatedFields = UpdateInvoice.safeParse( {
    customerId: formData.get('customerId'), 
    amount: formData.get('amount') , 
    status: formData.get('status') ,
  } );

  // New block insertion per chapter 14
  // If form validation fails, return errors early. Otherwise continue
  if(!validatedFields.success){
    return {
      errors: validatedFields.error.flatten().fieldErrors ,
      message: 'Missing fields - failed to update invoice'
    };
  }

  const { customerId, amount, status } = validatedFields.data; // Necessitated var assignments per chapter 14
  const amountInCents = amount * 100;

  // wrap this section in try\catch clause per chapter 13
  try{
    await sql `
      UPDATE invoices
          SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
          WHERE id = ${id}
    `;
  }
  catch(error){
    return {
      message: 'Database derrpage: Failed to update invoice.'
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string){
  
  // wrap this section in try\catch clause per chapter 13
  try{
    
    await sql `
      DELETE FROM invoices
          WHERE id = ${id}
    `;
    
    revalidatePath('/dashboard/invoices');
    
    return {
      message: 'Invoice has been deleted.'
    };
  }
  catch(error){
    return {
      message: 'Database derrpage: Failed to delete invoice.'
    };
  }
  
}

// create this function per chapter 15
export async function authenticate(
  prevState: string | undefined,
  formData: FormData ,
){
  try {
    await signIn('credentials', formData);
  }
  catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
};

// Create this document per lesson found in chapter 12