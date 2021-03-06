import { Typography } from "@material-ui/core";
import React from "react";
import PulseLoader from "../../order-details/assets/PulseLoader";
import {
  getCorrespondingHexCode,
  getOrderStatusLabels,
} from "../../order-details/utils/helper";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

export function Order(props) {
  const { order } = props;
  const items = order?.items;
  const curStatusInfo = getOrderStatusLabels(order?.status);

  const getTotalDiscount = () => {
    return order?.offers?.reduce((tot, o) => Number(o.discount) + tot, 0);
  };

  const getTotal = () => {
    let discount = getTotalDiscount();
    return Number(order.total_price) - discount;
  };

  return (
    <div style={{ padding: "18px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontFamily: "'Proxima Nova'",
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          Order #{order.meta.order_num}{" "}
        </Typography>
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.85rem",
            fontFamily: "'Proxima Nova'",
            border: "1px solid lightgray",
            padding: "5px",
            borderRadius: "5px",
            color: "#3c3a3a",
          }}
        >
          <PulseLoader
            style={{
              backgroundColor: getCorrespondingHexCode(curStatusInfo.color),
              width: "18px",
              height: "18px",
              marginRight: "6px",
            }}
          />
          {curStatusInfo.short_label}
        </Typography>
      </div>
      <Typography
        style={{
          fontSize: ".86rem",
          fontWeight: "300",
          textTransform: "capitalize",
          fontFamily: "'Proxima Nova'",
          color: "##555657",
          display: "flex",
          alignItems: "center",
          marginTop: "-3px",
        }}
      >
        Table #{order.table_id}
      </Typography>
      <Typography
        style={{
          fontSize: ".86rem",
          fontWeight: "300",
          textTransform: "capitalize",
          fontFamily: "'Proxima Nova'",
          color: "##555657",
          display: "flex",
          alignItems: "center",
          marginTop: "1px",
          marginBottom: "7px",
        }}
      >
        <span>&#8377;</span>
        {getTotal()}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "1px dashed #d4d5d9",
          paddingBottom: "10px",
        }}
      >
        <div style={{ flexBasis: "90%" }}>
          <Typography
            style={{
              paddingTop: "7px",
              color: "#555657",
              fontSize: ".85rem",
              fontFamily: "'Proxima Nova'",
              fontWeight: 300,
            }}
          >
            {items.map((item, idx) => (
              <span>
                <span
                  style={{ textDecoration: "underline" }}
                >{`${item.item_name}(${item.itemCount})`}</span>
                {idx < items?.length - 1 && <span>, </span>}
              </span>
            ))}
          </Typography>
          <Typography
            style={{
              marginTop: "14px",
            }}
          >
            <span
              style={{
                background: "lightgray",
                marginTop: "14px",
                color: "black",
                fontSize: ".66rem",
                padding: "3px 6px",
                borderRadius: "6px",
                fontFamily: "'Proxima Nova'",
              }}
            >
              {new Date(order.date)
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}{" "}
              {new Date(order.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            paddingRight: "5px",
          }}
        >
          <ArrowForwardIosRoundedIcon
            style={{ width: "1rem", marginLeft: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}
