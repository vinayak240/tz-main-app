import React, { useState } from "react";
import { Button, Collapse } from "@material-ui/core";
import { isOfferApplicable } from "../utils/offers";
export default function Offer(props) {
  const [state, setState] = useState({
    f_condtn: false,
  });
  const { offer } = props;
  const is_applicable = isOfferApplicable(offer, props.cart);

  const toggleCollapse = (flag) => {
    setState({
      ...state,
      [flag]: !state[flag],
    });
  };

  const applyOffer = () => {
    props.applyOffer(offer);
  };

  const isOfferApplied = () => {
    return Boolean(props.cart?.offers?.find((o) => offer._id === o.offer_id));
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #f4f4f5",
        padding: "20px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            background: "#d8ebfb",
            padding: "8px",
            fontWeight: "600",
            border: "1px dashed",
          }}
        >
          {offer.code}
        </span>
        <Button
          onClick={applyOffer}
          style={{
            fontWeight: "600",
            opacity: is_applicable ? 1 : 0.64,
            fontSize: "0.83rem",
            color: !isOfferApplied() ? "white" : "green",
            backgroundColor: isOfferApplied() ? "white" : "rgb(50 139 214)",
          }}
          disabled={!is_applicable || isOfferApplied()}
        >
          {!isOfferApplied() ? "APPLY" : "APPLIED"}
        </Button>
      </div>
      <p
        style={{
          marginTop: "25px",
          fontWeight: "500",
          fontFamily: "'Proxima Nova'",
        }}
      >
        {offer.label_text}
      </p>
      <p
        style={{
          color: "rgb(104, 107, 120)",
          fontSize: "0.85rem",
          marginTop: "0px",
          paddingTop: "0px",
          fontFamily: '"Proxima Nova"',
          fontWeight: "300",
        }}
      >
        {offer.desc}
      </p>
      <div>
        {offer.conditions?.length > 0 && (
          <div>
            {!state.f_condtn && (
              <div>
                <Button
                  style={{
                    color: "#5d8ed5",
                    textTransform: "capitalize",
                    fontFamily: "'Proxima Nova'",
                    fontWeight: "400",
                    padding: "0px",
                    fontSize: ".85rem",
                  }}
                  onClick={() => toggleCollapse("f_condtn")}
                >
                  + More Details
                </Button>
              </div>
            )}
            <Collapse in={state.f_condtn}>
              <div
                style={{
                  color: "#686b78",
                  fontSize: ".85rem",
                  borderTop: "1px solid #f4f4f5",
                  fontFamily: "'Proxima Nova'",
                  fontWeight: "300",
                }}
              >
                <p>Terms and conditiions</p>
                <uk>
                  {offer.conditions.map((condtn) => (
                    <li>{condtn.label_text}</li>
                  ))}
                </uk>
              </div>
            </Collapse>
          </div>
        )}
      </div>
    </div>
  );
}
