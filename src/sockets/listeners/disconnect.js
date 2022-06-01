const { SportsHockeyRounded } = require("@material-ui/icons");
const SKT_EVENT = require("../constants/events");

const listen = (socket) => {
  socket.on(SKT_EVENT.DISCONNECT, () => {
    try {
      console.log("DISCONNECTED");
      // socket.disconnect();
      // Remove all Listeners here (PLEASE REPEAT THIS STEP FOR SERVER SIDE AS WELL)
      socket.removeAllListeners();
    } catch (err) {}
  });
};

module.exports = { listen };
