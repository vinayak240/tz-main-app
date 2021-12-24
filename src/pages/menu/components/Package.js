import {
  AppBar,
  Button,
  Dialog,
  Drawer,
  Grid,
  Toolbar,
  Typography,
  Paper,
} from "@material-ui/core";
import { clone } from "ramda";
import React, { useState } from "react";
import FoodSymbols from "../assets/FoodSymbols";
import DialogTransition from "../shared/DialogTransition";
import { addItem as addPackageToCart } from "../../../redux/actions/cart";
import { removeItem as removePackageFromCart } from "../../../redux/actions/cart";
import useStyles from "../styles/main";
import ExpandableText from "./ExpandableText";
import PackageItemsPage from "./PackageItemsPage";
import { connect, useDispatch } from "react-redux";
import { findCartItem } from "../utils/helper";

function Package(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart_package = findCartItem(props.cart, props.package._id);
  const [state, setState] = useState({
    itemCount: cart_package?.itemCount || 0,
    f_items_dialog: false,
    f_repeat_drawer: false,
    versions: cart_package?.versions || [],
  });

  const { package: m_package } = props;

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

  function addItem(
    isRepeatLast = false,
    itemCustomizations = [],
    totalPackageCost = 0,
    repeatCount = 1
  ) {
    let versions = clone(state.versions);

    if (isRepeatLast && versions.length > 0) {
      versions[versions.length - 1].itemCount += 1;
    } else {
      let item = {
        itemCount: repeatCount,
        totalCost: totalPackageCost || Number(props.package.package_price),
        custumization_arr: [...itemCustomizations],
      };

      versions = [...versions, item];
    }

    let count = versions.reduce((total, item) => total + item.itemCount, 0);

    setState((prevState) => ({
      ...prevState,
      itemCount: count,
      versions: clone(versions),
      f_items_dialog: false,
      f_repeat_drawer: false,
    }));

    dispatch(
      addPackageToCart(
        {
          itemCount: count,
          versions,
          type: "package",
          package_name: m_package.package_name,
          package_price: m_package.package_price,
          items: m_package.items,
          custumization_arr: m_package.custumization_arr,
          food_type: decideFoodType(m_package.items),
        },
        m_package._id
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
      f_items_dialog: false,
    }));

    dispatch(removePackageFromCart(props.package._id, count));
  }

  const decideFoodType = () => {
    let flag = false;

    flag = m_package.items.some((item) => item.food_type === "non_veg");

    if (flag) return "non_veg";

    flag = m_package.items.some((item) => item.food_type === "egg_only");

    if (flag) return "egg_only";

    return "veg";
  };

  return (
    <div>
      <div className="partials">
        <Dialog
          fullScreen
          open={state.f_items_dialog}
          onClose={() => handleDialogClose("f_items_dialog")}
          TransitionComponent={DialogTransition}
        >
          <PackageItemsPage
            m_package={m_package}
            handleClose={() => handleDialogClose("f_items_dialog")}
            addItem={addItem}
            decideFoodType={decideFoodType}
            isPackage={true}
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
                  food_type={decideFoodType()}
                  style={{
                    width: "19px",
                    height: "fit-content",
                  }}
                />{" "}
                <span style={{ fontSize: "1.1rem", marginLeft: "5px" }}>
                  {m_package.package_name}
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
              onClick={() => handleDialogOpen("f_items_dialog")}
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
      <Paper elevation={0}>
        <Grid
          style={{ paddingBottom: "14px" }}
          container
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Grid item xs={7}>
            <Typography>
              <FoodSymbols
                food_type={decideFoodType()}
                style={{ width: "19px", height: "fit-content" }}
              />
            </Typography>
            <Typography className={classes.itemName}>
              {m_package.package_name}
            </Typography>
            <Typography className={classes.itemPrice}>
              {m_package.package_price}
            </Typography>
            {Boolean(m_package.package_desc.length > 0) && (
              <ExpandableText className={classes.itemDesc}>
                {m_package.package_desc}
              </ExpandableText>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div
              style={{
                position: "relative",
                minWidth: "118px",
                height: "fit-content",
                fontSize: 0,
                textAlign: "right",
                width: "fit-content",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "auto",
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
                    border: "1px solid #d4d5d9",
                    boxShadow: "0 3px 8px rgb(0 0 0 / 8%)",
                  }}
                  disableRipple
                >
                  {state.itemCount === 0 ? (
                    <div
                      style={{ width: "100%" }}
                      onClick={() => handleDialogOpen("f_items_dialog")}
                    >
                      ADD
                      {Boolean(m_package.custumization_arr.length > 0) && (
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
                          m_package.custumization_arr.length > 0
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
                {Boolean(m_package.custumization_arr.length > 0) && (
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
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Package);
