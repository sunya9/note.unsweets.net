import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useConfigContext } from "./ConfigProvider";

const Title = () => {
  const router = useRouter();
  const config = useConfigContext();
  if (router.pathname === "/") return <>{config.title()}</>;
  return (
    <Link href="/">
      <a>{config.title()}</a>
    </Link>
  );
};
export const AppHeader = () => {
  const config = useConfigContext();
  return (
    <header>
      <h1>
        <Title />
      </h1>
      <p>{config.description}</p>
    </header>
  );
};
