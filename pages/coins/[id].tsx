// import { requestDemo } from "@/state/services/coinsService";

import { getCoinDetail } from "@/state/services/coinsService";
import { coinDetails, coinDetailsReponse } from "@/state/type/coinType";
import { CoinsHeader } from "@/views/coins/coins-header";
import { CoinsInfo } from "@/views/coins/coins-info";
import { BasicBreadcrumbs } from "@/views/common/breadcrumb";
import { Grid } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

interface IpropsPage {
  data: coinDetailsReponse;
}

const CoinsDetailPage: NextPage<IpropsPage> = ({ data }) => {
  const [coinDetail, setCoindetails] = useState<coinDetails>();
  useEffect(() => {
    if (data.status === "success") {
      setCoindetails(data.coins);
    }
  }, [data]);

  return (
    <div>
      <Head>
        <link rel="icon" href={coinDetail?.iconUrl} />
        <title>{coinDetail?.name}</title>
      </Head>
      <BasicBreadcrumbs
        isChild
        child={{ id: coinDetail?.uuid, name: coinDetail?.name }}
      ></BasicBreadcrumbs>
      <Grid container>
        {coinDetail && <CoinsHeader data={coinDetail} />}
        {coinDetail && <CoinsInfo data={coinDetail} />}
      </Grid>
      <Grid sx={{ mt: 2 }} gap={2}></Grid>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let res;
  if (id) {
    res = await getCoinDetail(id.toString());
  }
  let dataServer =
    res.status === "success"
      ? { coins: res.data.coin, status: res.status }
      : { coins: [], status: "fail" };

  return { props: { data: dataServer } };
};

export default CoinsDetailPage;
