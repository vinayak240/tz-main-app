import { getDispatcher } from "../..";
import { TABLE_STATUS } from "../../../enums/table_status";
import {
  checkoutDone,
  passcodeInvalid,
  tableActive,
  tableOccupied,
  tableRejected,
} from "../../../redux/actions/table";

const handle = (tableRes) => {
  const { status } = tableRes;
  const dispatch = Boolean(getDispatcher) || getDispatcher();

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
    case TABLE_STATUS.PASSCODE_INVALID:
      dispatch(passcodeInvalid(tableRes));
      return;
    case TABLE_STATUS.TABLE_REJECTED:
      dispatch(tableRejected(tableRes));
      return;
    case TABLE_STATUS.TABLE_CHECKOUT_DONE:
      dispatch(checkoutDone(tableRes));
      return;
    default:
      return;
  }
};

export default { handle };
