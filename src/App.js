import { useState } from "react";
import { BookRepo } from "./data/book_repo";
import { DragApp } from "./data/test_comp";
import Cart from "./pages/cart/Cart";
import Menu from "./pages/menu/Menu";

const App = () => {
  const [m_switch, setSwitch] = useState(true);

  const checkOut = () => {
    setSwitch(false);
  };

  const goBack = () => {
    setSwitch(true);
  };

  return (
    <div className="App">
      {m_switch ? <Menu checkOut={checkOut} /> : <Cart goBack={goBack} />}
    </div>
  );
};

export default App;
