import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function NotificationSkeleton() {
  return (
    <div>
      <div>
        <Skeleton variant="rect" style={{ width: "100vw", height: "7vh" }} />
      </div>

      {Array.from({ length: 13 }).map(() => (
        <div
          style={{
            margin: "10px",
            marginTop: "15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              flexBasis: "20%",
            }}
          >
            <Skeleton variant="circle" width={50} height={50} />
          </div>
          <div
            style={{
              flexBasis: "80%",
            }}
          >
            <Skeleton variant="text" style={{ width: "60%" }} />
            <Skeleton variant="text" style={{ width: "95%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
