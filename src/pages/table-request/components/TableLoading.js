import React, { useEffect, useRef, useState } from "react";
import { Typography, Button, Drawer } from "@material-ui/core";
import lottie from "lottie-web";
import three_dots from "../../../assets/three_dots.json";
import success_check from "../../../assets/success_check.json";
import wrong_wiggle from "../../../assets/wrong_wiggle.json";
import useCustumSearchParams from "../hooks/useCustumSearchParams";
import {
  bootstrap,
  clearSession,
  requestTable,
  tableOccupied,
} from "../../../redux/actions/table";
import { connect, useDispatch } from "react-redux";
import { TABLE_STATUS } from "../../../enums/table_status";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import PasscodeDrawer from "./PasscodeDrawer";
import TableAppBar from "./TableAppBar";

function TableLoading(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useCustumSearchParams();
  const container = useRef(null);
  const [state, setState] = useState({
    f_passcode_drawer: false,
  });

  const handleDialogOpen = (flagName, orderNum = 0) => {
    setState((prevState) => ({
      ...prevState,
      [flagName]: true,
    }));
  };

  const handleDialogClose = (flagName) => {
    setState((prevState) => ({
      ...prevState,
      [flagName]: false,
    }));
  };

  const requestWithPasscode = (passcode) => {
    const tableReq = { ...query };
    tableReq.session = {
      passcode,
    };

    handleDialogClose("f_passcode_drawer");
    dispatch(clearSession());
    request(tableReq);
  };

  const request = (queryReq) => {
    if (
      queryReq.qr === "true" &&
      Boolean(queryReq?.tid) &&
      Boolean(queryReq?.rid)
    ) {
      dispatch(
        requestTable({
          ...queryReq,
          qr: true,
          table_id: queryReq.tid,
          restaurant_id: queryReq.rid,
        })
      );
    } else if (queryReq.qr === "false" && Boolean(queryReq?.sid)) {
      dispatch(
        requestTable({
          ...queryReq,
          qr: false,
          search_id: queryReq.sid,
        })
      );
    } else {
      alert("Invalid Input Provided");
      navigate("/table/request");
    }

    // setTimeout(() => {
    //   dispatch(
    //     tableOccupied({
    //       table_id: "jyefsyj",
    //       session_token: "dummy_token",
    //     })
    //   );
    // }, 4000);
  };

  const isErrorStatus = (status) =>
    [
      TABLE_STATUS.TABLE_NOT_FOUND,
      TABLE_STATUS.TABLE_UNAVAILABLE,
      TABLE_STATUS.TABLE_OCCUPIED,
      TABLE_STATUS.TABLE_REJECTED,
      TABLE_STATUS.PASSCODE_INVALID,
      TABLE_STATUS.REQUEST_ERROR,
    ].includes(status);

  const isRequestingStatus = (status) =>
    [TABLE_STATUS.TABLE_REQUEST, TABLE_STATUS.TABLE_REQUESTED].includes(status);

  const isIntermidiateStatus = (status) =>
    [
      TABLE_STATUS.TABLE_REQUEST,
      TABLE_STATUS.TABLE_REQUESTED,
      TABLE_STATUS.TABLE_ACTIVE,
    ].includes(status);

  const isPasscodeStatus = (status) =>
    [TABLE_STATUS.TABLE_OCCUPIED, TABLE_STATUS.PASSCODE_INVALID].includes(
      status
    );

  const getStatusText = (status) => {
    switch (status) {
      case TABLE_STATUS.TABLE_REQUEST:
        return "Requesting Table";

      case TABLE_STATUS.TABLE_REQUESTED:
        return "Table Request Received";

      case TABLE_STATUS.TABLE_ACTIVE:
        return "Table Accepted!";

      case TABLE_STATUS.TABLE_OCCUPIED:
        return "Table Occupied!";

      case TABLE_STATUS.PASSCODE_INVALID:
        return "Invalid Passcode!";

      case TABLE_STATUS.TABLE_NOT_FOUND:
        return "Table Not Found!";

      case TABLE_STATUS.TABLE_UNAVAILABLE:
        return "Table UnAvailable";

      case TABLE_STATUS.TABLE_REJECTED:
        return "Table Rejected!";

      case TABLE_STATUS.REQUEST_ERROR:
        return "Something Went Wrong!";

      default:
        return "Requesting Table";
    }
  };

  const getHelperText = (status) => {
    switch (status) {
      case TABLE_STATUS.TABLE_REQUEST:
        return "Please wait while we request for your table, Dont quit the application";

      case TABLE_STATUS.TABLE_REQUESTED:
        return "Please wait for the confirmation from restaurant, Don't quit the application";

      case TABLE_STATUS.TABLE_ACTIVE:
        return "Redirecting to the Restaurant Menu...";

      case TABLE_STATUS.TABLE_NOT_FOUND:
        return "We did not find any Table associated with the above ID";

      case TABLE_STATUS.TABLE_UNAVAILABLE:
        return "Sorry, The Table you Requested is UnAvailable at the moment...";

      case TABLE_STATUS.TABLE_OCCUPIED:
        return "If table is first requested by your friend, Plesae ask for Table Passcode ";

      case TABLE_STATUS.PASSCODE_INVALID:
        return "The Table Passcode you entered is invalid!, or The Table is in waiting status";

      case TABLE_STATUS.TABLE_REJECTED:
        return "Your Table Request was Rejected by the Restaurant Executive";

      case TABLE_STATUS.REQUEST_ERROR:
        return "Something went wrong while requesting the Table, Please try again";

      default:
        return "Requesting Table";
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    lottie.destroy();
    lottie.loadAnimation({
      container: container.current,
      animationData: three_dots,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });

    request(query);
  }, []);

  useEffect(() => {
    if (
      props.table?.status === TABLE_STATUS.TABLE_ACTIVE ||
      isErrorStatus(props.table?.status)
    ) {
      lottie.destroy();
      lottie.loadAnimation({
        container: container.current,
        animationData: isErrorStatus(props.table?.status)
          ? wrong_wiggle
          : success_check,
        renderer: "svg",
        loop: false,
        autoplay: true,
      });

      props.table?.status === TABLE_STATUS.TABLE_ACTIVE &&
        setTimeout(() => {
          navigate("/restaurant/menu", { replace: true });
        }, 2500);
    } else if (isRequestingStatus(props.table?.status)) {
      lottie.destroy();
      lottie.loadAnimation({
        container: container.current,
        animationData: three_dots,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });
    } else {
      lottie.destroy();
      lottie.loadAnimation({
        container: container.current,
        animationData: wrong_wiggle,
        renderer: "svg",
        loop: false,
        autoplay: true,
      });
    }
  }, [props.table?.status]);

  return (
    <div>
      <div className="partials">
        <Drawer
          anchor="bottom"
          open={state.f_passcode_drawer}
          onClose={() => handleDialogClose("f_passcode_drawer")}
        >
          <PasscodeDrawer request={requestWithPasscode} />
        </Drawer>
      </div>
      <div>
        <TableAppBar noBack={isIntermidiateStatus(props.table?.status)} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5rem",
        }}
      >
        <div
          style={
            isErrorStatus(props.table?.status)
              ? {
                  height: "19rem",
                  width: "19rem",
                  position: "absolute",
                  marginTop: "5rem",
                }
              : {
                  height:
                    props.table?.status === TABLE_STATUS.TABLE_ACTIVE
                      ? "130px"
                      : "80px",
                  width:
                    props.table?.status === TABLE_STATUS.TABLE_ACTIVE
                      ? "130px"
                      : "150px",
                }
          }
          ref={container}
        ></div>
      </div>
      <div>
        <Typography
          style={{
            marginTop: isErrorStatus(props.table?.status) ? "6.5rem" : "10px",
            fontSize: "1.6em",
            fontWeight: "700",
            fontFamily: "'Proxima Nova'",
            textAlign: "center",
          }}
        >
          {getStatusText(props.table?.status)}
        </Typography>
        <Typography
          style={{
            color: "gray",
            fontSize: "0.85rem",
            fontWeight: "300",
            fontFamily: "'Proxima Nova'",
            textAlign: "center",
            padding: "4px 20px",
          }}
        >
          {getHelperText(props.table?.status)}
        </Typography>
        {isPasscodeStatus(props.table?.status) && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2.5rem",
            }}
          >
            <Button
              onClick={() => handleDialogOpen("f_passcode_drawer")}
              style={{
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "white",
                // background: "#a9cbdf",282c34
                // backgroundColor: "rgb(255 193 166)",
                backgroundColor: "#282c34",
                padding: "8px",
                paddingLeft: "18px",
                borderRadius: "6px",
                fontFamily: "'Proxima Nova'",
                opacity: 0.85,
              }}
            >
              {props.table?.status === TABLE_STATUS.PASSCODE_INVALID
                ? "Re-Enter"
                : "Enter"}{" "}
              Passcode
              <KeyboardArrowRightRoundedIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  table: state.table,
});

export default connect(mapStateToProps)(TableLoading);
