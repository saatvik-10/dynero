'use client';

import { SUPPORTED_TOKENS, TokenInterface } from '@/lib/token';

export function SwapAsset({
  onSelect,
  selectedToken,
  title,
}: {
  onSelect: (asset: TokenInterface) => void;
  selectedToken: TokenInterface;
  title: string;
}) {
  return (
    <div className='flex flex-col gap-y-1'>
      <span className='text-sm font-semibold'>{title}</span>
      <AssetSelection selectedToken={selectedToken} onSelect={onSelect} />
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
          alert(JSON.stringify(selectedToken));
          if (selectedToken) {
            onSelect(selectedToken);
          }
        }}
        id='tokens'
        className='bg-gray-50 text-gray-900 text-sm rounded-md block p-2.5'
      >
        {SUPPORTED_TOKENS.filter((tks) => tks.name !== selectedToken.name).map(
          (tk) => (
            <option>{tk.name}</option>
          )
        )}
      </select>
    </>
  );
}
