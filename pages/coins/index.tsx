import {
  getCoinLists,
  getCoinListsMore,
  getCoinListsOrder,
  searchCoinListsByname
} from "@/state/services/coinsService";
import { coinLists, coinReponse } from "@/state/type/coinType";
import CoinsTable from "@/views/coins/coins-table"; // Lazy-loaded
import { BasicBreadcrumbs } from "@/views/common/breadcrumb";
import { Grid, Pagination, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IpropsPage {
  data: coinReponse;
}

const CoinsPage: NextPage<IpropsPage> = ({ data }) => {
  const [coinLists, setCoin] = useState<coinLists>([]);
  const router = useRouter();

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event);
    router.query.offset = (value - 1).toString();
    router.push({ query: router.query }, undefined, { scroll: false });
  };

  useEffect(() => {
    if (data.status === "success") {
      setCoin(data.coins);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Coins lists</title>
        <link rel="icon" href="https://cdn.coinranking.com/Sy33Krudb/btc.svg" />
      </Head>
      <BasicBreadcrumbs></BasicBreadcrumbs>
      <Grid container>
        <Grid sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: { xs: 18, sm: 28 }, fontWeight: "bold" }}>
            Cryptocurrency price list
          </Typography>
          <Typography variant="caption" sx={{ fontSize: { xs: 14, sm: 20 } }}>
            All cryptocurrencies ranked by market cap.
          </Typography>
        </Grid>
        <Grid container gap={1} alignItems={"center"} justifyContent="center">
          <CoinsTable listData={coinLists} />
          <Pagination onChange={handlePageChange} count={10} color="primary" />
        </Grid>
      </Grid>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orderBy, orderDirection, search, offset } = context.query;
  let res;
  if (orderBy && orderDirection) {
    res = await getCoinListsOrder({
      orderBy: orderBy.toString(),
      orderDirection: orderDirection.toString(),
    });
  } else if (search) {
    res = await searchCoinListsByname(search.toString());
  } else if (offset) {
    res = await getCoinListsMore(parseInt(offset.toString()));
  } else {
    res = await getCoinLists();
  }

  let dataServer =
    res.status === "success"
      ? { coins: res.data.coins, status: res.status }
      : { coins: [], status: "fail" };

  return { props: { data: dataServer } };
};

export default CoinsPage;
