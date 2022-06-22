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
export const initSockets = (dispatch) => {
  const client = io.connect("http://localhost:5001", {
    reconnection: true,
    reconnectionDelay: 3000,
    reconnectionAttempts: 10000,
    forceNew: false,
  });

  getDispatcher = () => dispatch;
  initSktListeners.init(client);
  initSktEmitters.init(client);

  return client;
};
