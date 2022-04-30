import { clone } from "ramda";
import { v4 } from "uuid";
import ALERT_TYPES from "../../enums/alert_types";
import ITEM_STATUS from "../../enums/item_status";
import ORDER_STATUS from "../../enums/order_status";
import { isOfferApplicable, processOffer } from "../../pages/cart/utils/offers";
import store from "../store";
import { setAlert } from "./alert";
import { setLoading, setUser, unSetLoading } from "./comman";
import {
  CLEAR_SESSION,
  INIT_TABLE,
  PLACE_ORDER,
  SET_TABLE_STATUS,
  UPDATE_TABLE,
} from "./types";
import { delay } from "../../utils/helpers";
import { iniCart, setCartStatus } from "./cart";
import CART_STATUS from "../../enums/cart_status";
import { TABLE_STATUS } from "../../enums/table_status";
import { loadRestaurant } from "./restaurant";

/**
 * Request for the table in 2 flows
 * 1 - flow [QR] - the link will contain restaurant ID and Table ID direct request is created
 * 2 - flow [search ID] - this will contain only the Table Search Code
 * Using that we will get Rest ID and Table ID and follow 1st flow
 */
export const requestTable = (query) => (dispatch) => {
  let table;
  if (query?.qr) {
    // use rest id and table id and directly request
    table = { table_id: "T00" };
  } else {
    // use search id -> (in Server - load table + request)
    table = { table_id: "T00" };
  }

  // TO-DO : CALL API

  setTimeout(
    () =>
      dispatch({
        type: INIT_TABLE,
        payload: {
          table_id: table.table_id,
          session: { token: null }, //Contains all the order, table session
          orders: [],
          offers: [], // these offers will added when the final bill is paid...
          totalCost: 0,
          status: TABLE_STATUS.TABLE_REQUESTED,
          // user: null,
        },
      }),
    2000
  );
};

/**
 * To be called whne we get reply from the sockets that the users table request has been accepted
 */
export const bootstrap = (table) => (dispatch) => {
  // TO-DO : CALL API {GET Restaurant and all other things}; API CALL to set cookie

  dispatch(setUser(null));

  dispatch(loadRestaurant(table.restaurant_id));

  dispatch(iniCart());

  dispatch({
    type: UPDATE_TABLE,
    payload: {
      session: { token: table.session_token }, //Contains all the order, table session
      status: TABLE_STATUS.TABLE_ACCEPTED,
      // user: null,
    },
  });
};

export const clearSession = () => (dispatch) => {
  dispatch({
    type: CLEAR_SESSION,
  });
};

export const placeOrder =
  ({ items, offers, totalCost, orderNum }) =>
  async (dispatch) => {
    try {
      dispatch(setCartStatus(CART_STATUS.PLACING));
      let table = store.getState()?.table;
      let user = store.getState()?.common?.user;
      let curDate = Date.now();
      let order = {
        _id: v4(), // TO BE REMOVED ONCE API INTEGRATED
        rest_id: store.getState()?.restaurant?.rest_id,
        table_id: table?.table_id, //TO-DO
        items: items,
        total_price: totalCost,
        session_id: "Dummy Session",
        offers: offers,
        status: ORDER_STATUS.NEW,
        meta: {
          user: { ...user },
          order_num: orderNum,
        },
        audit: [
          {
            status: ORDER_STATUS.NEW,
            updated: curDate,
            desc: `By ${user.user_name} at ${new Date(
              curDate
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })} on ${new Date(curDate).toLocaleDateString()}`,
          },
        ],
        date: curDate,
      };

      order.items = updateAllItemsStatus(order.items, ITEM_STATUS.NEW);

      //TO-DO: [API CALL] Do a post api call to place the order

      // await delay(1000);

      if (!Boolean(table)) {
        table = {
          orders: [order],
          offers: [],
          totalCost: 0,
        };
      } else {
        table.orders = [...table.orders, order];
        table.totalCost += Number(order.total_price);
      }

      table = reApplyAllOffers(table);

      dispatch({
        type: PLACE_ORDER,
        payload: clone(table),
      });

      setTimeout(() => dispatch(setCartStatus(CART_STATUS.PLACED)), 1000);

      return order; // this is the payload from the API call made
    } catch (err) {
      setAlert("Error placing order..", ALERT_TYPES.ERROR);
    }
  };

export const applyOfferOnTable = (discountedValue, offer) => (dispatch) => {
  let table = clone(store.getState().table);
  let applied_offer = {
    label_text: "Offer Discount",
    type: "applied",
    offer_id: offer?._id,
    discount: discountedValue,
    is_applicable: true,
    code: offer?.code,
  };

  table.offers = table.offers.filter((o) => o.type !== "applied");

  table.offers.push(applied_offer);

  dispatch({
    type: UPDATE_TABLE,
    payload: table,
  });
};

export const removeOffers = (offerIds) => (dispatch) => {
  let table = store.getState().table;

  table.offers = table.offers.filter((o) => !offerIds.includes(o.offer_id));

  dispatch({
    type: UPDATE_TABLE,
    payload: table,
  });
};

//#endregion

//#region Helper methods

export function getNextOrderNumber(userName) {
  let orders = store.getState()?.table.orders;

  return orders.filter((o) => o?.meta?.user?.user_name === userName).length + 1;
}

const updateAllItemsStatus = (items, status) => {
  return items.map((item) => {
    item.status = status;
    return item;
  });
};

const reApplyAllOffers = (table) => {
  // use is_applicale flag before place order/ After delete not applicable offers
  let restOffers = clone(store.getState().restaurant.offers);
  let appliedOffers = table.offers;
  if (appliedOffers?.length === 0) {
    return table;
  }
  let appIds = appliedOffers.map((o) => o.offer_id);
  let offers = restOffers.filter((o) => appIds.includes(o._id));
  let remIds = offers
    .filter((o) => !isOfferApplicable(o, table))
    .map((o) => o._id);

  console.log("Reapplying Offers");

  table.offers = table.offers.map((o) => {
    o.is_applicable = !remIds.includes(o.offer_id);

    if (o.is_applicable) {
      let offer = restOffers.find((off) => off._id === o.offer_id);
      let discount = processOffer(offer, table);
      o.discount = discount;
    }
    return o;
  });

  return table;
};

export const setTableStatus = (status) => (dispatch) => {
  dispatch({
    type: SET_TABLE_STATUS,
    payload: status,
  });
};

//#endregion
