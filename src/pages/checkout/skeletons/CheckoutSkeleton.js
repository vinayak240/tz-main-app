import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function CheckoutSkeleton() {
  return (
    <div>
      <div>
        <Skeleton
          variant="rect"
          style={{
            width: "100vw",
            height: "7vh",
            backgroundColor: "rgba(0, 0, 0, 0.067)",
          }}
        />
      </div>
      {[1, 2, 3].map((e) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: e === 1 ? "15px" : "10px",
            padding: "0px 10px",
          }}
        >
          <Skeleton
            variant="rect"
            style={{
              width: "95vw",
              height: "14vh",
              display: "flex",
              backgroundColor: "rgba(0, 0, 0, 0.067)",
              maxWidth: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "90%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton
                variant="text"
                style={{
                  width: "40vw",
                  backgroundColor: "rgba(0, 0, 0, 0.11)",
                  visibility: "visible",
                  height: "30px",
                  borderRadius: "5px",
                }}
              />
              <Skeleton
                variant="text"
                style={{
                  width: "12vw",
                  backgroundColor: "rgba(0, 0, 0, 0.11)",
                  visibility: "visible",
                  height: "30px",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "90%",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Skeleton
                variant="text"
                style={{
                  width: "60vw",
                  backgroundColor: "rgba(0, 0, 0, 0.11)",
                  visibility: "visible",
                  height: "30px",
                  borderRadius: "5px",
                }}
              />
              <Skeleton
                variant="text"
                style={{
                  width: "20vw",
                  backgroundColor: "rgba(0, 0, 0, 0.11)",
                  visibility: "visible",
                  height: "30px",
                  borderRadius: "5px",
                }}
              />
            </div>
          </Skeleton>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "25px",
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
          marginTop: "25px",
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
