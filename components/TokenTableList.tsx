import { TokenBalanceInterface } from '@/hooks/useToken';
import React from 'react';
import TokenList from './TokenList';

const TokenTableList = ({ tks }: { tks: TokenBalanceInterface[] }) => {
  return (
    <div>
      {tks.map((tk, idx) => (
        <TokenList tk={tk} key={idx} />
      ))}
    </div>
  );
};

export default TokenTableList;
