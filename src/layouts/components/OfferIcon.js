import React, { Fragment } from "react";
import icon from "../../img/discount_icn.png";
function OfferIcon(props) {
  return (
    <Fragment>
      <img src={icon} alt="Logo" {...props} />
    </Fragment>
  );
}

export default OfferIcon;
