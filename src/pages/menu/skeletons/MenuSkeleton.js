import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function MenuSkeleton() {
  return (
    <div>
      <Skeleton
        variant="rect"
        style={{ height: "8vh", marginBottom: "10px" }}
      />
      <Skeleton variant="rect" style={{ height: "32vh" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Skeleton
          variant="rect"
          style={{ height: "8vh", width: "30vw", margin: "10px" }}
        />
        <Skeleton
          variant="rect"
          style={{ height: "8vh", width: "30vw", margin: "10px" }}
        />
        <Skeleton
          variant="rect"
          style={{ height: "8vh", width: "30vw", margin: "10px" }}
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="rect"
            style={{ height: "18vh", width: "55vw", margin: "10px" }}
          />
          <Skeleton
            variant="rect"
            style={{ height: "18vh", width: "35vw", margin: "10px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="rect"
            style={{ height: "18vh", width: "55vw", margin: "10px" }}
          />
          <Skeleton
            variant="rect"
            style={{ height: "18vh", width: "35vw", margin: "10px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="rect"
            style={{ height: "18vh", width: "55vw", margin: "10px" }}
          />
          <Skeleton
            variant="rect"
            style={{ height: "18vh", width: "35vw", margin: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}
