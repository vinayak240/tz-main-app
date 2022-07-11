import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function TableSkeleton() {
  return (
    <div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 8px",
        }}
      >
        <Skeleton variant="text" style={{ width: "100px", height: "60px" }} />
        <Skeleton variant="text" style={{ width: "100px", height: "60px" }} />
      </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "70px",
          borderRadius: "10px",
        }}
      >
        <Skeleton variant="rect" style={{ width: "160px", height: "160px" }} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Skeleton variant="rect" style={{ width: "70vw", height: "8vh" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "60px",
          padding: "0px 10px",
        }}
      >
        <Skeleton variant="rect" style={{ width: "65vw", height: "40px" }} />
        <Skeleton variant="rect" style={{ width: "25vw", height: "40px" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
          padding: "0px 10px",
        }}
      >
        <Skeleton variant="rect" style={{ width: "65vw", height: "40px" }} />
        <Skeleton variant="rect" style={{ width: "25vw", height: "40px" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Skeleton variant="rect" style={{ width: "90vw", height: "7vh" }} />
      </div>
    </div>
  );
}
