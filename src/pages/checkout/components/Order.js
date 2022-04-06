import React, { useState } from "react";
import { Collapse, Typography } from "@material-ui/core";
import { Item } from "./Item";
import { getChargesMap } from "../../cart/utils/helpers";
import { isOrderOngoing } from "../utils/helper";
import ITEM_STATUS from "../../../enums/item_status";

export default function Order(props) {
  const [state, setState] = useState({
    f_show_items: false,
  });

  const { order } = props;

  const toggleItem = () => {
    setState({
      ...state,
      f_show_items: !state.f_show_items,
    });
  };

  const getItemsTotal = () => {
    return getActiveItems()?.reduce(
      (tot, i) => Number(i.itemCount) * Number(i.item_price) + tot,
      0
    );
  };

  const getActiveItems = () => {
    return order?.items.filter(
      (i) =>
        ![ITEM_STATUS.UNAVAILABLE, ITEM_STATUS.CANCELLED].includes(i?.status)
    );
  };

  const getTotalDiscount = () => {
    return order?.offers?.reduce((tot, o) => Number(o.discount) + tot, 0);
  };

  const getChargesTotal = () => {
    return getChargesMap(
      props.charges.filter((chr) => chr?.scope === "order"),
      Number(getItemsTotal())
    ).reduce((c_total, chr) => c_total + chr.total, 0);
  };

  return (
    <div
      onClick={toggleItem}
      style={{
        // background: "#edececa6",
        padding: "3px 10px",
        borderRadius: "2px",
        paddingBottom: "8px",
        margin: "10px 0px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0px",
        }}
      >
        <Typography
          style={{
            fontSize: "0.9rem",
            fontFamily: "'Proxima Nova'",
            fontWeight: "500",
          }}
        >
          ORDER #{order?.order_no || order?.meta?.order_num}
          {/* This count will represent the restaurant's total orders for that day */}
          {(isOrderOngoing(order) || state.f_show_items) && (
            <span
              style={{
                marginLeft: "6px",
                fontSize: "0.7rem",
                background: isOrderOngoing(order)
                  ? "rgb(255 164 0)"
                  : "#059424",
                padding: "2px 6px",
                color: "white",
                borderRadius: "4px",
              }}
            >
              <i
                style={{
                  content: '"\f00c"',
                  fontSize: "0.54rem",
                  marginRight: state.f_show_items ? "3px" : "0px",
                }}
                className={
                  isOrderOngoing(order)
                    ? "fas fa-exclamation-triangle"
                    : "fas fa-check"
                }
              ></i>
              {state.f_show_items
                ? isOrderOngoing(order)
                  ? "Ongoing"
                  : "Completed"
                : ""}
            </span>
          )}
        </Typography>
        <Typography style={{ fontSize: "1.4rem" }}>
          {" "}
          {state.f_show_items ? (
            <i
              style={{
                fontSize: "0.7rem",
                verticalAlign: "middle",
              }}
              className="fas fa-minus"
            ></i>
          ) : (
            "+"
          )}
        </Typography>
      </div>
      <Collapse in={state.f_show_items}>
        <ul
          style={{
            paddingLeft: "7px",
            margin: "0",
            marginLeft: "7px",
          }}
        >
          {getActiveItems().map((i) => (
            <Item item={i} />
          ))}
        </ul>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "15px",
            borderTop: "1px solid lightgray",
            paddingTop: "5px",
          }}
        >
          <Typography
            style={{
              fontSize: "0.85rem",
              fontFamily: "'Proxima Nova'",
              fontWeight: "400",
            }}
          >
            Items Total
          </Typography>
          <Typography
            style={{
              fontSize: "0.85rem",
              fontFamily: "'Proxima Nova'",
              fontWeight: "400",
            }}
          >
            <span>&#8377;</span>
            {getItemsTotal()}
          </Typography>
        </div>
        {getTotalDiscount() > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "5px",
            }}
          >
            <Typography
              style={{
                fontSize: "0.85rem",
                fontFamily: "'Proxima Nova'",
                fontWeight: "400",
                color: "rgb(3, 161, 3)",
              }}
            >
              Order Discount
            </Typography>
            <Typography
              style={{
                fontSize: "0.85rem",
                fontFamily: "'Proxima Nova'",
                fontWeight: "400",
                color: "rgb(3, 161, 3)",
              }}
            >
              -<span>&#8377;</span>
              {getTotalDiscount()}
            </Typography>
          </div>
        )}
        {getChargesTotal() > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "5px",
            }}
          >
            <Typography
              style={{
                fontSize: "0.85rem",
                fontFamily: "'Proxima Nova'",
                fontWeight: "400",
              }}
            >
              Additional Charges
            </Typography>
            <Typography
              style={{
                fontSize: "0.85rem",
                fontFamily: "'Proxima Nova'",
                fontWeight: "400",
              }}
            >
              <span>&#8377;</span>
              {getChargesTotal()}
            </Typography>
          </div>
        )}
      </Collapse>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0px",
          marginTop: state.f_show_items ? "10px" : "0px",
        }}
      >
        {state.f_show_items ? (
          <Typography
            style={{
              fontSize: "0.9rem",
              fontFamily: "'Proxima Nova'",
              fontWeight: 500,
            }}
          >
            Total
          </Typography>
        ) : (
          <Typography
            style={{ fontSize: "0.85rem", fontFamily: "'Proxima Nova'" }}
          >
            {getActiveItems()?.length} Items
          </Typography>
        )}
        <Typography
          style={{
            fontSize: "0.9rem",
            fontFamily: "'Proxima Nova'",
            fontWeight: 500,
          }}
        >
          <span>&#8377;</span> {order?.total_price}
        </Typography>
      </div>
    </div>
  );
}
