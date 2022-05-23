const SKT_EVENT = require("../constants/events");
const DisconnectListener = require("./disconnect");
const TableResponseListener = require("./table_response");

const init = (io) => {
  io.on(SKT_EVENT.CONNECTION, (socket) => {
    // TO-DO: Add listeners for the small updates from the Restaurant eg: Item is Offline
    TableResponseListener.listen(socket);
    DisconnectListener.listen(socket);
  });
};

module.exports = {
  /**
   * @summary Initializes all the Socket.io listeners
   * @param {any} io Socket io object
   */
  init,
};
