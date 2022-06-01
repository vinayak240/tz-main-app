/**
 * @summary All the defined Socket Events
 */
const SKT_EVENT = {
  CONNECTION: "connect",
  RECONNECT: "reconnect",
  DISCONNECT: "disconnect",
  PING_ID: "socket-id-os",
  PING_USER_ID: "user-id-os",
  /**
   * Event used to join a user to restaurant room
   */
  JOIN_REST_ROOM: "join-rest-room-os",
  /**
   * Event used to activate a user into the table
   */
  SYSTEM_CMD: "system-cmd-os",
  /**
   * Event used to send order request to - from
   */
  ODR_REQ: "order-request-os",
  /**
   * Event used to receive order response to - from [mostly used at OrderServ]
   */
  ODR_RES: "order-response-os",
  /**
   * Event used to receive order error messages from OdrServ[mostly used at OrderServ]
   */
  ODR_ERR: "order-error-os",
  /**
   * Event used to send table request to - from
   */
  TAB_REQ: "table-request-os",
  /**
   * Event used to send table response to - from [mostly used at OrderServ]
   */
  TAB_RES: "table-response-os",
  /**
   * Event used to receive table error messages from OdrServ[mostly used at OrderServ]
   */
  TAB_ERR: "table-error-os",
};

module.exports = SKT_EVENT;
