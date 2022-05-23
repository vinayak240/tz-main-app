import initSktEmitters from "./emitters/";
import initSktListeners from "./listeners";
import io from "socket.io-client";

/**
 * Get the Redux's dispatcher object (NULLABLE)
 */
export let getDispatcher;

/**
 * @summary Initializes all the Socket.io listeners and emitters
 * @param {any} dispatch TO idspatch redux actions
 */
const init = (dispatch) => {
  const client = io.connect("http://localhost:5001", {
    forceNew: true,
  });

  getDispatcher = () => dispatch;
  initSktListeners.init(client, dispatch);
  initSktEmitters.init(client);
};

export default { init };
