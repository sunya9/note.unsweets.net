import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { config } from "../../blog.config";

const Title = () => {
  const router = useRouter();
  if (router.pathname === "/") return <>{config.title()}</>;
  return (
    <Link href="/">
      <a>{config.title()}</a>
    </Link>
  );
};
export const AppHeader = () => {
  return (
    <header>
      <h1>
        <Title />
      </h1>
      <p>{config.description}</p>
    </header>
  );
};
