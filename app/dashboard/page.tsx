import { Profile } from '@/components/Wallet';
import { getUserWallet } from '../actions/balance';
import { toast } from 'sonner';

const Dashboard = async () => {
  const userWallet = await getUserWallet();

  if (userWallet.error || !userWallet.userWallet?.pubkey) {
    toast.error('Solana wallet not found');
    return <span className='text-center'>No Solana wallet found</span>;
  }

  return (
    <>
      <Profile publicKey={userWallet.userWallet?.pubkey!} />
    </> 
  );
};

export default Dashboard;
