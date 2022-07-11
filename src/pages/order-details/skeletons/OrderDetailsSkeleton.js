import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function OrderDetailsSkeleton() {
  return (
    <div>
      <div>
        <Skeleton variant="rect" style={{ width: "100vw", height: "7vh" }} />
      </div>
      <div style={{ marginTop: "10px", padding: "0px 10px" }}>
        <Skeleton variant="rect" style={{ width: "95vw", height: "20vh" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
          padding: "0px 10px",
        }}
      >
        <Skeleton variant="rect" style={{ width: "95", height: "8vh" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          padding: "0px 10px",
        }}
      >
        <Skeleton variant="rect" style={{ width: "95vw", height: "8vh" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "50px",
          padding: "0px 10px",
        }}
      >
        <Skeleton variant="text" style={{ width: "50vw" }} />
        <Skeleton variant="text" style={{ width: "12vw" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
          padding: "0px 10px",
        }}
      >
        <Skeleton variant="text" style={{ width: "30vw" }} />
        <Skeleton variant="text" style={{ width: "12vw" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
          padding: "0px 10px",
        }}
      >
        <Skeleton variant="text" style={{ width: "65vw" }} />
        <Skeleton variant="text" style={{ width: "12vw" }} />
      </div>
    </div>
  );
}
