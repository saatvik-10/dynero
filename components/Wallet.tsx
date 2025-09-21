'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { BadgeDollarSign, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useTokens } from '@/hooks/useToken';
import TokenTableList from './TokenTableList';

export function Profile({ publicKey }: { publicKey: string }) {
  const route = useRouter();
  const session = useSession();
  const loadingStatus = session?.status == 'loading';

  const [copy, setCopy] = useState<boolean>(false);
  const { loading, tokenBalance } = useTokens(
    '8fCXUDCkvhEQkYNyMbsWgYsaqikorojdv2hgfezfvbdD'
  );
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

  if (loadingStatus) {
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

  if (loading) {
    return <p>loading</p>;
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
            <span className='text-lg md:text-xl'>
              Yello again,{' '}
              <span className='font-semibold'>
                {session?.data?.user?.name}!
              </span>
            </span>
          </div>

          <Separator className='my-3' />

          <div className='flex flex-col'>
            <span className='text-xs md:text-sm text-slate-500 flex items-center gap-1'>
              <BadgeDollarSign className='size-4' /> Your Assets in Dynero
            </span>
            <div className='flex items-center justify-between pt-4'>
              <div className='flex items-end md:items-end gap-1 font-bold text-green-600 text-3xl md:text-4xl'>
                $ {tokenBalance?.totalBalance}
                <span className='font-semibold text-xs md:text-xl text-gray-500'>
                  USD
                </span>
              </div>
              <Button
                onClick={handleCopy}
                size={'sm'}
                className='text-xs md:text-sm bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer'
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

            <TokenTableList tks={tokenBalance?.tks || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
