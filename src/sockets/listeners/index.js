const { canRequestJoin } = require("../../utils/helpers");
const SKT_EVENT = require("../constants/events");
const join_room = require("../emitters/join_room");
const { emitJoinRoom } = require("../emitters/join_room");
const DisconnectListener = require("./disconnect");
const TableResponseListener = require("./table_response");
const OrderResponseListener = require("./order_response");

const init = (socket) => {
  socket.on(SKT_EVENT.CONNECTION, async () => {
    console.log("[SKT] CONNECTED", socket);

    // TO-DO: Add listeners for the small updates from the Restaurant eg: Item is Offline
    TableResponseListener.listen(socket);
    OrderResponseListener.listen(socket);
    DisconnectListener.listen(socket);

    console.log("JOIN FIRED");

    let joinInfo = JSON.parse(localStorage.getItem("JOIN_INFO"));
    if (canRequestJoin(joinInfo)) {
      console.log("JOINING");
      emitJoinRoom(joinInfo);
    }
  });
};

module.exports = {
  /**
   * @summary Initializes all the Socket.io listeners
   * @param {any} socket Socket io object
   */
  init,
};
