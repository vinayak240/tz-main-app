import {
  AppBar,
  Button,
  Dialog,
  Drawer,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { clone } from "ramda";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FoodSymbols from "../assets/FoodSymbols";
import DialogTransition from "../shared/DialogTransition";
import useStyles from "../styles/main";
import CustumizationPage from "./CutumizationPage";
import ExpandableText from "./ExpandableText";
import { addItem as addItemToCart } from "../../../redux/actions/cart";
import { removeItem as removeItemFromCart } from "../../../redux/actions/cart";

export default function Item(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    itemCount: props.cart_item?.itemCount || 0,
    f_cust_dialog: false,
    f_repeat_drawer: false,
    versions: clone(props.cart_item?.versions) || [],
  });

  const handleDialogOpen = (flagName) => {
    setState({
      ...state,
      [flagName]: true,
    });
  };

  const handleDialogClose = (flagName) => {
    setState({
      ...state,
      [flagName]: false,
    });
  };

  const { item } = props;

  async function addItem(
    isRepeatLast = false,
    itemCustomizations = [],
    totalItemCost = 0,
    repeatCount = 1
  ) {
    let versions = clone(state.versions);

    if (isRepeatLast && versions.length > 0) {
      versions[versions.length - 1].itemCount += 1;
    } else {
      let item = {
        itemCount: repeatCount,
        totalCost: totalItemCost || Number(props.item.item_price),
        custumization_arr: [...itemCustomizations],
      };

      versions = [...versions, item];
    }

    const count = versions.reduce((total, item) => total + item.itemCount, 0);

    setState((prevState) => ({
      ...prevState,
      itemCount: count,
      versions: clone(versions),
      f_cust_dialog: false,
      f_repeat_drawer: false,
    }));

    dispatch(
      addItemToCart(
        {
          itemCount: count,
          versions,
          type: "item",
          item_name: item.item_name,
          item_price: item.item_price,
          custumization_arr: item.custumization_arr,
          food_type: item.food_type,
        },
        props.item._id
      )
    );
  }

  function subtractItem() {
    let count = state.itemCount;
    let versions = state.versions;
    if (count > 0) {
      count -= 1;
    }

    if (versions.length > 0) {
      if (versions[versions.length - 1].itemCount === 1) {
        versions = versions.slice(0, versions.length - 1);
      } else {
        versions[versions.length - 1].itemCount -= 1;
      }
    }

    setState((prevState) => ({
      ...prevState,
      itemCount: count,
      versions: [...versions],
      f_cust_dialog: false,
    }));

    dispatch(removeItemFromCart(props.item._id, count));
  }

  useEffect(() => {
    setState((prev) => ({
      itemCount: props.cart_item?.itemCount || prev.itemCount,
      versions: clone(props.cart_item?.versions) || prev.versions,
    }));
  }, [props.cart_item]);

  return (
    <div>
      <div className="partials">
        <Dialog
          fullScreen
          open={state.f_cust_dialog}
          onClose={() => handleDialogClose("f_cust_dialog")}
          TransitionComponent={DialogTransition}
        >
          <CustumizationPage
            item={item}
            handleClose={() => handleDialogClose("f_cust_dialog")}
            addItem={addItem}
          />
        </Dialog>
        <Drawer
          anchor="bottom"
          open={state.f_repeat_drawer}
          onClose={() => handleDialogClose("f_repeat_drawer")}
        >
          <AppBar
            position="sticky"
            style={{ backgroundColor: "#f2f6fc", color: "black" }}
            elevation={0}
          >
            <Toolbar>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FoodSymbols
                  food_type={item.food_type}
                  style={{
                    width: "19px",
                    height: "fit-content",
                  }}
                />{" "}
                <span style={{ fontSize: "1.1rem", marginLeft: "5px" }}>
                  {item.item_name}
                </span>{" "}
              </div>
            </Toolbar>
          </AppBar>
          <div
            style={{
              color: "#7e808c",
              fontSize: "11px",
              fontFamily: "'Open Sans'",
              fontWeight: 400,
              padding: "16px 16px 0",
            }}
          >
            {state.versions.length > 0 &&
              state.versions[state.versions.length - 1].custumization_arr
                .map((cust) => {
                  return cust.options.map((opt) => opt.option).join(", ");
                })
                .join(" | ")}
          </div>
          <div
            style={{
              padding: "16px",
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => handleDialogOpen("f_cust_dialog")}
              className={classes.repeatBtn}
              style={{
                color: "#ffa400",
              }}
            >
              I'LL CHOOSE
            </Button>
            <Button
              onClick={() => addItem(true)}
              className={classes.repeatBtn}
              style={{
                backgroundColor: "#ffa400",
                color: "white",
              }}
            >
              REPEAT LAST
            </Button>
          </div>
        </Drawer>
      </div>
      <Grid
        style={{ paddingBottom: "14px" }}
        container
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Grid
          item
          xs={!props.isPackage || Boolean(item.item_img?.imgURL) ? 7 : 12}
        >
          <Typography>
            <FoodSymbols
              food_type={item.food_type}
              style={{ width: "19px", height: "fit-content" }}
            />
          </Typography>
          <Typography className={classes.itemName}>{item.item_name}</Typography>
          {!props.isPackage && (
            <Typography className={classes.itemPrice}>
              {item.item_price}
            </Typography>
          )}
          {Boolean(item.item_desc?.length > 0) && (
            <ExpandableText className={classes.itemDesc}>
              {item.item_desc}
            </ExpandableText>
          )}
        </Grid>
        {(!props.isPackage || Boolean(item.item_img?.imgURL)) && (
          <Grid
            item
            xs={4}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div
              style={{
                position: "relative",
                minWidth: "118px",
                height: Boolean(item.item_img?.imgURL)
                  ? "124px"
                  : "fit-content",
                fontSize: 0,
                textAlign: "right",
                width: "fit-content",
              }}
            >
              {Boolean(item.item_img?.imgURL) && (
                <img
                  alt="Item"
                  className={classes.itemImg}
                  src={item.item_img?.imgURL}
                />
              )}
              {!props.isPackage && (
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: Boolean(item.item_img?.imgURL) ? "5px" : "auto",
                    WebkitTransform: "translateX(-50%)",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                  }}
                >
                  <Button
                    style={{
                      background: "white",
                      width: "93px",
                      height: "34px",
                      color: "#ffa400",
                      fontWeight: 600,
                      fontFamily: "'Proxima Nova', sans-serif",
                      border: "1px solid #d4d5d9",
                      boxShadow: "0 3px 8px rgb(0 0 0 / 8%)",
                    }}
                    disableRipple
                  >
                    {state.itemCount === 0 ? (
                      <div
                        style={{ width: "100%", fontSize: "1rem" }}
                        onClick={
                          Boolean(item.custumization_arr.length > 0)
                            ? () => handleDialogOpen("f_cust_dialog")
                            : () => addItem(true)
                        }
                      >
                        ADD
                        {Boolean(item.custumization_arr.length > 0) && (
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
                        <button
                          onClick={subtractItem}
                          className={classes.addSubBtn}
                        >
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
                        <button
                          onClick={
                            Boolean(item.custumization_arr.length > 0)
                              ? () => handleDialogOpen("f_repeat_drawer")
                              : () => addItem(true)
                          }
                          className={classes.addSubBtn}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </Button>
                  {Boolean(item.custumization_arr.length > 0) && (
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
              )}
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

Item.defaultProps = {
  isPackage: false,
};
