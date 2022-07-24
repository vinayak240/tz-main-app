import { getDispatcher } from "../..";
import { TABLE_STATUS } from "../../../enums/table_status";
import {
  checkoutDone,
  passcodeInvalid,
  tableActive,
  tableError,
  tableFree,
  tableNotFound,
  tableOccupied,
  tableRejected,
  tableUnavailable,
} from "../../../redux/actions/table";
import store from "../../../redux/store";

const handle = (tableRes, dispatch) => {
  const { status } = tableRes;
  dispatch = store.dispatch;

  if (!Boolean(dispatch)) {
    return;
  }

  // Create separate Redux Action Method for each Statuses
  switch (status) {
    case TABLE_STATUS.TABLE_ACTIVE:
      dispatch(tableActive(tableRes));
      return;
    case TABLE_STATUS.TABLE_OCCUPIED:
      dispatch(tableOccupied(tableRes));
      return;
    case TABLE_STATUS.TABLE_NOT_FOUND:
      dispatch(tableNotFound(tableRes));
      return;
    case TABLE_STATUS.TABLE_UNAVAILABLE:
      dispatch(tableUnavailable(tableRes));
      return;
    case TABLE_STATUS.PASSCODE_INVALID:
      dispatch(passcodeInvalid(tableRes));
      return;
    case TABLE_STATUS.TABLE_REJECTED:
      dispatch(tableRejected(tableRes));
      return;
    case TABLE_STATUS.REQUEST_ERROR:
      dispatch(tableError());
      return;
    case TABLE_STATUS.TABLE_CHECKOUT_DONE:
      dispatch(checkoutDone(tableRes));
      return;
    case TABLE_STATUS.TABLE_CHECKOUT_REJECTED:
      dispatch(checkoutDone(tableRes));
      return;
    case TABLE_STATUS.TABLE_FREE:
      dispatch(tableFree(tableRes));
      return;
    default:
      return;
  }
};

export default { handle };
