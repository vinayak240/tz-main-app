import { initSockets } from "./sockets/index";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routing/Routes";
import { emitJoinRoom } from "./sockets/emitters/join_room";

const App = () => {
  let dispatch = useDispatch();

  // Here pass the dispatch obj to the Socket Listeners
  useEffect(() => {
    const socket = initSockets(dispatch);
    // setTimeout(() => {
    //   emitJoinRoom({
    //     rest_id: "626984ee3e6ec134b4e5f40e",
    //     table_id: "626984ed3e6ec134b4e5f40a",
    //     user_id: "6276b2f44d56a64c4c3f3674",
    //   });
    // }, 2000);

    return () => socket.disconnect();
  });
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
