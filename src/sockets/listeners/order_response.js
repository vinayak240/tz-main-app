const { MESSAGE_TYPE } = require("../../enums/messages");
const SKT_EVENT = require("../constants/events");
const orderResponseHandler =
  require("./handlers/order_response_handlers").default;

const listen = (socket) => {
  socket.on(SKT_EVENT.ODR_RES, (msg) => {
    try {
      if (msg?.type && msg.type === MESSAGE_TYPE.RESPONSE_MESSAGE) {
        console.log("Received a Order Response", msg);
        orderResponseHandler.handle(msg.payload);
      } else {
        // Add Alerts
      }
    } catch (err) {}
  });
};

module.exports = { listen };
