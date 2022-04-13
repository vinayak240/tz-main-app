import { Fragment, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routing/Routes";

const App = () => {
  // Here pass the dispatch obj to the Socket Listeners
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
