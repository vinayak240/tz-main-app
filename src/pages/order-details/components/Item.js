import { Collapse, Typography } from "@material-ui/core";
import React, { useState } from "react";
import FoodSymbols from "../../menu/assets/FoodSymbols";
import { getCorrespondingHexCode, getItemStatusLabels } from "../utils/helper";

export default function Item(props) {
  const [state, setState] = useState({
    f_open_details: false,
  });
  const { item } = props;
  const statusInfo = getItemStatusLabels(item?.status);

  const toggleDropDown = (flagName) => {
    setState({
      ...state,
      [flagName]: !state[flagName],
    });
  };

  const isDetailRequired = () => {
    return !item.versions.every((v) => v.custumization_arr.length === 0);
  };

  const getItemTotal = () => {
    return item.versions.reduce((tot, v) => Number(v.totalCost) + tot, 0);
  };

  return (
    <div
      onClick={() => toggleDropDown("f_open_details")}
      style={{
        padding: "15px",
        fontFamily: "'Proxima Nova'",
        fontWeight: 500,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "9px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FoodSymbols
            style={{
              width: "14px",
              height: "14px",
            }}
            food_type={item.food_type}
          />
          <p style={{ margin: "0px", marginLeft: "6px" }}>
            {item.item_name} x {item.itemCount}
          </p>
        </div>
        <div
          style={{
            visibility: !state.f_open_details
              ? "visible"
              : isDetailRequired()
              ? "hidden"
              : "visible",
          }}
        >
          <span>&#8377;</span>
          {getItemTotal()}
        </div>
      </div>
      {
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            visibility: !state.f_open_details
              ? "visible"
              : isDetailRequired()
              ? "hidden"
              : "visible",
          }}
        >
          <div
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              fontSize: "13px",
              color: "#686b78",
              fontWeight: 300,
              maxWidth: "70%",
            }}
          >
            {item.versions.length > 0 &&
              item.versions
                .map((v) =>
                  v.custumization_arr
                    .map((cust) => {
                      return cust.options.map((opt) => opt.option).join(", ");
                    })
                    .join(" | ")
                )
                .join(" - ")}
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              backgroundColor: getCorrespondingHexCode(statusInfo.color),
              borderRadius: "3px",
              padding: "1.5px 4px",
              color: "white",
            }}
          >
            {statusInfo.short_label}
          </div>
        </div>
      }
      <Collapse in={state.f_open_details && isDetailRequired()}>
        <ul
          style={{
            margin: "0px",
            paddingLeft: "33px",
            marginTop: "-18px",
          }}
        >
          {item.versions.map((v) => (
            <li>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  style={{
                    fontSize: "0.9rem",
                    fontFamily: "'Proxima Nova'",
                    fontWeight: "500",
                    flexBasis: "80%",
                  }}
                >
                  [
                  {v.custumization_arr.length === 0
                    ? "No Customizations"
                    : v.custumization_arr
                        .map((cust) => {
                          return cust.options
                            .map((opt) => opt.option)
                            .join(", ");
                        })
                        .join(" | ")}
                  ] x {v.itemCount}
                </Typography>
                <Typography
                  style={{
                    fontSize: "0.9rem",
                    fontFamily: "'Proxima Nova'",
                    fontWeight: "500",
                  }}
                >
                  <span>&#8377;</span>
                  {v.totalCost}
                </Typography>
              </div>
            </li>
          ))}
        </ul>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
            borderTop: "1px solid lightgray",
            paddingTop: "5px",
          }}
        >
          <Typography
            style={{
              fontSize: "0.9rem",
              fontFamily: "'Proxima Nova'",
              fontWeight: "600",
              paddingLeft: "18px",
            }}
          >
            Total
          </Typography>
          <Typography
            style={{
              fontSize: "0.9rem",
              fontFamily: "'Proxima Nova'",
              fontWeight: "600",
            }}
          >
            <span>&#8377;</span>
            {getItemTotal()}
          </Typography>
        </div>
      </Collapse>
    </div>
  );
}
