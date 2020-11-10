import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useConfigContext } from "./ConfigProvider";

interface Props {
  title?: string;
  description?: string;
}

export const AppHead: React.FC<Props> = (props) => {
  const config = useConfigContext();
  const router = useRouter();
  return (
    <Head>
      <title key="title">{config.title(props.title)}</title>
      <meta
        content={props.description || config.description}
        key="description"
        name="description"
      />
      <link
        key="canonical"
        rel="canonical"
        href={`${config.baseUrl}/${router.asPath}`}
      />
      <link
        key="rss"
        rel="alternate"
        type="application/rss+xml"
        href="/rss.xml"
      />
      {props.children}
    </Head>
  );
};
