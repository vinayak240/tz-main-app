const { SportsHockeyRounded } = require("@material-ui/icons");
const SKT_EVENT = require("../constants/events");

const listen = (socket) => {
  socket.on(SKT_EVENT.DISCONNECT, () => {
    try {
      console.log("[SKT] DISCONNECTED");

      // Remove all Listeners here (PLEASE REPEAT THIS STEP FOR SERVER SIDE AS WELL)
      socket.removeAllListeners(SKT_EVENT.ODR_RES);
      socket.removeAllListeners(SKT_EVENT.ODR_ERR);
      socket.removeAllListeners(SKT_EVENT.TAB_RES);
      socket.removeAllListeners(SKT_EVENT.TAB_ERR);
      socket.removeAllListeners(SKT_EVENT.SYSTEM_CMD);

      let joinInfo = localStorage.getItem("JOIN_INFO");
      if (Boolean(joinInfo)) {
        localStorage.setItem(
          "JOIN_INFO",
          JSON.stringify({
            ...JSON.parse(joinInfo),
            flag: false,
          })
        );
      }
    } catch (err) {}
  });
};

module.exports = { listen };
