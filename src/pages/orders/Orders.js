import { ButtonBase } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyList from "./components/EmptyList";
import { Order } from "./components/Order";
import OrdersAppBar from "./components/OrdersAppBar";

function Orders(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    f_user: true,
  });
  const { orders } = props;

  const goBack = () => {
    window.history.back();
  };

  const setListFilter = (flag) => {
    setState({
      ...state,
      f_user: flag,
    });
  };

  const getOrdersList = () => {
    let userOrders = orders.filter(
      (o) => o?.meta?.user?.user_name === props.user
    );

    if (state.f_user) {
      return userOrders;
    }

    return orders;
  };

  const initOrdersList = () => {
    let userOrders = orders.filter(
      (o) => o?.meta?.user?.user_name === props.user
    );

    if (userOrders?.length > 0) {
      setState({
        ...state,
        f_user: true,
      });
      return;
    }

    setState({
      ...state,
      f_user: false,
    });
  };

  useEffect(() => {
    initOrdersList();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgb(237 237 240 / 70%)",
      }}
    >
      <OrdersAppBar
        filterFlag={state.f_user}
        goBack={goBack}
        setFilter={setListFilter}
      />
      {!Boolean(getOrdersList()) || getOrdersList().length === 0 ? (
        <EmptyList />
      ) : (
        <div style={{ backgroundColor: "white" }}>
          {getOrdersList().map((o, idx, arr) => (
            <div key={idx}>
              <ButtonBase
                onClick={() =>
                  navigate(
                    `/restaurant/orders/${
                      Boolean(o._id) ? o._id : o?.meta?.order_num
                    }`
                  )
                }
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <Order order={o} table_no={props.table_no || o.table_id} />
              </ButtonBase>
              {idx + 1 < arr.length && (
                <hr
                  style={{
                    borderWidth: "4px",
                    margin: "0px",
                    opacity: 0.25,
                  }}
                ></hr>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  orders: state.table?.orders,
  user: state.common?.user?.user_name,
  table_no: state.table?.table_id,
});

export default connect(mapStateToProps)(Orders);
