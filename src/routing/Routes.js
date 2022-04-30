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
import CheckOut from "../pages/checkout/CheckOut";
import TableRequest from "../pages/table-request/TableRequest";
import TableLoading from "../pages/table-request/components/TableLoading";
import { TABLE_STATUS } from "../enums/table_status";

const Routes = (props) => {
  return (
    <section className="container">
      <Switch>
        <Route path="/" element={<SplashScreen />} />

        <Route path="/table">
          <Route
            index={false}
            path="request"
            element={
              props.common?.loading ? (
                <LoadingPage /> // Replace this with skeletons
              ) : (
                <TableRequest />
              )
            }
          />
          <Route
            index={false}
            path="load"
            element={
              props.common?.loading ? (
                <LoadingPage /> // Replace this with skeletons
              ) : (
                <TableLoading />
              )
            }
          />
        </Route>

        <Route path="/restaurant">
          <Route
            index={false}
            path="menu"
            element={
              ![
                TABLE_STATUS.TABLE_ACCEPTED,
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
              ].includes(props.table?.status) ? (
                <Navigate to="/table/request" replace={true} />
              ) : props.common?.loading || isObjEmpty(props.restaurant) ? (
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
              ![
                TABLE_STATUS.TABLE_ACCEPTED,
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
              ].includes(props.table?.status) ? (
                <Navigate to="/table/request" replace={true} />
              ) : props.common?.loading ? (
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
              ![
                TABLE_STATUS.TABLE_ACCEPTED,
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
              ].includes(props.table?.status) ? (
                <Navigate to="/table/request" replace={true} />
              ) : props.common?.loading ? (
                <LoadingPage /> // Replace this with skeletons
              ) : isObjEmpty(props.table?.orders) ? (
                <Navigate to="/restaurant/menu" replace={true} />
              ) : (
                <OrderDetails />
              )
            }
          />
          <Route
            index={false}
            path="orders"
            element={
              ![
                TABLE_STATUS.TABLE_ACCEPTED,
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
              ].includes(props.table?.status) ? (
                <Navigate to="/table/request" replace={true} />
              ) : props.common?.loading ? (
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
              ![
                TABLE_STATUS.TABLE_ACCEPTED,
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
              ].includes(props.table?.status) ? (
                <Navigate to="/table/request" replace={true} />
              ) : props.common?.loading ? (
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
