import { GitHub, Twitter } from "react-feather";

export const AppFooter = () => {
  return (
    <footer>
      <hr />
      <div className="center">
        <p>
          <a href="https://twitter.com/_X_y_z_">
            <Twitter strokeWidth="1" size="1.6rem" />
          </a>
          &nbsp;&nbsp;
          <a href="https://github.com/sunya9">
            <GitHub strokeWidth="1" size="1.6rem" />
          </a>
        </p>
        <p>Created by _X_y_z_.</p>
      </div>
      <style jsx>
        {`
          .center {
            text-align: center;
          }
        `}
      </style>
    </footer>
  );
};
