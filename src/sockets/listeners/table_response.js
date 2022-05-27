const { MESSAGE_TYPE } = require("../../enums/messages");
const SKT_EVENT = require("../constants/events");
const tableResponseHandler =
  require("./handlers/table_response_handlers").default;
const listen = (socket) => {
  socket.on(SKT_EVENT.TAB_RES, (msg) => {
    try {
      if (msg?.type && msg.type === MESSAGE_TYPE.RESPONSE_MESSAGE) {
        tableResponseHandler.handle(msg.payload);
      } else {
        // Add Alerts
      }
    } catch (err) {}
  });
};

module.exports = { listen };