import { Dispatch, SetStateAction, createContext, useState } from 'react';

export const tokenContext = createContext<
  [string, Dispatch<SetStateAction<string>>]
>(['', () => {}]);

type Props = {
  children: React.ReactNode;
};
const TokenProvider: React.FC<Props> = ({ children }) => {
  const tokenState = useState('');

  return (
    <tokenContext.Provider value={tokenState}>{children}</tokenContext.Provider>
  );
};

export default TokenProvider;
