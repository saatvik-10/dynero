'use client'

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';

const Appbar = () => {
  const session = useSession();

  return (
    <div className='flex flex-col max-w-3xl shadow-md border-none items-center justify-between'>
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
