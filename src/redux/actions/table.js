import { clone } from "ramda";
import { v4 } from "uuid";
import ALERT_TYPES from "../../enums/alert_types";
import ITEM_STATUS from "../../enums/item_status";
import ORDER_STATUS from "../../enums/order_status";
import store from "../store";
import { setAlert } from "./alert";
import { PLACE_ORDER } from "./types";

export const placeOrder =
  ({ items, offers, totalCost, orderNum }) =>
  (dispatch) => {
    try {
      let user = store.getState()?.common?.user;
      let curDate = Date.now();
      let order = {
        _id: v4(), // TO BE REMOVED ONCE API INTEGRATED
        rest_id: store.getState()?.restaurant?.rest_id,
        table_id: "00", //TO-DO
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

      let table = store.getState()?.table;

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

      dispatch({
        type: PLACE_ORDER,
        payload: clone(table),
      });
    } catch (err) {
      setAlert("Error placing order..", ALERT_TYPES.ERROR);
    }
  };

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

//#endregion
