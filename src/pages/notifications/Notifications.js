import { Button, ButtonBase } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NotificationAppBar from "./components/NotificationAppBar";
import { useNavigate } from "react-router-dom";
import { getTableSessionNoticationApi } from "../../apis/table_api";
import Notification from "./components/Notification";
import { clone } from "ramda";
import ORDER_STATUS from "../../enums/order_status";
import { TABLE_STATUS } from "../../enums/table_status";
import EmptyList from "./components/EmptyList";
import { API_TYPES } from "../../enums/api_status";
import NotificationSkeleton from "./skeletons/NotificationSkeleton";
import { connect } from "react-redux";

function Notifications(props) {
  const [state, setState] = useState({
    notifications: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!props.loaders?.[API_TYPES.NOTIFICATION]) {
      getTableSessionNoticationApi().then((response) => {
        if (Boolean(response?.success)) {
          let notifications = response.notifications;
          notifications = notifications.sort(
            (n1, n2) =>
              new Date(n2?.date || new Date()) -
              new Date(n1?.date || new Date())
          );
          setState({
            ...state,
            notifications: [...notifications],
          });
        }
      });
    }
  }, []);

  return Boolean(props.loaders?.[API_TYPES.NOTIFICATION]) ? (
    <NotificationSkeleton />
  ) : (
    <div>
      <NotificationAppBar />
      <div style={{ paddingBottom: "60px" }}>
        {state.notifications?.length > 0 ? (
          state.notifications.map((n, idx) => (
            <div key={n?._id || idx}>
              <ButtonBase
                style={{ textAlign: "left", width: "100vw", display: "block" }}
              >
                <Notification idx={idx} notification={n} />
              </ButtonBase>
            </div>
          ))
        ) : (
          <div>
            <EmptyList />
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loaders: state.common?.loaders,
});

export default connect(mapStateToProps)(Notifications);
