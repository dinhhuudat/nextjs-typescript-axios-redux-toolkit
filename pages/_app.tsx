import AlertMessage from "@/components/common/Alert/alert";
import store from "@/state/redux/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <AlertMessage />
    </Provider>
  );
}

export default MyApp;
