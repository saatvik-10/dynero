'use client';

import React, { useState } from 'react';
import { SUPPORTED_TOKENS } from '@/lib/token';
import { SwapAsset } from './SwapHelper';
import { ArrowDownUp } from 'lucide-react';
import { TokenBalanceInterface } from '@/hooks/useToken';

const Swap = ({
  tokenBalance,
}: {
  tokenBalance: {
    totalBalance: string;
    tks: TokenBalanceInterface[];
  } | null;
}) => {
  const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKENS[0]);
  const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[2]);

  const handleSwap = () => {
    let newBaseAsset = baseAsset;
    setBaseAsset(quoteAsset);
    setQuoteAsset(newBaseAsset);
  };

  return (
    <div className='flex flex-col gap-y-3 mt-4 items-start'>
      {/* <div className='flex flex-col gap-y-1'>
        <span className='text-sm font-semibold'>You Pay:</span> */}
      <SwapAsset
        selectedToken={baseAsset}
        onSelect={() => setBaseAsset(baseAsset)}
        title={'You Pay:'}
        totalBalance={
          tokenBalance?.tks.find((tk) => tk.name === baseAsset.name)?.balance
        }
      />
      {/* <span className='text-xs font-medium text-slate-500'>
          {`Current Balance: 5641654 ${baseAsset.name}`}
        </span>
      </div> */}

      <div
        onClick={handleSwap}
        className='flex items-center justify-center w-full cursor-pointer'
      >
        <ArrowDownUp className='size-4 text-slate-600 transform transition-transform duration-600 ease-in-out hover:rotate-180' />
      </div>

      {/* <div className='flex flex-col gap-y-2'>
        <span className='text-sm font-semibold'>You Receive:</span> */}
      <SwapAsset
        selectedToken={quoteAsset}
        onSelect={() => setQuoteAsset(quoteAsset)}
        title={'You Receive'}
        totalBalance={
          tokenBalance?.tks.find((tk) => tk.name === quoteAsset.name)?.balance
        }
      />
      {/* <span className='text-xs font-medium text-slate-500'>
          {`Current Balance: 5641654 ${quoteAsset.name}`}
        </span>
      </div> */}
    </div>
  );
};

export default Swap;
