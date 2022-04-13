import React, { Fragment } from "react";
import logo from "../../img/2x.png";
import logo_svg from "../../img/tz_logo.svg";
import logo_stroked from "../../img/tz_logo_stroked.png";

function Logo({ width, height, type }) {
  return (
    <Fragment>
      <img
        src={
          type === "svg" ? logo_svg : type === "stroked" ? logo_stroked : logo
        }
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
