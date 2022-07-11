import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import wrong_wiggle from "../../assets/wrong_wiggle.json";
import TableAppBar from "../table-request/components/TableAppBar";
import { Typography } from "@material-ui/core";

export function SomethingWentWrong() {
  const container = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    lottie.destroy();
    lottie.loadAnimation({
      container: container.current,
      animationData: wrong_wiggle,
      renderer: "svg",
      loop: false,
      autoplay: true,
    });
  }, []);
  return (
    <div>
      <div>
        <TableAppBar />
      </div>
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
              height: "19rem",
              width: "19rem",
              position: "absolute",
              marginTop: "5rem",
            }}
            ref={container}
          ></div>
        </div>
        <div>
          <div>
            <Typography
              style={{
                marginTop: "6.5rem",
                fontSize: "1.6em",
                fontWeight: "700",
                fontFamily: "'Proxima Nova'",
                textAlign: "center",
              }}
            >
              Something Went Wrong
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
              Please be Patient, While our engineers resolve this issue...
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
