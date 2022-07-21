import { Button } from "@material-ui/core";
import { clone } from "ramda";
import React, { useEffect, useState } from "react";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";
import { connect } from "react-redux";
import TableAppBar from "./components/TableAppBar";
import CounterInfo from "./components/CounterInfo";
import { getTableSession } from "../../apis/table_api";
import { useNavigate } from "react-router-dom";
import { API_TYPES } from "../../enums/api_status";
import TableSkeleton from "./skeletons/TableSkeleton";

function Table(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({});

  useEffect(() => {
    // SET LOADING
    window.scrollTo(0, 0);
    if (!Boolean(props.common?.loaders?.[API_TYPES.TABLE])) {
      getTableSession().then((response) => {
        if (Boolean(response?.success)) {
          let session = response.session;
          setState({
            ...state,
            ...clone(session),
          });
        }
      });
    }
  }, [props.table?.orders?.length]);

  return Boolean(props.common?.loaders?.[API_TYPES.TABLE]) ? (
    <TableSkeleton />
  ) : (
    <div>
      <TableAppBar status={state?.table_status || "NONE"} />
      {/* In Bold.. */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "fit-content",
          padding: "18px 34px",
          borderRadius: "10px",
          margin: "15% auto 20px auto",
        }}
      >
        <h3
          style={{
            fontSize: "3.5rem",
            fontFamily: "'Proxima Nova'",
            margin: "0px",
          }}
        >
          #{props.table?.table_id}
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <span
          style={{
            background: "rgb(230 230 230)",
            fontSize: "1.3rem",
            fontWeight: "bold",
            fontFamily: '"Proxima Nova"',
            padding: "8px 14px",
            borderRadius: "6px",
            border: "3px dashed black",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ marginRight: "19px" }}>Passcode :</span>
          {state?.passcode || "****"}
          <FileCopyOutlinedIcon style={{ marginLeft: "17px" }} />
        </span>
      </div>
      <div style={{ marginTop: "2.4rem" }}>
        <CounterInfo
          infoLabel="Active Users"
          infoCount={state?.users?.length || 0}
        />
        <CounterInfo
          infoLabel="Total Orders"
          infoCount={state?.orders?.length || 0}
          infoAction={() => {}}
        />
        {/* <CounterInfo
          infoLabel="Bill Total"
          infoCount={0}
          isAmount={true}
          isLast={true}
        /> */}
      </div>
      <div
        style={{
          marginTop: "2.6rem",
          padding: "10px",
        }}
      >
        <Button
          onClick={(evt) => {
            evt.stopPropagation();
            navigate("/restaurant/checkout");
          }}
          style={{
            color: "black",
            background: "#fcd601",
            fontSize: "1rem",
            fontWeight: "600",
            fontFamily: "'Proxima Nova'",
            textTransform: "capitalize",
            width: "100%",
          }}
        >
          Check Out Table
          <DoubleArrowRoundedIcon />
        </Button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  table: clone(state.table),
  common: clone(state.common),
});

export default connect(mapStateToProps)(Table);
