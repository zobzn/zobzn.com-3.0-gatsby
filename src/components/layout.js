import PropTypes from "prop-types";
import React from "react";
import Header from "./header";

import "../scss/app.scss";

export default function Layout({ location, children }) {
  return (
    <div className={`page-bone`}>
      <Header location={location} />
      <main>{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
