import { GitHub, Twitter } from "react-feather";

export const AppFooter = () => {
  return (
    <footer>
      <hr />
      <div className="center">
        <p>
          <a href="https://twitter.com/_X_y_z_">
            <Twitter size="1.2rem" />
          </a>
          &nbsp;&nbsp;
          <a href="https://github.com/sunya9">
            <GitHub size="1.2rem" />
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
