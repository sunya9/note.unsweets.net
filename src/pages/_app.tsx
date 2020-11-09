import { AppProps } from "next/app";
import { ConfigProvider } from "../components/ConfigProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  );
};

export default MyApp;
