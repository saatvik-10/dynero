'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const session = useSession();
  const route = useRouter();

  return (
    <main className='flex flex-col items-center justify-center py-10'>
      <div className='mx-auto max-w-4xl space-y-8 text-center'>
        <h1 className='bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-6xl leading-tight font-bold text-transparent md:text-7xl dark:from-slate-100 dark:via-slate-300 dark:to-slate-100'>
          Dynero
        </h1>

        <p className='mx-auto max-w-3xl text-xl leading-relaxed font-medium text-slate-600 md:text-2xl dark:text-slate-300'>
          Where{' '}
          <span className='relative'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-transparent'>
              DECENTRALIZATION
            </span>
            <span className='absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-blue-600 to-purple-600'></span>
          </span>{' '}
          meets{' '}
          <span className='relative'>
            <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text font-semibold text-transparent'>
              CENTRALIZATION
            </span>
            <span className='absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-green-600 to-emerald-600'></span>
          </span>
        </p>

        <p className='mx-auto max-w-2xl text-lg text-slate-500 dark:text-slate-400'>
          Experience the perfect balance of traditional finance and cutting-edge
          blockchain technology
        </p>
      </div>

      <div className='pt-8'>
        {session?.data?.user ? (
          <Button
            size='lg'
            onClick={() => route.push('/dashboard')}
            className='flex transform cursor-pointer items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
          >
            Continue to Dashboard
            <ArrowRight />
          </Button>
        ) : (
          <Button
            size='lg'
            className='transform cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
            onClick={() => {
              signIn('google');
            }}
          >
            Sign In with Google
          </Button>
        )}
      </div>

      <div className='flex flex-wrap justify-center gap-3 pt-8'>
        {['Secure', 'Fast', 'Decentralized', 'User-Friendly'].map((feature) => (
          <span
            key={feature}
            className='rounded-full border border-slate-200 bg-white/50 px-4 py-2 text-sm font-medium text-slate-600 backdrop-blur-sm'
          >
            {feature}
          </span>
        ))}
      </div>

      <div
        className='flex flex-col md:gap-y-0 md:flex-row items-center justify-center gap-8 pt-8
  [&>*]:border-2 [&>*]:shadow-md [&>*]:rounded-lg [&>*]:h-48
  [&>*]:transform [&>*]:transition [&>*]:duration-300
  [&>*]:hover:scale-110 [&>*]:hover:-translate-y-2 [&>*]:cursor-pointer'
      >
        <img src='/1.png' alt='' />
        <img src='/2.png' alt='' />
        <img src='/3.png' alt='' />
      </div>
    </main>
  );
}
