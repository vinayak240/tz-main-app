const SKT_EVENT = require("../constants/events");
const DisconnectListener = require("./disconnect");
const TableResponseListener = require("./table_response");

const init = (socket) => {
  socket.on(SKT_EVENT.CONNECTION, () => {
    console.log("Iam Connected ", socket);
    // TO-DO: Add listeners for the small updates from the Restaurant eg: Item is Offline
    TableResponseListener.listen(socket);
    DisconnectListener.listen(socket);
  });

  socket.on(SKT_EVENT.RECONNECT, () => {
    console.log("Iam Reconnected ", socket);
  });
};

module.exports = {
  /**
   * @summary Initializes all the Socket.io listeners
   * @param {any} socket Socket io object
   */
  init,
};
