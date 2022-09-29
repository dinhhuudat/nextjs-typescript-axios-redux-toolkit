export type getCoinsByIdParams = {
  uuids: string | string[];
};

export type coinReponse = {
  coins: coinLists;
  status: string;
};

export type coinDetailsReponse = {
  coins: coinDetails;
  status: string;
};

export type coinItem = {
  "24hVolume": string;
  btcPrice: string;
  change: string;
  color: string;
  iconUrl: string;
  marketCap: string | number;
  name: string;
  rank: number;
  symbol: string;
  uuid: string;
};

type linkDetails = {
  name: string;
  type: string;
  url: string;
};

type supply = {
  circulating: string;
  confirmed: boolean;
  max: string;
  supplyAt: number;
  total: string;
};

export type coinDetails = {
  "24hVolume": string;
  allTimeHigh: { price: string; timestamp: number };
  btcPrice: string;
  change: string;
  color: string;
  iconUrl: string;
  marketCap: string | number;
  name: string;
  rank: number;
  symbol: string;
  uuid: string;
  description: string;
  fullyDilutedMarketCap: string; //vốn pha loãng;
  link: Array<linkDetails>;
  listedAt: number;
  numberOfExchanges: number;
  numberOfMarkets: number;
  price: string | number;
  priceAt: number;
  supply: supply;
  websiteUrl: string;
};

export type coinLists = coinItem[];

export type coinContext = {
  coinLists: coinLists;
  setCoin: (values: coinLists) => void;
};
