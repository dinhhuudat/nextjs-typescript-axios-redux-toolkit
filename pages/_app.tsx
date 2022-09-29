import { CoinsProvider } from "@/hooks/useCoinslists";
import Layout from "@/views/common/layout";
import { Grid } from "@mui/material";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CoinsProvider>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Layout>
        <Grid container sx={{ padding: { sm: "32px", xs: "8px" } }}>
          <Component {...pageProps} />
        </Grid>
      </Layout>
    </CoinsProvider>
  );
}

export default MyApp;
