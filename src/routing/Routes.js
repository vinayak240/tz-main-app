import React from "react";
import { Route, Routes as Switch, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import LoadingPage from "../layouts/pages/LoadingPage";
import { isObjEmpty } from "../utils/helpers";
import Menu from "../pages/menu/Menu";
import Cart from "../pages/cart/Cart";
import OrderDetails from "../pages/order-details/OrderDetails";
import SplashScreen from "../pages/SplashScreen";
import Orders from "../pages/orders/Orders";
import { CheckOut } from "../pages/checkout/CheckOut";

const Routes = (props) => {
  return (
    <section className="container">
      <Switch>
        <Route
          path="/"
          element={<Navigate to="/restaurant" replace={true} />}
        />
        <Route path="/restaurant">
          <Route index element={<SplashScreen />} />
          <Route
            index={false}
            path="menu"
            element={
              props.common?.loading || isObjEmpty(props.restaurant) ? (
                <LoadingPage /> // Replace this with skeletons
              ) : (
                <Menu />
              )
            }
          />
          <Route
            index={false}
            path="cart"
            element={
              props.common?.loading ? (
                <LoadingPage /> // Replace this with skeletons
              ) : isObjEmpty(props.cart?.items) ? (
                <Navigate to="/restaurant/menu" replace={true} />
              ) : (
                <Cart />
              )
            }
          />
          <Route
            index={false}
            path="orders/:orderId"
            element={
              props.common?.loading ? (
                <LoadingPage /> // Replace this with skeletons
              ) : isObjEmpty(props.table?.orders) ? (
                <Navigate to="/restaurant/cart" replace={true} />
              ) : (
                <OrderDetails />
              )
            }
          />
          <Route
            index={false}
            path="orders"
            element={
              props.common?.loading ? (
                <LoadingPage /> // Replace this with skeletons
              ) : (
                <Orders />
              )
            }
          />
          <Route
            index={false}
            path="checkout"
            element={
              props.common?.loading ? (
                <LoadingPage /> // Replace this with skeletons
              ) : (
                <CheckOut />
              )
            }
          />
        </Route>
      </Switch>
    </section>
  );
};

const mapStateToProps = (state) => ({
  table: state.table,
  restaurant: state.restaurant,
  cart: state.cart,
  common: state.common,
});

export default connect(mapStateToProps)(Routes);
