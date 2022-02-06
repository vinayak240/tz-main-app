import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BookRepo } from "./data/book_repo";
import { DragApp } from "./data/test_comp";
import Cart from "./pages/cart/Cart";
import Menu from "./pages/menu/Menu";
import { loadRestaurant } from "./redux/actions/restaurant";

const App = () => {
  const [m_switch, setSwitch] = useState(true);
  const dispatch = useDispatch();

  const checkOut = () => {
    setSwitch(false);
  };

  const goBack = () => {
    setSwitch(true);
  };

  useEffect(() => {
    dispatch(loadRestaurant());
  }, []);

  return (
    <div className="App">
      {m_switch ? <Menu checkOut={checkOut} /> : <Cart goBack={goBack} />}
    </div>
  );
};

export default App;
