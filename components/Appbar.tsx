'use client'

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const Appbar = () => {
  const session = useSession();

  const handleSignIn = async() => {
    try {
      await signIn('google');
    } catch (err:any) {
      toast.error("Error signing in", err)
    }
  }

  const handleSignOut = async() => {
    try {
      await signOut();
      toast.success("Signed out successfully")
    } catch (err: any) {
      toast.error("Error signing out", err)
    }
  }

  return (
    <div className='flex flex-row max-w-7xl shadow-lg border-none items-center justify-between p-4 m-6 rounded-md'>
      <div className='font-bold text-lg'>DYNERO</div>

      <div>
        {session?.data?.user ? (
          <Button className='bg-red-500 cursor-pointer hover:bg-red-500/80' onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <Button className='bg-blue-500 cursor-pointer hover:bg-blue-500/80' onClick={handleSignIn}>Sign In</Button>
        )}
      </div>
    </div>
  );
};

export default Appbar;
