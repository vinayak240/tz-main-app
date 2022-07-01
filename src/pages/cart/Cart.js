import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
  Drawer,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import CartAppBar from "./components/CartAppBar";
import useStyles from "./styles/main";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import OfferIcon from "../../layouts/components/OfferIcon";
import { OrderSlideButton } from "./components/OrderSlideButton";
import { connect, useDispatch } from "react-redux";
import CartItem from "./components/CartItem";
import { clone, set } from "ramda";
import { getChargesMap, round } from "./utils/helpers";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import OffersPage from "./components/OffersPage";
import DialogTransition from "../menu/shared/DialogTransition";
import {
  applyOfferOnCart,
  clearCart,
  removeOffers,
} from "../../redux/actions/cart";
import { processOffer, isOfferApplicable } from "./utils/offers";
import { isObjEmpty } from "../../utils/helpers";
import MsgOfferIcon from "./assets/MsgOfferIcon";
import PaperComponent from "./shared/PaperComponent";
import {
  getNextOrderNumber,
  placeOrder as placeOrderAction,
} from "../../redux/actions/table";
import { useNavigate } from "react-router-dom";
import LoadingDrawer from "../shared/LoadingDrawer";
import CART_STATUS from "../../enums/cart_status";

function Cart(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    infoX: 0,
    infoY: 0,
    is_open: false,
    f_offer_page: false,
    f_offer_msg: false,
    f_place_drawer: false,
    infolist: [],
    infoHead: "",
    order_num: 0,
  });
  const [curOffer, setCurOffer] = useState({
    is_applied: false,
    code: "",
    discount: 0,
  });

  const handleDialogOpen = (flagName, orderNum = 0) => {
    if (flagName === "f_place_drawer") {
      setState((prevState) => ({
        ...prevState,
        [flagName]: true,
        order_num: orderNum,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [flagName]: true,
      }));
    }
  };

  const handleDialogClose = (flagName) => {
    setState((prevState) => ({
      ...prevState,
      [flagName]: false,
    }));
  };

  const getOrderTotal = () => {
    let chargeTotal = getChargesMap(
      props.charges.filter((chr) => chr?.scope === "order"),
      props.cart.totalCost
    ).reduce((c_total, chr) => c_total + chr.total, 0);

    let discount = props.cart.offers.reduce(
      (tot, o) => (o.is_applicable ? tot + o.discount : tot),
      0
    );

    return round(props.cart.totalCost + chargeTotal - discount, 1);
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

  const openOfferMsg = (offer) => {
    setTimeout(() => {
      setCurOffer({
        ...curOffer,
        ...offer,
      });
      setTimeout(() => handleDialogOpen("f_offer_msg"), 100);
    }, 200);
  };

  const applyOffer = (offer) => {
    if (isOfferApplicable(offer, props.cart)) {
      let discountedValue = processOffer(offer, props.cart);

      dispatch(applyOfferOnCart(discountedValue, offer));
      openOfferMsg({
        is_applied: true,
        code: offer.code,
        discount: discountedValue,
      });
    } else {
      openOfferMsg({
        is_applied: false,
        code: "",
        discount: 0,
      });
    }

    handleDialogClose("f_offer_page");
  };

  const getAppliedOffer = () => {
    return props.cart.offers.find((o) => o.type === "applied");
  };

  const removeOffer = () => {
    let curOffer = getAppliedOffer();
    dispatch(removeOffers([curOffer.offer_id]));
  };

  const placeOrder = async () => {
    let orderNum = getNextOrderNumber(props.common?.user?.user_name);
    handleDialogOpen("f_place_drawer", orderNum);

    dispatch(
      placeOrderAction({ ...props.cart, totalCost: getOrderTotal(), orderNum })
    );
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    if (props.cart?.items?.length === 0) {
      navigate("/restaurant/menu", { replace: true });
      dispatch(clearCart());
    }
  }, [props.cart, props.cart?.items]);

  useEffect(() => {
    if (!curOffer.is_applied) {
      setCurOffer({
        ...curOffer,
        is_applied: false,
        code: "",
        discount: 0,
      });
    }
  }, [state.f_offer_msg, setCurOffer]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.addEventListener("scroll", handleInfoClose);
  }, []);

  return (
    <div style={{ paddingBottom: "100px" }}>
      <div className="partials">
        <Dialog
          PaperComponent={PaperComponent}
          open={state.f_offer_msg}
          onClose={() => handleDialogClose("f_offer_msg")}
        >
          <DialogTitle
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px",
            }}
          >
            <MsgOfferIcon type={curOffer.is_applied ? "success" : "fail"} />
          </DialogTitle>
          <DialogContent style={{ paddingTop: "0px" }}>
            {curOffer.is_applied ? (
              <Fragment>
                <Typography
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontFamily: "'Proxima Nova'",
                    fontSize: "0.85rem",
                    color: "#4a4949",
                  }}
                >
                  code '{curOffer.code}' applied
                </Typography>
                <Typography
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "1.4rem",
                    fontFamily: "'Proxima Nova'",
                    marginTop: "3px",
                    marginBottom: "-3px",
                  }}
                >
                  You saved <span>&#8377;</span>
                  {curOffer.discount}
                </Typography>
                <Typography
                  style={{
                    textAlign: "center",
                    fontFamily: "'Proxima Nova'",
                    fontSize: "0.95rem",
                    color: "#4a4949",
                  }}
                >
                  with this coupon
                </Typography>
              </Fragment>
            ) : (
              <Fragment>
                <Typography
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontFamily: "'Proxima Nova'",
                    fontSize: "0.85rem",
                    color: "#4a4949",
                  }}
                >
                  Cannot apply this coupon
                </Typography>
              </Fragment>
            )}
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px",
            }}
          >
            <Button
              onClick={() => handleDialogClose("f_offer_msg")}
              style={{
                fontWeight: "600",
                fontFamily: "'Proxima Nova'",
                color: "#ab0404",
                textTransform: "none",
              }}
            >
              Ok!
            </Button>
          </DialogActions>
        </Dialog>
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
          open={state.f_offer_page}
          onClose={() => handleDialogClose("f_offer_page")}
          TransitionComponent={DialogTransition}
        >
          <OffersPage
            handleClose={() => handleDialogClose("f_offer_page")}
            offers={props.offers.filter((o) => o.scope === "order")}
            applyOffer={applyOffer}
            cart={props.cart}
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
        <Drawer
          anchor="bottom"
          open={state.f_place_drawer}
          onClose={() => handleDialogClose("f_place_drawer")}
        >
          <LoadingDrawer
            is_finished={props.cart?.status === CART_STATUS.PLACED}
            msg={
              props.cart?.status !== CART_STATUS.PLACED
                ? "Placing your order.."
                : "Order has been placed"
            }
            alert_msg={"Please wait, Don't quit the application"}
            order_num={props.cart?.placed_order_id || state.order_num}
          />
        </Drawer>
      </div>
      <CartAppBar n_items={props.cart.items.length} goBack={goBack} />
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
          {isObjEmpty(getAppliedOffer()) ? (
            <ButtonBase style={{ display: "block", width: "100%" }}>
              <p
                onClick={() => handleDialogOpen("f_offer_page")}
                className={classes.offerLtText}
              >
                <OfferIcon style={{ width: "20px", marginRight: "6px" }} />
                Select a coupon code
                <ArrowForwardIosRoundedIcon
                  style={{ width: "1rem", marginLeft: "auto" }}
                />
              </p>
            </ButtonBase>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0px",
                  marginTop: "-3px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckCircleRoundedIcon
                    style={{
                      width: "18px",
                      fill: "mediumseagreen",
                      verticalAlign: "middle",
                      margin: "3px",
                      marginRight: "7px",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Proxima Nova'",
                      fontWeight: "600",
                    }}
                  >
                    Code '{getAppliedOffer().code}' applied
                  </span>
                </div>
                <p
                  style={{
                    margin: "0px",
                    color: "#6ca4dd",
                    fontWeight: "500",
                    fontFamily: "'Proxima Nova'",
                  }}
                >
                  <span>-</span>
                  <span>&#8377;</span> {getAppliedOffer().discount}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  marginTop: "-3px",
                }}
              >
                <Button
                  onClick={removeOffer}
                  style={{
                    fontSize: "0.6rem",
                    textTransform: "lowercase",
                    padding: "0px",
                    margin: "0px",
                    minWidth: "0px",
                    marginLeft: "6px",
                    color: "red",
                  }}
                >
                  remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </Paper>
      <div className={classes.separatorLine}></div>
      <Paper className={classes.paymentsCtnr} elevation={0}>
        <p className={classes.offerMnText}>Order Details</p>
        <div className={classes.paymentItemCtnr}>
          <p className={classes.paymentItem}>Items Total</p>
          <p className={classes.paymentItem}>
            <span>&#8377;</span> {round(props.cart.totalCost, 2)}
          </p>
        </div>
        {props.cart.offers.length > 0 &&
          props.cart.offers.map(
            (o) =>
              o.is_applicable && (
                <div
                  style={{ color: "#03a103" }}
                  className={classes.paymentItemCtnr}
                >
                  <p className={classes.paymentItem}>{o.label_text}</p>
                  <p className={classes.paymentItem}>
                    <span>-</span>
                    <span>&#8377;</span> {o.discount}
                  </p>
                </div>
              )
          )}
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
      <OrderSlideButton onSlideComplete={placeOrder} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: clone(state.cart),
  offers: clone(state.restaurant.offers),
  charges: clone(state.restaurant.settings.charges),
  common: clone(state.common),
});

export default connect(mapStateToProps)(Cart);
