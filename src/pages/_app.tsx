import Head from "next/head";
import { AppProps } from "next/app";
import { ConfigProvider, useConfigContext } from "../components/ConfigProvider";
import "@exampledev/new.css";
import "../styles/main.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const config = useConfigContext();
  return (
    <ConfigProvider>
      <Head>
        <title key="title">{config.title()}</title>
      </Head>
      <Component {...pageProps} />
    </ConfigProvider>
  );
};

export default MyApp;
