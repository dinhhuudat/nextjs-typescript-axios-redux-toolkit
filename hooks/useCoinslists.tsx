import { CoinContext } from "@/state/context/coinContext";
import { coinLists } from "@/state/type/coinType";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

export function CoinsProvider({ children }: Props) {
  const [coinLists, setCoinLists] = useState<coinLists>([]);

  const setCoin = (values: coinLists) => {
    setCoinLists(values);
  };

  const value = {
    coinLists,
    setCoin,
  };

  return (
    <>
      <CoinContext.Provider value={value}>{children}</CoinContext.Provider>
    </>
  );
}
