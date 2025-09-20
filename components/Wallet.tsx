'use client';

interface ProfileProps {
  loading: boolean;
  image: string;
  name: string;
  user: boolean;
}

import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function Profile({ loading, image, name, user }: ProfileProps) {
  const route = useRouter();

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

  if (!user) {
    route.push('/');
    toast.error('Please sign in to continue!');
  }

  return (
    <div className='flex justify-center pt-10'>
      <div className='w-full max-w-md rounded-md shadow-md md:max-w-xl'>
        <div className='p-10'>
          <div className='flex items-center gap-3'>
            <img src={image} alt='' className='size-10 rounded-full' />
            <span className='md:text-xl'>Yello again, {name}!</span>
          </div>
          <Separator className='my-3' />
        </div>
      </div>
    </div>
  );
}
