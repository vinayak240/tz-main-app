import SKT_EVENT from "../constants/events";

const listen = (socket) => {
  socket.on(SKT_EVENT.SYSTEM_CMD, (data) => {
    try {
    } catch (err) {}
  });
};

module.exports = { listen };
