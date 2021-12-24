import { AppBar, Button, Dialog, Drawer, Toolbar } from "@material-ui/core";
import React, { useState } from "react";
import FoodSymbols from "../../menu/assets/FoodSymbols";
import useStyles from "../styles/item";
import CustumizationPage from "../../menu/components/CutumizationPage";
import {
  removeItem as removeItemFromCart,
  updateItem as updateCartItem,
} from "../../../redux/actions/cart";
import { useDispatch } from "react-redux";
import DialogTransition from "../../menu/shared/DialogTransition";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";

function Item(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    f_cust_dialog: false,
    is_edit: false,
    f_repeat_drawer: false,
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
      is_edit: false,
    });
  };

  const handleEditCustums = () => {
    setState({
      ...state,
      f_cust_dialog: true,
      is_edit: true,
    });
  };

  async function addItem(
    isRepeatLast = false,
    itemCustomizations = [],
    totalItemCost = 0,
    repeatCount = 1
  ) {
    setState((prevState) => ({
      ...prevState,
      f_cust_dialog: false,
      f_repeat_drawer: false,
    }));

    props.addItem(
      isRepeatLast,
      itemCustomizations,
      totalItemCost,
      repeatCount,
      props.version_idx
    );
  }

  async function updateItem(
    itemCustomizations = [],
    totalItemCost = 0,
    repeatCount = 1
  ) {
    let version = {
      itemCount: repeatCount,
      totalCost:
        totalItemCost ||
        Number(
          props.cart_item[
            props.cart_item.type === "package" ? "package_price" : "item_price"
          ]
        ),
      custumization_arr: [...itemCustomizations],
    };
    setState((prevState) => ({
      ...prevState,
      f_cust_dialog: false,
      is_edit: false,
    }));

    dispatch(updateCartItem(props.cart_item._id, version, props.version_idx));
  }

  function subtractItem() {
    let count = props.cart_item.itemCount;
    let versions = props.cart_item.versions;
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
      f_cust_dialog: false,
    }));

    dispatch(removeItemFromCart(props.cart_item._id, count, props.version_idx));
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px 0px 15px 0px",
      }}
    >
      <div className="partials">
        <Dialog
          fullScreen
          open={state.f_cust_dialog}
          onClose={() => handleDialogClose("f_cust_dialog")}
          TransitionComponent={DialogTransition}
        >
          <CustumizationPage
            item={props.cart_item}
            handleClose={() => handleDialogClose("f_cust_dialog")}
            addItem={addItem}
            updateItem={updateItem}
            cur_custumizations={props.cart_item.versions[0].custumization_arr}
            cur_count={props.cart_item.versions[0].itemCount}
            is_edit={state.is_edit}
            isPackage={props.cart_item.type === "package"}
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
                  food_type={props.cart_item.food_type}
                  style={{
                    width: "19px",
                    height: "fit-content",
                  }}
                />{" "}
                <span style={{ fontSize: "1.1rem", marginLeft: "5px" }}>
                  {
                    props.cart_item[
                      props.cart_item.type === "package"
                        ? "package_name"
                        : "item_name"
                    ]
                  }
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
            {props.cart_item.versions.length > 0 &&
              props.cart_item.versions[
                props.cart_item.versions.length - 1
              ].custumization_arr
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
      <div
        style={{
          flexBasis: "5%",
          textAlign: "left",
          alignSelf: "flex-start",
          paddingTop: "4px",
        }}
      >
        {" "}
        <FoodSymbols
          food_type={props.cart_item?.food_type}
          style={{
            width: "15px",
            height: "fit-content",
            verticalAlign: "middle",
          }}
        />{" "}
      </div>
      <div
        style={{
          flexBasis: "58%",
          overflow: "hidden",
        }}
      >
        <p className={classes.itemName}>
          {props.cart_item.type !== "package"
            ? props.cart_item.item_name
            : props.cart_item.package_name}
        </p>
        {props.cart_item.versions[0].custumization_arr.length > 0 && (
          <div>
            <div
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontSize: "13px",
                color: "#686b78",
                margin: "0 5px",
                fontFamily: "'Proxima Nova'",
                fontWeight: 300,
              }}
            >
              {props.cart_item.versions[0].custumization_arr
                .map((cust) => {
                  return cust.options.map((opt) => opt.option).join(", ");
                })
                .join(" | ")}
            </div>
            <div
              onClick={handleEditCustums}
              style={{
                fontSize: "13px",
                color: "#686b78",
                fontFamily: "'Proxima Nova'",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                margin: "0 5px",
              }}
            >
              Edit{" "}
              <KeyboardArrowDownRoundedIcon
                style={{ color: "rgb(255, 164, 0)" }}
              />
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexBasis: "25%",
        }}
      >
        <span className={classes.addSubBtnCtnr}>
          <Button
            onClick={subtractItem}
            style={{
              backgroundColor: "transparent",
              border: "none",
              minWidth: "20px",
            }}
          >
            <i
              style={{
                fontSize: "0.62rem",
                verticalAlign: "middle",
                color: "#aeafb5",
              }}
              className="fas fa-minus"
            ></i>
          </Button>
          <span
            style={{
              color: "rgb(255, 164, 0)",
              fontWeight: "600",
              fontSize: "1rem",
            }}
          >
            {props.cart_item.itemCount}
          </span>
          <Button
            onClick={
              Boolean(props.cart_item.custumization_arr.length > 0)
                ? () => handleDialogOpen("f_repeat_drawer")
                : () => addItem(true)
            }
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "rgb(255, 164, 0)",
              fontWeight: "600",
              fontSize: "1.2rem",
              minWidth: "20px",
            }}
          >
            +
          </Button>
        </span>
      </div>
      <div
        style={{
          flexBasis: "16%",
          textAlign: "right",
        }}
      >
        <span className={classes.itemPrice}>
          <span>&#8377;</span>{" "}
          {props.cart_item?.versions?.reduce(
            (total, ver) => total + ver.itemCount * Number(ver.totalCost),
            0
          ) || 0}
        </span>
      </div>
    </div>
  );
}

Item.defaultProps = {
  version_idx: -1,
};

export default Item;
