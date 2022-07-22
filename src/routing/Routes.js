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
import ErrorBoundary from "../pages/table-request/components/ErrorBoundry";
import Table from "../pages/table/Table";
import Notifications from "../pages/notifications/Notifications";
import CheckOutRequest from "../pages/checkout/components/CheckOutRequest";
import MenuSkeleton from "../pages/menu/skeletons/MenuSkeleton";
import TableSkeleton from "../pages/table/skeletons/TableSkeleton";
import OrdersSkeleton from "../pages/orders/skeletons/OrdersSkeleton";
import OrderDetailsSkeleton from "../pages/order-details/skeletons/OrderDetailsSkeleton";
import NotificationSkeleton from "../pages/notifications/skeletons/NotificationSkeleton";
import ApiErrorBoundry from "../pages/shared/ApiErrorBoundry";
import { API_TYPES } from "../enums/api_status";
import Feedback from "../pages/checkout/components/Feedback";
import CheckoutSkeleton from "../pages/checkout/skeletons/CheckoutSkeleton";

const Routes = (props) => {
  return (
    <section className="container">
      <Switch>
        <Route path="/" element={<SplashScreen />} />

        <Route path="/table">
          <Route
            index={true}
            element={
              ![
                TABLE_STATUS.TABLE_REQUESTED,
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
                TABLE_STATUS.TABLE_CHECKOUT_DONE,
              ].includes(props.table?.status) ? (
                <Navigate to="/table/request" replace={true} />
              ) : (
                <ApiErrorBoundry
                  api_type={API_TYPES.TABLE}
                  skeleton={<TableSkeleton />}
                >
                  <Table />
                </ApiErrorBoundry>
              )
            }
          />

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
                <ErrorBoundary>
                  <TableLoading />
                </ErrorBoundary>
              )
            }
          />

          <Route
            index={false}
            path="notifications"
            element={
              ![
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
                TABLE_STATUS.TABLE_CHECKOUT_DONE,
              ].includes(props.table?.status) ? (
                <Navigate to="/table/request" replace={true} />
              ) : (
                <ApiErrorBoundry
                  api_type={API_TYPES.NOTIFICATION}
                  skeleton={<NotificationSkeleton />}
                >
                  <Notifications />
                </ApiErrorBoundry>
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
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
                TABLE_STATUS.TABLE_CHECKOUT_DONE,
              ].includes(props.table?.status) ? (
                <Navigate to="/table/request" replace={true} />
              ) : (
                <ApiErrorBoundry
                  api_type={API_TYPES.MENU}
                  skeleton={<MenuSkeleton />}
                >
                  <Menu />
                </ApiErrorBoundry>
              )
            }
          />
          <Route
            index={false}
            path="cart"
            element={
              ![
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
                TABLE_STATUS.TABLE_CHECKOUT_DONE,
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
            path="orders"
            element={
              ![
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
                TABLE_STATUS.TABLE_CHECKOUT_DONE,
              ].includes(props.table?.status) ? (
                <Navigate to="/table/request" replace={true} />
              ) : (
                <ApiErrorBoundry
                  api_type={API_TYPES.ORDERS}
                  skeleton={<OrdersSkeleton />}
                >
                  <Orders />
                </ApiErrorBoundry>
              )
            }
          />
          <Route
            index={false}
            path="orders/:orderId"
            element={
              ![
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
                TABLE_STATUS.TABLE_CHECKOUT_DONE,
              ].includes(props.table?.status) ? (
                <Navigate to="/table/request" replace={true} />
              ) : (
                <ApiErrorBoundry
                  api_type={API_TYPES.ORDER_DETAILS}
                  skeleton={<OrderDetailsSkeleton />}
                >
                  <OrderDetails />
                </ApiErrorBoundry>
              )
            }
          />
          <Route
            index={false}
            path="checkout"
            element={
              ![
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
                TABLE_STATUS.TABLE_CHECKOUT_DONE,
              ].includes(props.table?.status) ? (
                <Navigate to="/table/request" replace={true} />
              ) : props.common?.loading ? (
                <CheckoutSkeleton /> // Replace this with skeletons
              ) : (
                <ApiErrorBoundry
                  api_type={API_TYPES.CHECKOUT}
                  skeleton={<CheckoutSkeleton />}
                >
                  <CheckOut />
                </ApiErrorBoundry>
              )
            }
          />
          <Route
            index={false}
            path="checkout/request"
            element={
              ![
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
                TABLE_STATUS.TABLE_CHECKOUT_DONE,
              ].includes(props.table?.status) ? (
                <Navigate to="/restaurant/checkout" replace={true} />
              ) : props.common?.loading ? (
                <LoadingPage /> // Replace this with skeletons
              ) : (
                <CheckOutRequest />
              )
            }
          />
          <Route
            index={false}
            path="checkout/feedback"
            element={
              ![
                TABLE_STATUS.TABLE_ACTIVE,
                TABLE_STATUS.TABLE_CHECKOUT_REQUESTED,
                TABLE_STATUS.TABLE_CHECKOUT_DONE,
              ].includes(props.table?.status) ? (
                <Navigate to="/restaurant/checkout" replace={true} />
              ) : props.common?.loading ? (
                <LoadingPage /> // Replace this with skeletons
              ) : (
                <Feedback />
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
