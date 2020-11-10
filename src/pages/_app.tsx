import "@exampledev/new.css";
import { AppProps } from "next/app";
import { AppContents } from "../components/AppContents";
import { AppFooter } from "../components/AppFooter";
import { AppHead } from "../components/AppHead";
import { AppHeader } from "../components/AppHeader";
import { AppLayout } from "../components/AppLayout";
import { ConfigProvider } from "../components/ConfigProvider";
import "../styles/main.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ConfigProvider>
      <AppLayout>
        <AppHead />
        <AppHeader />
        <AppContents>
          <Component {...pageProps} />
        </AppContents>
        <AppFooter />
      </AppLayout>
    </ConfigProvider>
  );
};

export default MyApp;
