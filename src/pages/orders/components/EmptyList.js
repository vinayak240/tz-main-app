import React from "react";
import AssignmentLateOutlinedIcon from "@material-ui/icons/AssignmentLateOutlined";
import { Typography } from "@material-ui/core";
export default function EmptyList(props) {
  return (
    <div
      style={{
        width: "100vw",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AssignmentLateOutlinedIcon
          style={{
            color: "gray",
            width: "70px",
            height: "65px",
            opacity: "0.88",
          }}
        />
        <Typography
          style={{
            marginTop: "7px",
            fontFamily: "'Proxima Nova'",
            fontWeight: "500",
            textDecoration: "underline",
            opacity: "0.7",
          }}
        >
          No Orders Found!
        </Typography>
      </div>
    </div>
  );
}
