import { config } from "../../blog.config";

export const AppHeader = () => {
  return (
    <header>
      <h1>{config.title()}</h1>
      <p>{config.description}</p>
    </header>
  );
};
