import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // pages
  pages: {
    signIn: '/login',
  } ,
  // callbacks
  callbacks: {
    authorized(
      { auth, request: {nextUrl} }
    ){
      // auth prop - contains the user's session
      // request prop - contains the incoming request
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if(isOnDashboard){
        if(isLoggedIn){
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      }
      else 
      if(isLoggedIn){
        return Response.redirect(new URL('/dashboard', nextUrl ));
      }
      return true;
    }
  } ,
  // providers
  providers: [] , // Add providers with an empty array
} satisfies NextAuthConfig;

// Create this document per lesson found in chapter 15