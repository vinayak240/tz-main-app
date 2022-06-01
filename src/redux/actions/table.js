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
import SESSION_STATUS from "../../enums/session_status";
import { requestTable as requestTableApi } from "../../apis/table_api";
import tableResponseHandlers from "../../sockets/listeners/handlers/table_response_handlers";
import { setCookie } from "../../utils/cookies";
import { emitJoinRoom } from "../../sockets/emitters/join_room";
/**
 * Request for the table in 2 flows
 * 1 - flow [QR] - the link will contain restaurant ID and Table ID direct request is created
 * 2 - flow [search ID] - this will contain only the Table Search Code
 * Using that we will get Rest ID and Table ID and follow 1st flow
 */
export const requestTable = (query) => async (dispatch) => {
  let table;

  let tableReq = { ...query, status: TABLE_STATUS.TABLE_REQUEST };
  let response = await requestTableApi(tableReq);
  if (!Boolean(response)) {
    dispatch(tableError());
    return;
  }
  if (
    !response?.success ||
    response.payload?.status !== TABLE_STATUS.TABLE_REQUESTED
  ) {
    tableResponseHandlers.handle(response.payload, dispatch);
    if (response?.success) {
      table = response.payload?.table;
      emitJoinRoom({
        table_id: table?._id,
        rest_id: table?.restaurant_id,
        user_id: response?.payload?.user?._id,
      });
    }
    return;
  }
  table = response.payload?.table;

  console.log(response);

  emitJoinRoom({
    table_id: table?._id,
    rest_id: table?.restaurant_id,
    user_id: response?.payload?.user?._id,
  });

  // setTimeout(
  //   () =>
  dispatch({
    type: INIT_TABLE,
    payload: {
      tabm_id: table?._id,
      table_id: table?.table_id,
      restaurant_id: table?.restaurant_id,
      session: { status: SESSION_STATUS.NEW, token: null }, //Contains all the order, table session
      orders: [],
      offers: [], // these offers will added when the final bill is paid...
      totalCost: 0,
      status: TABLE_STATUS.TABLE_REQUESTED,
      user: response?.user,
    },
  });
  //   2000
  // );
};

/**
 * To be called whne we get reply from the sockets that the users table request has been accepted
 */
export const bootstrap = (payload) => (dispatch) => {
  // TO-DO : CALL API {GET Restaurant and all other things}; API CALL to set cookie

  setCookie("_session_token_", payload?.session?.session_token, 1);

  dispatch(setUser(null));

  dispatch(loadRestaurant(payload?.table?.restaurant_id));

  dispatch(iniCart());

  dispatch({
    type: UPDATE_TABLE,
    payload: {
      table_id: payload?.table?.table_id,
      session: {
        token: payload?.session?.session_token,
        passcode: payload?.session?.passcode,
        status: SESSION_STATUS.ACTIVE,
      }, //Contains all the order, table session
      status: TABLE_STATUS.TABLE_ACTIVE,
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

export const setTableStatus = (status) => (dispatch) => {
  dispatch({
    type: SET_TABLE_STATUS,
    payload: status,
  });
};

//#endregion

//#region Table Status Actions

export const tableActive = (payload) => (dispatch) => {
  dispatch(bootstrap(payload));
};

export const tableOccupied = (payload) => (dispatch) => {
  const session = store.getState().table.session;
  dispatch({
    type: UPDATE_TABLE,
    payload: {
      table_id: payload?.table_id,
      status: TABLE_STATUS.TABLE_OCCUPIED,
      session: { ...session, status: SESSION_STATUS.NEW },
      orders: [],
      offers: [],
      totalCost: 0,
    },
  });
};

export const passcodeInvalid = (payload) => (dispatch) => {
  const session = store.getState().table.session;
  dispatch({
    type: UPDATE_TABLE,
    payload: {
      table_id: payload?.table_id,
      status: TABLE_STATUS.PASSCODE_INVALID,
      session: { ...session, status: SESSION_STATUS.REJECTED },
      orders: [],
      offers: [],
      totalCost: 0,
    },
  });
};

export const tableRejected = (payload) => (dispatch) => {
  const session = store.getState().table.session;
  dispatch({
    type: UPDATE_TABLE,
    payload: {
      table_id: payload?.table_id,
      status: TABLE_STATUS.TABLE_REJECTED,
      session: { ...session, status: SESSION_STATUS.REJECTED },
      orders: [],
      offers: [],
      totalCost: 0,
    },
  });
};

export const tableError = () => (dispatch) => {
  const session = store.getState().table.session;
  dispatch({
    type: UPDATE_TABLE,
    payload: {
      status: TABLE_STATUS.REQUEST_ERROR,
      session: { ...session, status: SESSION_STATUS.ANAMOLY },
    },
  });
};

export const tableNotFound = () => (dispatch) => {
  const session = store.getState().table.session;
  dispatch({
    type: UPDATE_TABLE,
    payload: {
      status: TABLE_STATUS.TABLE_NOT_FOUND,
      session: { ...session, status: SESSION_STATUS.ANAMOLY },
    },
  });
};

export const checkoutDone = (payload) => (dispatch) => {
  const session = store.getState().table.session;
  dispatch({
    type: UPDATE_TABLE,
    payload: {
      status: TABLE_STATUS.TABLE_CHECKOUT_DONE,
      session: { ...session, status: SESSION_STATUS.CLOSED },
    },
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

//#endregion
