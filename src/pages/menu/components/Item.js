import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { VegFoodSymbol } from "../assets/FoodSymbols";
import useStyles from "../styles/main";
import ExpandableText from "./ExpandableText";

export default function Item(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    itemCount: 0,
    isCustomisable: true,
  });

  function addItem() {
    setState((prevState) => ({
      ...prevState,
      itemCount: prevState.itemCount + 1,
    }));
  }

  function subtractItem() {
    let count = state.itemCount;
    if (count > 0) {
      count -= 1;
    }
    setState((prevState) => ({
      ...prevState,
      itemCount: count,
    }));
  }

  return (
    <Grid container alignItems="flex-start" justifyContent="space-between">
      <Grid item xs={7}>
        <Typography>
          <VegFoodSymbol style={{ width: "19px" }} />
        </Typography>
        <Typography className={classes.itemName}>{"Item Name"}</Typography>
        <Typography className={classes.itemPrice}>{"300"}</Typography>
        <ExpandableText className={classes.itemDesc}>
          {
            "Tandoori chicken is a chicken dish prepared by roasting chicken marinated in yogurt and spices in a tandoor, a cylindrical clay oven. The dish originated from the Indian subcontinent and is popular in many other parts of the world."
          }
        </ExpandableText>
      </Grid>
      <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            position: "relative",
            minWidth: "118px",
            height: "124px",
            fontSize: 0,
            textAlign: "right",
            width: "fit-content",
          }}
        >
          <img
            alt="Item"
            className={classes.itemImg}
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/izusxz1aiilxat7cstwv"
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "10px",
              WebkitTransform: "translateX(-50%)",
              transform: "translateX(-50%)",
              zIndex: 1,
            }}
          >
            <Button
              style={{
                background: "white",
                width: "96px",
                height: "33px",
                color: "#ffa400",
                fontWeight: 600,
                border: "1px solid #ffa400",
                boxShadow: "0 3px 8px rgb(0 0 0 / 8%)",
              }}
              disableRipple
            >
              {state.itemCount === 0 ? (
                <div style={{ width: "100%" }} onClick={addItem}>
                  ADD
                  {state.isCustomisable && (
                    <span
                      style={{
                        position: "absolute",
                        right: "4px",
                        lineHeight: 1,
                        top: 0,
                        padding: "3px",
                      }}
                    >
                      +
                    </span>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <button onClick={subtractItem} className={classes.addSubBtn}>
                    <i
                      style={{
                        fontSize: "0.7rem",
                        verticalAlign: "middle",
                        color: "#aeafb5",
                      }}
                      className="fas fa-minus"
                    ></i>
                  </button>
                  <span>{state.itemCount}</span>
                  <button onClick={addItem} className={classes.addSubBtn}>
                    +
                  </button>
                </div>
              )}
            </Button>
            {state.isCustomisable && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  left: 0,
                  top: "40px",
                  fontSize: ".67rem",
                  fontWeight: 400,
                  color: "#7e808c",
                  textAlign: "center",
                  fontFamily: "'Open Sans'",
                }}
              >
                Customisable
              </div>
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
