import React, { Fragment } from "react";
import logo from "../../img/2x.png";
import logo_svg from "../../img/tz_logo.svg";
function Logo({ width, height, type }) {
  return (
    <Fragment>
      <img
        src={type === "svg" ? logo_svg : logo}
        style={{
          margin: "auto",
          display: "block",
          width: width,
          height: height,
        }}
        alt="Logo"
      />
    </Fragment>
  );
}

export default Logo;
