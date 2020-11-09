import * as React from "react";
import Link from "next/link";

interface Props {
  title?: string;
  href: string;
}

export const NextLinkIfInternalAnchor: React.FC<Props> = (props) => {
  console.log(props);
  const { href, children, ...rest } = props;
  if (href.startsWith("http")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  } else {
    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }
};
