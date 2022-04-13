import React, { useEffect, useRef } from "react";
import { Typography } from "@material-ui/core";
import lottie from "lottie-web";
import three_dots from "../../../assets/three_dots.json";
import success_check from "../../../assets/success_check.json";
import useCustumSearchParams from "../hooks/useCustumSearchParams";
import { bootstrap, requestTable } from "../../../redux/actions/table";
import { connect, useDispatch } from "react-redux";
import { TABLE_STATUS } from "../../../enums/table_status";
import { useNavigate } from "react-router-dom";

function TableLoading(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useCustumSearchParams();
  const container = useRef(null);

  useEffect(() => {
    lottie.destroy();
    lottie.loadAnimation({
      container: container.current,
      animationData: three_dots,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });

    if (query.qr === "true" && Boolean(query?.tid) && Boolean(query?.rid)) {
      dispatch(
        requestTable({
          qr: false,
          table_id: query.tid,
          restaurant_id: query.rid,
        })
      );
    } else if (query.qr === "false" && Boolean(query?.sid)) {
      dispatch(
        requestTable({
          qr: false,
          search_id: query.sid,
        })
      );
    } else {
      alert("Invalid Input Provided");
    }

    setTimeout(() => {
      dispatch(
        bootstrap({
          session_token: "dummy_token",
        })
      );
    }, 4000);
  }, []);

  useEffect(() => {
    if (props.table?.status === TABLE_STATUS.TABLE_ACCEPTED) {
      lottie.destroy();
      lottie.loadAnimation({
        container: container.current,
        animationData: success_check,
        renderer: "svg",
        loop: false,
        autoplay: true,
      });

      setTimeout(() => {
        navigate("/restaurant/menu", { replace: true });
      }, 2500);
    }
  }, [props.table?.status]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5rem",
        }}
      >
        <div
          style={{
            height:
              props.table?.status === TABLE_STATUS.TABLE_ACCEPTED
                ? "130px"
                : "80px",
            width:
              props.table?.status === TABLE_STATUS.TABLE_ACCEPTED
                ? "130px"
                : "150px",
          }}
          ref={container}
        ></div>
      </div>
      <div>
        <Typography
          style={{
            marginTop: "10px",
            fontSize: "1.6em",
            fontWeight: "700",
            fontFamily: "'Proxima Nova'",
            textAlign: "center",
          }}
        >
          {props.table?.status === TABLE_STATUS.TABLE_ACCEPTED
            ? "Table Accepted!"
            : props.table?.status === TABLE_STATUS.TABLE_REQUESTED
            ? "Table Request Received"
            : "Requesting Table"}
        </Typography>
        <Typography
          style={{
            color: "gray",
            fontSize: "0.8rem",
            fontWeight: "300",
            fontFamily: "'Proxima Nova'",
            textAlign: "center",
            padding: "4px 20px",
          }}
        >
          {props.table?.status === TABLE_STATUS.TABLE_ACCEPTED
            ? "Redirecting to the menu..."
            : props.table?.status === TABLE_STATUS.TABLE_REQUESTED
            ? " Please wait for the confirmation from restaurant, Don't quit the application"
            : "Please wait while request for your table, Dont quit the application"}
        </Typography>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  table: state.table,
});

export default connect(mapStateToProps)(TableLoading);
