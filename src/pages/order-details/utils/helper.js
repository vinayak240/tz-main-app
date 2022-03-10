import { clone } from "ramda";
import ITEM_STATUS from "../../../enums/item_status";
import ORDER_STATUS from "../../../enums/order_status";
import { isObjEmpty } from "../../../utils/helpers";

export const getStatusIndfoMap = (order) => {
  if (isObjEmpty(order)) {
    return [];
  }

  let statusArr = [...order.audit];

  return clone(
    statusArr.map((st) => {
      let statusDetails = getOrderStatusLabels(st.status);

      return { ...st, ...statusDetails };
    })
  );
};

export const getOrderStatusLabels = (status) => {
  switch (status) {
    case ORDER_STATUS.NEW:
      return {
        short_label: "Requested", //To show the main status of order
        label: "Order Requeted", // Used to show status in the status stepper
        color: "blue", // color of the status pulse
      };
    case ORDER_STATUS.PLACED:
      return {
        short_label: "Placed",
        label: "Order Placed",
        color: "blue",
      };
    case ORDER_STATUS.ACCEPTED_PARTIALLY:
      return {
        short_label: "Accepted Partially",
        label: "Order Accepted Partially",
        color: "green",
      };
    case ORDER_STATUS.ORDER_ACCEPTED:
      return {
        short_label: "Accepted",
        label: "Order Accepted",
        color: "green",
      };

    case ORDER_STATUS.PREPARING:
      return {
        short_label: "Preparing",
        label: "Order Preparing",
        color: "blue",
      };
    case ORDER_STATUS.ORDER_REJECTED:
      return {
        short_label: "Rejected",
        label: "Order Rejected",
        color: "red",
      };

    default:
      return {
        short_label: "Not defined",
        label: "Not defined",
        color: "yellow",
      };
  }
};

export const getItemStatusLabels = (status) => {
  switch (status) {
    case ITEM_STATUS.NEW:
      return {
        short_label: "Requested", //To show the main status of order
        label: "Item Requested", // Used to show status in the status stepper
        color: "blue", // color of the status pulse
      };
    case ITEM_STATUS.PLACED:
      return {
        short_label: "Placed",
        label: "Item Placed",
        color: "blue",
      };
    case ITEM_STATUS.ACCEPTED:
      return {
        short_label: "Accepted",
        label: "Item Accepted",
        color: "green",
      };

    case ITEM_STATUS.PREPARING:
      return {
        short_label: "Preparing",
        label: "Item Preparing",
        color: "blue",
      };
    case ITEM_STATUS.CANCEL:
      return {
        short_label: "Cancel Requested",
        label: "Cancel Requested",
        color: "red",
      };

    case ITEM_STATUS.CANCELLED:
      return {
        short_label: "Cancelled",
        label: "Item Cancelled",
        color: "red",
      };

    default:
      return {
        short_label: "Not defined",
        label: "Not defined",
        color: "yellow",
      };
  }
};

export const getCorrespondingHexCode = (color) => {
  switch (color) {
    case "blue":
      return "rgb(67, 159, 236)";
    case "green":
      return "#059424";
    case "red":
      return "#d25858";
    default:
      return "rgb(219 213 15)";
  }
};
