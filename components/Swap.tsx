'use client';

import React, { useEffect, useState } from 'react';
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
  const [baseAmount, setBaseAmount] = useState<string>();
  const [quoteAmount, setQuoteAmount] = useState<string>();

  //debouncing and async useEffect
  useEffect(() => {
    if (!baseAmount) {
      return;
    }
  }, []);

  const handleSwap = () => {
    let newBaseAsset = baseAsset;
    setBaseAsset(quoteAsset);
    setQuoteAsset(newBaseAsset);
  };

  return (
    <div className='flex flex-col gap-y-3 mt-4 items-start'>
      <SwapAsset
        selectedToken={baseAsset}
        onSelect={() => setBaseAsset(baseAsset)}
        title={'You Pay:'}
        amount={baseAmount}
        onAmountChange={() => {
          setBaseAmount(baseAmount);
        }}
        totalBalance={
          tokenBalance?.tks.find((tk) => tk.name === baseAsset.name)?.balance
        }
      />

      <div
        onClick={handleSwap}
        className='flex items-center justify-center w-full cursor-pointer'
      >
        <ArrowDownUp className='size-4 text-slate-600 transform transition-transform duration-600 ease-in-out hover:rotate-180' />
      </div>

      <SwapAsset
        selectedToken={quoteAsset}
        onSelect={() => setQuoteAsset(quoteAsset)}
        title={'You Receive'}
        amount={quoteAmount}
        onAmountChange={() => {
          setBaseAmount(quoteAmount);
        }}
        totalBalance={
          tokenBalance?.tks.find((tk) => tk.name === quoteAsset.name)?.balance
        }
      />
    </div>
  );
};

export default Swap;
