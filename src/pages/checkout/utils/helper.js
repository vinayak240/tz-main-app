import ORDER_STATUS from "../../../enums/order_status";

export function isOrderOngoing(order) {
  if (
    [
      ORDER_STATUS.SERVED,
      ORDER_STATUS.CLOSED,
      ORDER_STATUS.ORDER_REJECTED,
      ORDER_STATUS.CANCELLED,
    ].includes(order.status)
  ) {
    return false;
  }

  return true;
}
