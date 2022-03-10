import { Button, ButtonBase } from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isObjEmpty } from "../../utils/helpers";
import EmptyList from "./components/EmptyList";
import { Order } from "./components/Order";
import OrdersAppBar from "./components/OrdersAppBar";

function Orders(props) {
  const navigate = useNavigate();
  const { orders } = props;

  const goBack = () => {
    window.history.back();
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgb(237 237 240)",
      }}
    >
      <OrdersAppBar goBack={goBack} />
      {!Boolean(orders) || orders.length === 0 ? (
        <EmptyList />
      ) : (
        <div style={{ backgroundColor: "white" }}>
          {orders.map((o, idx) => (
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
                <Order order={o} />
              </ButtonBase>
              {idx + 1 < orders.length && (
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
});

export default connect(mapStateToProps)(Orders);
