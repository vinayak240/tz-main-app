import { clone, set } from "ramda";
import { getChargesMap, round } from "../cart/utils/helpers";
import OffersPage from "../cart/components/OffersPage";
import DialogTransition from "../menu/shared/DialogTransition";
import { processOffer, isOfferApplicable } from "../cart/utils/offers";
import MsgOfferIcon from "../cart/assets/MsgOfferIcon";
import React, { Fragment, useEffect, useState } from "react";
import CheckOutAppBar from "./components/CheckOutAppBar";
import Order from "./components/Order";
import useCartStyles from "../cart/styles/main";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import OfferIcon from "../../layouts/components/OfferIcon";
import { isObjEmpty } from "../../utils/helpers";
import { connect, useDispatch } from "react-redux";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@material-ui/core";
import PaperComponent from "../cart/shared/PaperComponent";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { applyOfferOnTable, removeOffers } from "../../redux/actions/table";
import { BottomActionsArea } from "./components/BottomActionsArea";
import EmptyList from "./components/EmptyList";
import { isOrderOngoing } from "./utils/helper";

function CheckOut(props) {
  const cartClasses = useCartStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    infoX: 0,
    infoY: 0,
    is_open: false,
    f_offer_page: false,
    f_offer_msg: false,
    infolist: [],
    infoHead: "",
  });
  const [curOffer, setCurOffer] = useState({
    is_applied: false,
    code: "",
    discount: 0,
  });

  const { orders } = props.table;

  const handleDialogOpen = (flagName) => {
    setState((prevState) => ({
      ...prevState,
      [flagName]: true,
    }));
  };

  const handleDialogClose = (flagName) => {
    setState((prevState) => ({
      ...prevState,
      [flagName]: false,
    }));
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

  const getAppliedOffer = () => {
    return props.table.offers.find((o) => o.type === "applied");
  };

  const removeOffer = () => {
    let curOffer = getAppliedOffer();
    dispatch(removeOffers([curOffer.offer_id]));
  };

  const applyOffer = (offer) => {
    if (isOfferApplicable(offer, props.table)) {
      let discountedValue = processOffer(offer, props.table);
      dispatch(applyOfferOnTable(discountedValue, offer));
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

  const goBack = () => {
    window.history.back();
  };

  const getTotal = () => {
    let chargeTotal = getChargesMap(
      props.charges?.filter((chr) => chr?.scope === "total"),
      props.table.totalCost
    ).reduce((c_total, chr) => c_total + chr.total, 0);

    let discount = props.table.offers.reduce(
      (tot, o) => (o.is_applicable ? tot + o.discount : tot),
      0
    );

    return round(props.table.totalCost + chargeTotal - discount, 1);
  };

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
    <div
      style={{
        background: "#f2f2f2",
        height: "100vh",
        paddingBottom: "150px",
      }}
    >
      <CheckOutAppBar
        goBack={goBack}
        total={orders?.length > 0 ? getTotal() : 0}
        n_orders={orders.length}
        table_id={props.table?.table_id}
      />
      {Boolean(orders) && orders?.length > 0 ? (
        <div
          style={{
            paddingBottom: "150px",
            backgroundColor: "rgb(242, 242, 242)",
          }}
        >
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
                    color: curOffer.is_applied ? "green" : "#ab0404",
                    textTransform: "none",
                  }}
                >
                  {curOffer.is_applied ? "Ok, Great!" : "Ok!"}
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
                offers={props.offers.filter((o) => o.scope === "total")}
                applyOffer={applyOffer}
                cart={props.table}
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
                <div className={cartClasses.paymentItemCtnr}>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 400,
                      fontFamily: "'Proxima Nova'",
                      color: "#686f78",
                      margin: "0px",
                    }}
                    className={cartClasses.paymentItem}
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
                    className={cartClasses.paymentItem}
                  >
                    <span>&#8377;</span> {chr.total}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              background: "#ffffff",
              paddingBottom: "5px",
            }}
          >
            <div>
              <Typography
                style={{
                  fontSize: "1rem",
                  fontFamily: '"Proxima Nova"',
                  fontWeight: "500",
                  paddingTop: "6px",
                  textDecoration: "underline",
                  textAlign: "center",
                  marginBottom: "-10px",
                }}
              >
                Orders
              </Typography>

              <div style={{ margin: "4px" }}>
                {orders.map((o, idx, arr) => (
                  <div key={idx}>
                    <Order
                      idx={idx}
                      order={o}
                      charges={props.charges.filter(
                        (chr) => chr?.scope === "order"
                      )}
                    />
                    {idx + 1 !== arr.length && (
                      <hr
                        style={{
                          border: "none",
                          borderBottom: "1px solid #aaa5a5",
                          width: "95.5%",
                          margin: "0px auto",
                          marginBottom: "-7px",
                          marginTop: "-3px",
                        }}
                      ></hr>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Paper className={cartClasses.offerCtnr} elevation={0}>
              <div>
                <p className={cartClasses.offerMnText}>Offers</p>
                {isObjEmpty(getAppliedOffer()) ? (
                  <ButtonBase style={{ display: "block", width: "100%" }}>
                    <p
                      onClick={() => handleDialogOpen("f_offer_page")}
                      className={cartClasses.offerLtText}
                    >
                      <OfferIcon
                        style={{ width: "20px", marginRight: "6px" }}
                      />
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
          </div>
          <div style={{ marginTop: "10px" }}>
            <Paper className={cartClasses.paymentsCtnr} elevation={0}>
              <p className={cartClasses.offerMnText}>Bill Details</p>
              <div className={cartClasses.paymentItemCtnr}>
                <p className={cartClasses.paymentItem}>Orders Total</p>
                <p className={cartClasses.paymentItem}>
                  <span>&#8377;</span> {round(props.table.totalCost, 2)}
                </p>
              </div>
              {props.table.offers.length > 0 &&
                props.table.offers.map(
                  (o) =>
                    o.is_applicable && (
                      <div
                        style={{ color: "#03a103" }}
                        className={cartClasses.paymentItemCtnr}
                      >
                        <p className={cartClasses.paymentItem}>
                          {o.label_text}
                        </p>
                        <p className={cartClasses.paymentItem}>
                          <span>-</span>
                          <span>&#8377;</span> {o.discount}
                        </p>
                      </div>
                    )
                )}
              {getChargesMap(
                props.charges.filter((chr) => chr?.scope === "total"),
                props.table.totalCost
              ).map((chr) => (
                <div className={cartClasses.paymentItemCtnr}>
                  <p className={cartClasses.paymentItem}>
                    {chr.text}
                    {chr.sub_charges.length > 0 && (
                      <InfoOutlinedIcon
                        onClick={(evt) =>
                          handleInfoOpen(evt, chr.sub_charges, chr.text)
                        }
                        className={cartClasses.infoIcon}
                      />
                    )}
                  </p>
                  <p className={cartClasses.paymentItem}>
                    <span>&#8377;</span> {chr.total}
                  </p>
                </div>
              ))}
              <div className={cartClasses.borderedSeparator}></div>
              <div
                style={{ margin: "0px" }}
                className={cartClasses.paymentItemCtnr}
              >
                <p
                  /*style={{ fontSize: "0.85rem" }}*/ className={
                    cartClasses.offerMnText
                  }
                >
                  Bill Total
                </p>
                <p
                  /*style={{ fontSize: "0.85rem" }}*/ className={
                    cartClasses.offerMnText
                  }
                >
                  <span>&#8377;</span> {getTotal()}
                </p>
              </div>
            </Paper>
          </div>
          <BottomActionsArea
            total={getTotal()}
            isOngoing={orders.some((o) => isOrderOngoing(o))}
          />
          <div
            style={{
              height: "50px",
              background: "#f2f2f2",
            }}
          ></div>
        </div>
      ) : (
        <EmptyList />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  table: clone(state.table),
  offers: clone(state.restaurant?.offers),
  charges: clone(state.restaurant?.settings?.charges),
  common: clone(state.common),
});

export default connect(mapStateToProps)(CheckOut);
