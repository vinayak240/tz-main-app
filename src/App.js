import { initSockets } from "./sockets/index";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routing/Routes";

const App = () => {
  let dispatch = useDispatch();

  // Here pass the dispatch obj to the Socket Listeners
  useEffect(() => {
    const socket = initSockets(dispatch);

    const gracefulAppShutDown = () => {
      socket.disconnect();
    };

    window.addEventListener("beforeunload", gracefulAppShutDown);

    return () => {
      socket.disconnect();
      window.removeEventListener("beforeunload", gracefulAppShutDown);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Fragment>
          <Routes />
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
