'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { BadgeDollarSign, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

export function Profile({ publicKey }: { publicKey: string }) {
  const route = useRouter();
  const session = useSession();
  const loading = session?.status == 'loading';

  const [copy, setCopy] = useState<boolean>(false);

  useEffect(() => {
    if (copy) {
      let timeout = setTimeout(() => {
        setCopy(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copy]);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey);
    setCopy(true);
  };

  if (loading) {
    return (
      <div className='flex justify-center pt-10'>
        <div className='w-full max-w-md rounded-md shadow-md md:max-w-xl'>
          <div className='p-10'>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-10 w-10 rounded-full' />
              <Skeleton className='h-6 w-48' />
            </div>
            <Separator className='my-3' />
          </div>
        </div>
      </div>
    );
  }

  if (!session?.data?.user) {
    route.push('/');
    toast.error('Please sign in to continue!');
  }

  return (
    <div className='flex justify-center pt-10'>
      <div className='w-full max-w-md rounded-md shadow-md md:max-w-xl'>
        <div className='p-10'>
          <div className='flex items-center gap-3'>
            <img
              src={session?.data?.user?.image || ''}
              alt=''
              className='size-10 rounded-full'
            />
            <span className='md:text-xl'>
              Yello again, {session?.data?.user?.name}!
            </span>
          </div>

          <Separator className='my-3' />

          <div className='flex flex-col'>
            <span className='text-sm text-slate-400 flex items-center gap-1'>
              <BadgeDollarSign className='size-4' /> Your Assets in Dynero
            </span>
            <div className='flex items-center justify-between pt-5'>
              <div></div>
              <Button
                onClick={handleCopy}
                size={'sm'}
                className='bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer'
              >
                {copy ? (
                  <div className='flex items-center gap-2'>
                    <CheckCircle className='size-4 text-white' />
                    Wallet Address copied
                  </div>
                ) : (
                  'Copy Wallet Address'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
