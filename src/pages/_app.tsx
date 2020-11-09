import { AppProps } from "next/app";
import { ConfigProvider } from "../components/ConfigProvider";
import "@exampledev/new.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  );
};

export default MyApp;
