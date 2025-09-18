'use client'

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';

const Appbar = () => {
  const session = useSession();

  return (
    <div className='flex flex-row max-w-7xl shadow-lg border-none items-center justify-between p-4 m-6 rounded-md'>
      <div>DYNERO</div>

      <div>
        {session?.data?.user ? (
          <Button onClick={() => signOut}>Sign Out</Button>
        ) : (
          <Button onClick={() => signIn}>Sign In</Button>
        )}
      </div>
    </div>
  );
};

export default Appbar;
