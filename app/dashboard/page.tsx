'use client';

import { Profile } from '@/components/Wallet';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const session = useSession();
  const loading = session?.status == 'loading';

  return (
    <>
      <Profile
        loading={loading}
        image={session?.data?.user?.image || ''}
        name={session?.data?.user?.name || ''}
        user={!!session?.data?.user}
      />
    </>
  );
};

export default Dashboard;
