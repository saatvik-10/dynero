'use client';

import React, { useEffect, useState } from 'react';
import { SUPPORTED_TOKENS } from '@/lib/token';
import { SwapAsset } from './SwapHelper';
import { ArrowDownUp } from 'lucide-react';
import { TokenBalanceInterface } from '@/hooks/useToken';
import { Button } from './ui/button';
import axios from 'axios';

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
  const [quoteResponse, setQuoteResponse] = useState(null);

  const debounce = () =>
    axios
      .get(
        `https://quote-api.jup.ag/v6/quote?inputMint=${baseAsset.mint}
&outputMint=${quoteAsset.mint}
&amount=${Number(baseAmount) * 10 ** baseAsset.decimals}
&slippageBps=50`
      )
      .then((res) => {
        /*
        inputMint: "So11111111111111111111111111111111111111112", 
        inAmount: "x000000000", 
        outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        */
        setQuoteAmount(
          (
            Number(res.data.outAmount) / Number(10 ** quoteAsset.decimals)
          ).toString()
        );
        setQuoteResponse(res.data);
      })
      .catch((error) => {
        console.error('Error fetching quote:', error);
      });

  useEffect(() => {
    if (!baseAmount) {
      return;
    }

    const res = setTimeout(() => {
      debounce();
    }, 800);

    return () => {
      clearTimeout(res);
    };
  }, [baseAsset, quoteAsset, baseAmount]);

  const handleSwap = () => {
    let newBaseAsset = baseAsset;
    setBaseAsset(quoteAsset);
    setQuoteAsset(newBaseAsset);
  };

  return (
    <div className='flex flex-col gap-y-3 mt-4'>
      <SwapAsset
        selectedToken={baseAsset}
        onSelect={() => setBaseAsset(baseAsset)}
        title={'You Pay:'}
        amount={baseAmount}
        onAmountChange={setBaseAmount}
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
        onAmountChange={setQuoteAmount}
        totalBalance={
          tokenBalance?.tks.find((tk) => tk.name === quoteAsset.name)?.balance
        }
        inputDisabled={true}
      />

      <div className='flex items-center justify-end'>
        <Button
          onClick={() => axios.post('/api/swap', quoteResponse)}
          className='cursor-pointer'
        >
          Swap Tokens
        </Button>
      </div>
    </div>
  );
};

export default Swap;
