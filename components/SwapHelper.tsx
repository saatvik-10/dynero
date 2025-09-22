'use client';

import { SUPPORTED_TOKENS, TokenInterface } from '@/lib/token';

export function SwapAsset({
  onSelect,
  selectedToken,
  title,
  totalBalance,
}: {
  onSelect: (asset: TokenInterface) => void;
  selectedToken: TokenInterface;
  title: string;
  totalBalance?: string;
}) {
  return (
    <div className='flex flex-col gap-y-1'>
      <span className='text-sm font-semibold'>{title}</span>
      <AssetSelection selectedToken={selectedToken} onSelect={onSelect} />
      <span className='text-xs font-medium text-slate-500'>
        {`Current Balance: ${totalBalance}`}
      </span>
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
    <>
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
        className='bg-gray-50 text-gray-900 text-sm rounded-md block p-2.5'
      >
        {SUPPORTED_TOKENS.map(
          (tk, idx) => (
            <option key={idx} selected={selectedToken.name === tk.name}>
              {tk.name}
            </option>
          )
        )}
      </select>
    </>
  );
}
