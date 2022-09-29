import { createContext, useContext } from "react";
import { coinContext } from "../type/coinType";

const CoinsDefaultValues: coinContext = {
  coinLists: [],
  setCoin: () => {},
};

export const CoinContext = createContext<coinContext>(CoinsDefaultValues);

export function useCoins() {
  return useContext(CoinContext);
}
