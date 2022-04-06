/**
 * @summary All the defined Item Statuses
 */
const ITEM_STATUS = {
  NEW: "NEW",
  PLACED: "PLACED",
  ACCEPTED: "ACCEPTED",
  PREPARING: "PREPARING",

  CANCEL: "CANCEL", // manual
  CANCELLED: "CANCELLED", // manual only After ACCEPT from Rest
  UNAVAILABLE: "UNAVAILABLE", // manual only After ACCEPT from Rest

  SERVED: "SERVED", // manual
};

export default ITEM_STATUS;
