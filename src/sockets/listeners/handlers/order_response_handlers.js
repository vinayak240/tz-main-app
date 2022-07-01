import ORDER_STATUS from "../../../enums/order_status";
import { refreshOrder } from "../../../redux/actions/table";
import store from "../../../redux/store";

const handle = (orderRes) => {
  const { status } = orderRes;
  let dispatch = store.dispatch;

  if (!Boolean(dispatch)) {
    return;
  }

  // Create separate Redux Action Method for each Statuses
  switch (status) {
    // NEW
    case ORDER_STATUS.PREPARING:
      dispatch(refreshOrder(orderRes?._id));
      return;
    case ORDER_STATUS.ORDER_REJECTED:
      dispatch(refreshOrder(orderRes?._id));
      return;
    case ORDER_STATUS.ACCEPTED_PARTIALLY:
      dispatch(refreshOrder(orderRes?._id));
      return;
    // UPDATE
    case ORDER_STATUS.UPDATE_REJECTED:
      dispatch(refreshOrder(orderRes?._id));
      return;
    case ORDER_STATUS.UPDATED_PARTIALLY:
      dispatch(refreshOrder(orderRes?._id));
      return;
    case ORDER_STATUS.UPDATED:
      dispatch(refreshOrder(orderRes?._id));
      return;
    // CANCEL
    case ORDER_STATUS.CANCEL_REJECTED:
      dispatch(refreshOrder(orderRes?._id));
      return;
    case ORDER_STATUS.CANCELLED_PARTIALLY:
      dispatch(refreshOrder(orderRes?._id));
      return;
    case ORDER_STATUS.CANCELLED:
      dispatch(refreshOrder(orderRes?._id));
      return;

    default:
      return;
  }
};

export default { handle };
