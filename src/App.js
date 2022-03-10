import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { loadRestaurant } from "./redux/actions/restaurant";
import Routes from "./routing/Routes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurant());
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
