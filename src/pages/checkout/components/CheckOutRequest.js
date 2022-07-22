import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { Typography } from "@material-ui/core";
import jumping_dots from "../../../assets/jumping_dots.json";
import green_check from "../../../assets/green_check.json";
import { TABLE_STATUS } from "../../../enums/table_status";
import { connect } from "react-redux";
import TableAppBar from "../../table-request/components/TableAppBar";
import { EmojiMapper } from "../utils/constants";
import { getChargesMap, round } from "../../cart/utils/helpers";
import { clone } from "ramda";
import useNavigateSearch from "../../table-request/hooks/useNavigateWithQuery";

function CheckOutRequest(props) {
  const container = useRef(null);
  const navigate = useNavigateSearch();

  const setRating = (rating) => {
    navigate("/restaurant/checkout/feedback", {
      r: rating,
    });
  };

  const isSuccessStatus = (status) =>
    [TABLE_STATUS.TABLE_CHECKOUT_DONE].includes(status);

  const isRequestStatus = (status) =>
    [TABLE_STATUS.TABLE_CHECKOUT_REQUESTED].includes(status);

  const getHelperText = (status) => {
    switch (status) {
      case TABLE_STATUS.TABLE_CHECKOUT_REQUESTED:
        return "We have requested for checkout, A restaurant executive will fulfill your request..";

      case TABLE_STATUS.TABLE_CHECKOUT_DONE:
        return "Your table has been successfully cleared and checked out, Please review your expierence";

      default:
        return "We have requested for checkout, A restaurant executive will fulfill your request..";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case TABLE_STATUS.TABLE_CHECKOUT_REQUESTED:
        return "CheckOut Requested";

      case TABLE_STATUS.TABLE_CHECKOUT_DONE:
        return "Table CheckOut Done!!";

      default:
        return "CheckOut Requested";
    }
  };

  const getTotal = () => {
    let chargeTotal = getChargesMap(
      props.charges?.filter((chr) => chr?.scope === "total"),
      props.table.totalCost
    ).reduce((c_total, chr) => c_total + chr.total, 0);

    let discount = props.table.offers.reduce(
      (tot, o) => (o.is_applicable ? tot + o.discount : tot),
      0
    );

    return round(props.table.totalCost + chargeTotal - discount, 1);
  };

  useEffect(() => {
    lottie.destroy();
    console.log("HERE", props.table?.status);
    if (isSuccessStatus(props.table?.status)) {
      lottie.loadAnimation({
        container: container.current,
        animationData: green_check,
        renderer: "svg",
        loop: false,
        autoplay: true,
      });
    } else {
      lottie.loadAnimation({
        container: container.current,
        animationData: jumping_dots,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });
    }
  }, [props.table?.status]);

  return (
    <div>
      <TableAppBar noBack={!isSuccessStatus(props.table?.status)} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "6rem",
        }}
      >
        <div
          style={{
            width: isSuccessStatus(props.table?.status) ? "40%" : "53%",
            margin: "auto",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, 10px)",
          }}
          ref={container}
        ></div>
      </div>
      <div
        style={{
          marginTop: isSuccessStatus(props.table?.status) ? "5.3rem" : "3.5rem",
        }}
      >
        <h4
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            fontSize: "1.2rem",
            fontFamily: "'Proxima Nova'",
            textAlign: "center",
          }}
        >
          Bill Total
        </h4>
        <h2
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            fontSize: "2.5rem",
            fontFamily: '"Proxima Nova"',
            textAlign: "center",
            marginRight: "10px",
          }}
        >
          <span>&#8377;</span> {getTotal()}
        </h2>
        <Typography
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            fontSize: "1.1rem",
            fontFamily: '"Proxima Nova"',
            textAlign: "center",
            fontWeight: "550",
          }}
        >
          <span>{getStatusText(props.table?.status)}</span>
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
          {getHelperText(props.table?.status)}
        </Typography>
      </div>
      {isSuccessStatus(props.table?.status) && (
        <div
          id="feedback"
          style={{
            marginTop: "1.8rem",
            padding: "15px",
            borderTop: "1px solid #a7a7a7",
          }}
        >
          <Typography
            style={{
              fontSize: "1.3rem",
              fontFamily: "'Proxima Nova'",
              fontWeight: "bold",
              margin: "10px",
              textAlign: "center",
            }}
          >
            Help us improve TableZap
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "24px 20px 20px",
              fontSize: "2rem",
              fontFamily: '"Proxima Nova"',
              alignItems: "flex-start",
            }}
          >
            {EmojiMapper.map((e, idx) => (
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setRating(idx + 1)}
              >
                <span
                  style={{
                    padding: "5px",
                    background: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {e}
                </span>
                <Typography
                  style={{
                    fontFamily: '"Proxima Nova"',
                    fontSize: "0.74rem",
                    marginTop: "6px",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {idx === 0
                    ? "Very Bad"
                    : idx === EmojiMapper.length - 1
                    ? "Loved It!!"
                    : ""}
                </Typography>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  table: clone(state.table),
  charges: clone(state.restaurant?.settings?.charges),
});

export default connect(mapStateToProps)(CheckOutRequest);
