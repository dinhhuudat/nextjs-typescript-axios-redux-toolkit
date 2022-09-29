import request from "../../utils/axios";

type getCoinslists = {
  orderBy: string;
  orderDirection: string;
};

export const getCoinLists = () => {
  return request("coins");
};

export const getCoinListsMore = (pagition: number) => {
  const offset = pagition * 50;
  return request(`coins?offset=${offset}`);
};

export const getCoinListsOrder = (params: getCoinslists) => {
  return request(
    `coins?orderBy=${params.orderBy}&orderDirection=${params.orderDirection}`
  );
};

export const searchCoinListsByname = (searchString: string) => {
  return request(`coins?search=${searchString}`);
};

export const getCoinDetail = (uuid: string) => {
  return request(`coin/${uuid}`);
};
