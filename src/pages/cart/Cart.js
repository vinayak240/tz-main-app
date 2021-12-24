import { ButtonBase, IconButton, Paper } from "@material-ui/core";
import React, { useState } from "react";
import CartAppBar from "./components/CartAppBar";
import Item from "./components/Item";
import useStyles from "./styles/main";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import OfferIcon from "../../layouts/components/OfferIcon";
import { OrderSlideButton } from "./components/OrderSlideButton";
import { connect } from "react-redux";
import CartItem from "./components/CartItem";
import { clone } from "ramda";

function Cart(props) {
  const classes = useStyles();
  return (
    <div style={{ paddingBottom: "100px" }}>
      <CartAppBar n_items={props.cart.items.length} goBack={props.goBack} />
      <Paper className={classes.itemList} elevation={0}>
        <div id="item-list" style={{ padding: "0px 16px" }}>
          <p className={classes.itemsMnText}>Items Added</p>
          {props.cart.items.map((item, idx) => (
            <CartItem key={item._id} cart_item={item} />
          ))}
        </div>
        <div className={classes.suggestionBox}>
          <i
            style={{
              fontSize: "16px",
              marginRight: "20px",
              color: "#686b78",
              fontWeight: 300,
            }}
            className="far fa-list-alt"
          ></i>
          <textarea
            className={classes.suggestionTextBox}
            rows={1}
            placeholder="Write suggestions for your order"
          ></textarea>
        </div>
      </Paper>
      <div className={classes.separatorLine}></div>
      <Paper className={classes.offerCtnr} elevation={0}>
        <div>
          <p className={classes.offerMnText}>Offers</p>
          <ButtonBase style={{ display: "block", width: "100%" }}>
            <p className={classes.offerLtText}>
              <OfferIcon style={{ width: "20px", marginRight: "6px" }} />
              Select a coupon code
              <ArrowForwardIosRoundedIcon
                style={{ width: "1rem", marginLeft: "auto" }}
              />
            </p>
          </ButtonBase>
        </div>
      </Paper>
      <div className={classes.separatorLine}></div>
      <Paper className={classes.paymentsCtnr} elevation={0}>
        <p className={classes.offerMnText}>Order Details</p>
        <div className={classes.paymentItemCtnr}>
          <p className={classes.paymentItem}>Item Total</p>
          <p className={classes.paymentItem}>
            <span>&#8377;</span> {props.cart.totalCost}
          </p>
        </div>
        <div className={classes.borderedSeparator}></div>
        <div style={{ margin: "0px" }} className={classes.paymentItemCtnr}>
          <p style={{ fontSize: "0.85rem" }} className={classes.offerMnText}>
            Order Total
          </p>
          <p style={{ fontSize: "0.85rem" }} className={classes.offerMnText}>
            <span>&#8377;</span> {props.cart.totalCost}
          </p>
        </div>
      </Paper>
      <OrderSlideButton />
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: clone(state.cart),
});

export default connect(mapStateToProps)(Cart);
