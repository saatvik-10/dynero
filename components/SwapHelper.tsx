'use client';

import { SUPPORTED_TOKENS, TokenInterface } from '@/lib/token';

export function SwapAsset({
  onSelect,
  onAmountChange,
  selectedToken,
  title,
  amount,
  totalBalance,
}: {
  onSelect: (asset: TokenInterface) => void;
  onAmountChange: (val: string) => void;
  selectedToken: TokenInterface;
  title: string;
  amount?: string;
  totalBalance?: string;
}) {
  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex flex-col gap-y-1'>
        <span className='text-sm font-semibold'>{title}</span>
        <AssetSelection selectedToken={selectedToken} onSelect={onSelect} />
        <span className='text-xs font-medium text-slate-500'>
          {`Current Balance: ${totalBalance}`}
        </span>
      </div>
      <input
        type='text'
        placeholder='0'
        className='w-20 outline-none text-center text-3xl'
        value={amount}
        onChange={(e) => {
          onAmountChange(e.target.value);
        }}
      />
    </div>
  );
}

export function AssetSelection({
  selectedToken,
  onSelect,
}: {
  selectedToken: TokenInterface;
  onSelect: (asset: TokenInterface) => void;
}) {
  return (
    <div>
      <select
        onChange={(e) => {
          const selectedToken = SUPPORTED_TOKENS.find(
            (tks) => tks.name === e.target.value
          );
          if (selectedToken) {
            onSelect(selectedToken);
          }
        }}
        id='tokens'
        className='bg-gray-50 text-gray-900 text-sm rounded-md block p-2.5 w-24'
      >
        {SUPPORTED_TOKENS.map((tk, idx) => (
          <option key={idx} selected={selectedToken.name === tk.name}>
            {tk.name}
          </option>
        ))}
      </select>
    </div>
  );
}
