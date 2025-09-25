'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { ArrowLeft, BadgeDollarSign, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useTokens } from '@/hooks/useToken';
import TokenTableList from './TokenTableList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Swap from './Swap';

export function Profile({ publicKey }: { publicKey: string }) {
  const route = useRouter();
  const session = useSession();
  const loadingStatus = session?.status == 'loading';

  const [copy, setCopy] = useState<boolean>(false);
  const { loading, tokenBalance } = useTokens(publicKey);
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

  if (!session.data?.user) {
    window.location.href = '/';
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center pt-10 relative gap-y-6'>
      <Button
        onClick={() => {
          route.push('/');
        }}
        className='flex itens-center justify-center gap-2 absolute md:left-10 top-4 left-4 bg-transparent text-slate-700 text-lg font-semibold'
      >
        <ArrowLeft className='size-4' />
        Back
      </Button>
      <div className='w-full max-w-md rounded-md shadow-md md:max-w-xl bg-white'>
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

            <Separator className='my-3' />

            <Tabs defaultValue='tokens'>
              <TabsList className='flex items-center justify-center w-full [&>*]:cursor-pointer'>
                <TabsTrigger value='tokens'>TOKENS</TabsTrigger>
                <TabsTrigger value='swap'>SWAP</TabsTrigger>
              </TabsList>
              <TabsContent value='tokens'>
                <TokenTableList tks={tokenBalance?.tks || []} />
              </TabsContent>
              <TabsContent value='swap'>
                <Swap tokenBalance={tokenBalance} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-start bg-white rounded-xl p-8 shadow-md font-semibold md:text-xl'>
        <ul style={{ listStyleType: 'circle' }} className='space-y-2'>
          <li>
            This is a Decentralized-Centralized exchange...hence the
            transactions might be slow!
          </li>
          <li>
            Your private is fully encrypted and your assets will remain safe in
            this wallet!
          </li>
        </ul>
      </div>
    </div>
  );
}
