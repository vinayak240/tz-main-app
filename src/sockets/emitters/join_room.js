const { emitter } = require(".");
const EMTR_EVENT = require("../constants/emitter_events");
const SKT_EVENT = require("../constants/events");

const emit = async (joinReq) => {
  try {
    console.log("JOIN ME");
    emitter.emit(EMTR_EVENT.SEND_MSG, SKT_EVENT.JOIN_REST_ROOM, joinReq);
    localStorage.setItem(
      "JOIN_INFO",
      JSON.stringify({
        ...joinReq,
        flag: true,
      })
    );
  } catch (err) {
    console.error("Not able to join the user err: " + err);
  }
};

module.exports = {
  /**
   * @summary Emits join request to the server to join room and receive updates
   * @param {any} joinReq
   */
  emitJoinRoom: emit,
};
