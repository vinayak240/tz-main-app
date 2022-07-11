import React, { Fragment } from "react";
import icon from "../../img/notification.png";
function NotificationIcon(props) {
  return (
    <Fragment>
      <img src={icon} alt="Notif Icon" {...props} />
    </Fragment>
  );
}

export default NotificationIcon;
