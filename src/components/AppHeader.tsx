import { config } from "../../blog.config";

export const AppHeader = () => {
  return (
    <header>
      <h1>{config.title}</h1>
      <h2>{config.description}</h2>
    </header>
  );
};
