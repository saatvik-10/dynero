'use client';

import React, { useState } from 'react';
import { SUPPORTED_TOKENS } from '@/lib/token';
import { SwapAsset } from './SwapHelper';

const Swap = () => {
  const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKENS[0]);
  const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[2]);

  return (
    <div className='flex flex-col gap-y-5 mt-4 items-start'>
      {/* <div className='flex flex-col gap-y-1'>
        <span className='text-sm font-semibold'>You Pay:</span> */}
      <SwapAsset
        selectedToken={baseAsset}
        onSelect={() => setBaseAsset(baseAsset)}
        title={'You Pay:'}
      />
      {/* <span className='text-xs font-medium text-slate-500'>
          {`Current Balance: 5641654 ${baseAsset.name}`}
        </span>
      </div> */}

      {/* <div className='flex flex-col gap-y-2'>
        <span className='text-sm font-semibold'>You Receive:</span> */}
      <SwapAsset
        selectedToken={quoteAsset}
        onSelect={() => setQuoteAsset(quoteAsset)}
        title={'You Receive'}
      />
      {/* <span className='text-xs font-medium text-slate-500'>
          {`Current Balance: 5641654 ${quoteAsset.name}`}
        </span>
      </div> */}
    </div>
  );
};

export default Swap;
