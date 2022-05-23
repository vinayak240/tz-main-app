const SKT_EVENT = require("../constants/events");

const listen = (socket) => {
  socket.on(SKT_EVENT.ODR_RES, (data) => {
    try {
    } catch (err) {}
  });
};

module.exports = { listen };
