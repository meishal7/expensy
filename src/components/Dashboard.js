import { Fragment } from "react";

export default function Dashboard({ children }) {
  return (
    <Fragment>
      <div>This is dashboard.</div>
      {children}
    </Fragment>
  );
}
