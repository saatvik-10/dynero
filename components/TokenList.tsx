import React from 'react';
import { TokenBalanceInterface } from '@/hooks/useToken';

const TokenList = ({ tk }: { tk: TokenBalanceInterface }) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <div className='rounded-full overflow-hidden size-12'>
        <img src={tk.image} alt='' />
        </div>
        <div className='flex flex-col gap-y-1'>
          <span className='font-semibold'>{tk.name}</span>
          <span className='font-merdium'>
            1 {tk.name} = {tk.price}
          </span>
        </div>
      </div>{' '}
      <span className='font-semibold'>{tk.name}</span>
      <span className='font-merdium'>
        1 {tk.name} = {tk.price}
      </span>
      <div className='flex flex-col gap-y-1'>
        <span className='font-semibold'>{tk.usdBalance}</span>
        <span className='font-merdium'>{tk.balance}</span>
      </div>
    </div>
  );
};

export default TokenList;
