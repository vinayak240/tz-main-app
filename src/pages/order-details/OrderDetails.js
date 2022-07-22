import React, { useEffect, useState } from "react";
import PulseLoader from "./assets/PulseLoader";
import OrderAppBar from "./components/OrderAppBar";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import { Button, Collapse } from "@material-ui/core";
import Item from "./components/Item";
import useItemStyles from "../../pages/menu/styles/main";
import useStyles from "./styles/main";
import VerticalStatusStepper from "./components/VerticalStatusStepper";
import { connect } from "react-redux";
import { clone } from "ramda";
import { useNavigate, useParams } from "react-router-dom";
import { isObjEmpty } from "../../utils/helpers";
import LoadingPage from "../../layouts/pages/LoadingPage";
import {
  getCorrespondingHexCode,
  getOrderStatusLabels,
  getStatusIndfoMap,
} from "./utils/helper";
import { getChargesMap, round } from "../cart/utils/helpers";
import ITEM_STATUS from "../../enums/item_status";
import OrderDetailsSkeleton from "./skeletons/OrderDetailsSkeleton";
import { API_TYPES } from "../../enums/api_status";
import store from "../../redux/store";
import { refreshOrder } from "../../redux/actions/table";

// Get current order id from route params
function OrderDetails(props) {
  const itmClasses = useItemStyles();
  const classes = useStyles();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [state, setState] = useState({
    f_view_all: false,
    f_view_stepper: false,
    cur_order: null,
  });

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [statusMap, setMap] = useState({});
  const [curStatusInfo, setCurInfo] = useState({});

  const viewPortSize = 2;

  const toggleItemListView = () => {
    setState({
      ...state,
      f_view_all: !state.f_view_all,
    });
  };

  const toggleStepperView = () => {
    setState({
      ...state,
      f_view_stepper: !state.f_view_stepper,
    });
  };

  const getListForViewPort = (list) => {
    return list.slice(0, viewPortSize);
  };

  const getCurrentOrder = () => {
    // Here if cant find do a API call..
    let m_order = props.orders?.find(
      (o) =>
        o?._id === orderId ||
        (o.meta?.user?._id === props.common?.user?._id &&
          String(o.meta?.order_num) === orderId)
    );

    if (!isObjEmpty(m_order)) {
      setOrder(m_order);
      setItems(getAllItems(m_order));
      setMap(getStatusIndfoMap(m_order));
      setCurInfo(getOrderStatusLabels(m_order?.status));

      return true;
    }

    return false;
  };

  const getAllItems = (order) => {
    let items = [];

    if (Boolean(order?.items?.length > 0)) {
      items = [...order?.items];
    }

    if (Boolean(order?.rejected_items?.length > 0)) {
      items = [...items, ...order?.rejected_items];
    }

    return items;
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let flag = getCurrentOrder();
    if (!flag && !Boolean(props?.common?.loaders?.[API_TYPES.ORDER_DETAILS])) {
      store.dispatch(refreshOrder(orderId));
    }
  }, [JSON.stringify(props?.orders)]);

  const getTotalDiscount = () => {
    return order?.offers?.reduce((tot, o) => Number(o.discount) + tot, 0);
  };

  const getItemsTotal = () => {
    return getActiveItems()?.reduce(
      (tot, i) =>
        Number(i.type === "package" ? i.package_price : i.item_price) + tot,
      0
    );
  };

  const getActiveItems = () => {
    return order?.items.filter(
      (i) =>
        ![ITEM_STATUS.UNAVAILABLE, ITEM_STATUS.CANCELLED].includes(i?.status)
    );
  };

  const getSingularItems = (items) => {
    let n_items = [];

    items.forEach((item) => {
      item.versions.forEach((v) => {
        let newItem = {
          ...item,
          versions: [v],
          itemCount: v.itemCount,
        };
        n_items.push(newItem);
      });
    });

    return n_items;
  };

  const getChargesTotal = () => {
    return getChargesMap(
      props.charges.filter((chr) => chr?.scope === "order"),
      Number(getItemsTotal())
    ).reduce((c_total, chr) => c_total + chr.total, 0);
  };

  const getTotal = () => {
    let discount = getTotalDiscount();
    let chargeTotal = getChargesTotal();
    return round(Number(getItemsTotal()) - discount + chargeTotal, 1);
  };

  return Boolean(props?.common?.loaders?.[API_TYPES.ORDER_DETAILS]) ||
    isObjEmpty(order) ? (
    <OrderDetailsSkeleton />
  ) : (
    <div
      style={{
        background: "#efeff3",
        height: "100vh",
      }}
    >
      <OrderAppBar
        goBack={goBack}
        n_items={order.items.length}
        order_num={order?.meta?.order_num || order.order_no}
        total={order.total_price}
      />
      <div
        style={{
          background: "#ffffff",
          paddingTop: "15px",
        }}
      >
        <div
          style={{
            border: "1px solid lightgray",
            padding: "10px",
            borderRadius: "6px",
            margin: "15px",
            marginTop: "0px",
          }}
        >
          <div>
            <div
              onClick={toggleStepperView}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PulseLoader
                  style={{
                    backgroundColor: getCorrespondingHexCode(
                      curStatusInfo.color
                    ),
                    width: "30px",
                    height: "30px",
                  }}
                />
                <p
                  style={{
                    marginLeft: "6px",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    fontFamily: "'Proxima Nova'",
                    margin: "0 6px",
                  }}
                >
                  {curStatusInfo.short_label}{" "}
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#3e3c3d",
                      fontWeight: "300",
                    }}
                  >
                    (@{" "}
                    {new Date(order.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    )
                  </span>
                </p>
              </div>
              <div>
                {!state.f_view_stepper ? (
                  <ExpandMoreRoundedIcon />
                ) : (
                  <ExpandLessRoundedIcon />
                )}
              </div>
            </div>
            <Collapse in={state.f_view_stepper}>
              <div>
                <VerticalStatusStepper statusMap={statusMap} />
              </div>
            </Collapse>
          </div>
          <div
            style={{
              marginTop: "12px",
              display: "flex",
              alignItems: "flex-end",
              fontSize: "0.95rem",
              fontWeight: "500",
              fontFamily: "'Proxima Nova'",
              padding: "6px",
              borderTop: "1px solid #b8b5b5",
            }}
          >
            <LocationOnOutlinedIcon style={{ width: "18px" }} /> Table #
            {props.table_no}
          </div>
        </div>
        <div>
          <div
            style={{
              backgroundColor: "#efeff3",
              padding: "15px",
              fontFamily: "'Proxima Nova'",
              fontWeight: "500",
            }}
          >
            Item Details
          </div>
          <div
            style={{
              paddingTop: "14px",
            }}
          >
            {(state.f_view_all
              ? getSingularItems(items)
              : getListForViewPort(getSingularItems(items))
            ).map((item, idx, arr) => (
              <div key={item._id}>
                <Item idx={idx} item={item} />
                {arr.length !== idx + 1 && (
                  <hr
                    style={{
                      borderWidth: "1.5px",
                      margin: "6px 0px 5px",
                    }}
                    className={itmClasses.dottedSeperator}
                  ></hr>
                )}
              </div>
            ))}
            {order.items.length > viewPortSize && (
              <div style={{ textAlign: "center" }}>
                <Button
                  style={{
                    textTransform: "capitalize",
                    color: "#FC8019",
                    fontFamily: "'Proxima Nova'",
                  }}
                  onClick={toggleItemListView}
                >
                  {" "}
                  {state.f_view_all ? "View less" : `View All`}
                </Button>
              </div>
            )}
          </div>
        </div>
        <div>
          <div
            style={{
              backgroundColor: "#efeff3",
              padding: "15px",
              fontFamily: "'Proxima Nova'",
              fontWeight: "500",
            }}
          >
            Amount Details
          </div>
          <div style={{ padding: "15px" }}>
            <div className={classes.paymentItemCtnr}>
              <p className={classes.paymentItem}>Items Total</p>
              <p className={classes.paymentItem}>
                <span>&#8377;</span> {getItemsTotal()}
              </p>
            </div>
            <div
              style={{ color: "#03a103" }}
              className={classes.paymentItemCtnr}
            >
              <p className={classes.paymentItem}>Total Discount</p>
              <p className={classes.paymentItem}>
                -<span>&#8377;</span> {getTotalDiscount()}
              </p>
            </div>
            <div className={classes.paymentItemCtnr}>
              <p className={classes.paymentItem}>Additional Charges</p>
              <p className={classes.paymentItem}>
                <span>&#8377;</span> {getChargesTotal()}
              </p>
            </div>
            <div className={classes.borderedSeparator}></div>
            <div style={{ margin: "0px" }} className={classes.paymentItemCtnr}>
              <p className={classes.totalMnText}>Order Total</p>
              <p className={classes.totalMnText}>
                <span>&#8377;</span> {getTotal()}
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#efeff3",
            height: "137px",
          }}
        ></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  orders: clone(state.table?.orders),
  common: clone(state.common),
  charges: clone(state.restaurant?.settings?.charges),
  table_no: state.table?.table_id,
});

export default connect(mapStateToProps)(OrderDetails);
