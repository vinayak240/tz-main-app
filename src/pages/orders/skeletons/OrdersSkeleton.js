import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function OrdersSkeleton() {
  return (
    <div>
      <div>
        <Skeleton variant="rect" style={{ width: "100vw", height: "7vh" }} />
      </div>

      {Array.from({ length: 5 }).map(() => (
        <div
          style={{
            margin: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Skeleton variant="rect" style={{ width: "95vw", height: "25vh" }} />
        </div>
      ))}
    </div>
  );
}
