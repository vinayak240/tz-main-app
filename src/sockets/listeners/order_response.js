const SKT_EVENT = require("../constants/events");
const orderResponseHandler =
  require("./handlers/order_response_handlers").default;

const listen = (socket) => {
  socket.on(SKT_EVENT.ODR_RES, (msg) => {
    try {
      if (msg?.type && msg.type === MESSAGE_TYPE.RESPONSE_MESSAGE) {
        orderResponseHandler.handle(msg.payload);
      } else {
        // Add Alerts
      }
    } catch (err) {}
  });
};

module.exports = { listen };
