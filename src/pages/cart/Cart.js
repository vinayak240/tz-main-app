import { ButtonBase, Dialog, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CartAppBar from "./components/CartAppBar";
import useStyles from "./styles/main";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import OfferIcon from "../../layouts/components/OfferIcon";
import { OrderSlideButton } from "./components/OrderSlideButton";
import { connect, useDispatch } from "react-redux";
import CartItem from "./components/CartItem";
import { clone } from "ramda";
import { getChargesMap } from "./utils/helpers";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import OffersPage from "./components/OffersPage";
import DialogTransition from "../menu/shared/DialogTransition";
import { clearCart } from "../../redux/actions/cart";

function Cart(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    infoX: 0,
    infoY: 0,
    is_open: false,
    f_cust_dialog: false,
    infolist: [],
    infoHead: "",
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

  const getOrderTotal = () => {
    let chargeTotal = getChargesMap(
      props.charges.filter((chr) => chr?.scope === "order"),
      props.cart.totalCost
    ).reduce((c_total, chr) => c_total + chr.total, 0);

    return props.cart.totalCost + chargeTotal;
  };

  const handleInfoOpen = (evt, sub_charges, charge) => {
    const domRect = evt.target.getClientRects()[0];

    setState({
      ...state,
      is_open: true,
      infoX: domRect.width / 2 + domRect.left - 32,
      infoY: domRect.height / 4 - domRect.top + window.innerHeight + 11,
      infolist: [...sub_charges],
      infoHead: charge,
    });
  };

  const handleInfoClose = () => {
    setState({
      ...state,
      is_open: false,
      infoX: 0,
      infoY: 0,
      infolist: [],
      infoHead: "",
    });
  };

  useEffect(() => {
    if (props.cart?.items?.length === 0) {
      props.goBack();
      dispatch(clearCart());
    }
  }, [props.cart?.items]);

  useEffect(() => {
    document.addEventListener("scroll", handleInfoClose);
  }, []);

  return (
    <div style={{ paddingBottom: "100px" }}>
      <div className="partials">
        <div
          onClick={handleInfoClose}
          style={{
            display: state.is_open ? "block" : "none",
            zIndex: 2,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "transparent",
          }}
        ></div>
        <Dialog
          fullScreen
          open={state.f_cust_dialog}
          onClose={() => handleDialogClose("f_cust_dialog")}
          TransitionComponent={DialogTransition}
        >
          <OffersPage
            handleClose={() => handleDialogClose("f_cust_dialog")}
            offers={props.cart?.offers}
          />
        </Dialog>
        <div
          style={{
            visibility: state.is_open ? "visible" : "hidden",
            zIndex: 3,
            position: "fixed",
            bottom: state.infoY,
            left: state.infoX,
            background: "white",
            boxShadow: "0 0 3px 2px #e9e9eb",
            borderRadius: "2px",
            minWidth: "170px",
            maxWidth: "240px",
            padding: "7px",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -7,
              width: "14px",
              height: "14px",
              left: 24,
              background: "#fff",
              border: "1px solid #e9e9eb",
              WebkitTransform: "rotate(-60deg) skew(-30deg)",
              msTransform: "rotate(-60deg) skew(-30deg)",
              transform: "rotate(-60deg) skew(-30deg)",
              WebkitBoxShadow: "0 2px 3px 1px #e9e9eb",
              boxShadow: "0 2px 3px 1px #e9e9eb",
              zIndex: 1,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "25px",
              height: "14px",
              background: "#fff",
              zIndex: 2,
              left: 24,
            }}
          ></div>
          <p
            style={{
              color: "#3d4152",
              fontSize: "14px",
              wordBreak: "break-word",
              margin: "6px",
              fontWeight: 500,
              fontFamily: "Proxima Nova",
            }}
          >
            {state.infoHead}
          </p>
          {state.infolist.map((chr) => (
            <div className={classes.paymentItemCtnr}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  fontFamily: "'Proxima Nova'",
                  color: "#686f78",
                  margin: "0px",
                }}
                className={classes.paymentItem}
              >
                {chr.text}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  fontFamily: "'Proxima Nova'",
                  color: "#686f78",
                  margin: "0px",
                }}
                className={classes.paymentItem}
              >
                <span>&#8377;</span> {chr.total}
              </p>
            </div>
          ))}
        </div>
      </div>
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
            <p
              onClick={() => handleDialogOpen("f_cust_dialog")}
              className={classes.offerLtText}
            >
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
        {getChargesMap(
          props.charges.filter((chr) => chr?.scope === "order"),
          props.cart.totalCost
        ).map((chr) => (
          <div className={classes.paymentItemCtnr}>
            <p className={classes.paymentItem}>
              {chr.text}
              {chr.sub_charges.length > 0 && (
                <InfoOutlinedIcon
                  onClick={(evt) =>
                    handleInfoOpen(evt, chr.sub_charges, chr.text)
                  }
                  className={classes.infoIcon}
                />
              )}
            </p>
            <p className={classes.paymentItem}>
              <span>&#8377;</span> {chr.total}
            </p>
          </div>
        ))}
        <div className={classes.borderedSeparator}></div>
        <div style={{ margin: "0px" }} className={classes.paymentItemCtnr}>
          <p
            /*style={{ fontSize: "0.85rem" }}*/ className={classes.offerMnText}
          >
            Order Total
          </p>
          <p
            /*style={{ fontSize: "0.85rem" }}*/ className={classes.offerMnText}
          >
            <span>&#8377;</span> {getOrderTotal()}
          </p>
        </div>
      </Paper>
      <OrderSlideButton />
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: clone(state.cart),
  charges: clone(state.restaurant.settings.charges),
});

export default connect(mapStateToProps)(Cart);
