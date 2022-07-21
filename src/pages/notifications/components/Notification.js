import React from "react";
import { useNavigate } from "react-router-dom";
import ORDER_STATUS from "../../../enums/order_status";
import { TABLE_STATUS } from "../../../enums/table_status";
import NotificationIcon from "../../../layouts/components/NotificationIcon";
import { diff_minutes } from "../../../utils/helpers";

export default function Notification(props) {
  const navigate = useNavigate();

  const getNotificationInfo = (status) => {
    switch (status) {
      case ORDER_STATUS.NEW:
        return {
          main_text: "New Order Requested",
          desc_text: "Your order has been requested to restaurant..",
        }; //manual - semi status
      case ORDER_STATUS.PLACED:
        return {
          main_text: "Order Placed",
          desc_text: "Your Order has been received by the restaurant..",
        };
      case ORDER_STATUS.ORDER_ACCEPTED:
        return {
          main_text: "Order Accepted",
          desc_text: "Your order has been accepted by the restaurant..",
        };
      case ORDER_STATUS.ORDER_REJECTED:
        return {
          main_text: "Order Rejected",
          desc_text: "Your order has been rejected by the restaurant..",
        };
      case ORDER_STATUS.ACCEPTED_PARTIALLY:
        return {
          main_text: "Order Partially Accepted",
          desc_text: "Some of the requested items are not accepted..",
        };
      case ORDER_STATUS.PREPARING:
        return {
          main_text: "Order Accepted",
          desc_text: "Your order is accepted and is being prepared..",
        };

      case ORDER_STATUS.UPDATE:
        return {
          main_text: "Order Update Requested",
          desc_text: "Order update has been requested to restaurant..",
        }; //manual
      case ORDER_STATUS.UPDATE_ACCEPTED:
        return {
          main_text: "Order Update Accepted",
          desc_text: "Order update has been accepted by restaurant..",
        };
      case ORDER_STATUS.UPDATE_REJECTED:
        return {
          main_text: "Order Update Rejected",
          desc_text: "Order update has been rejected by restaurant..",
        };
      case ORDER_STATUS.UPDATED_PARTIALLY:
        return {
          main_text: "Order Updated Partially",
          desc_text: "Some of the updated items are not accepted..",
        };
      case ORDER_STATUS.UPDATED:
        return {
          main_text: "Order Update Accepted",
          desc_text:
            "Order has been updated and is being prepared by restaurant",
        }; //manual only After ACCEPT from Rest

      case ORDER_STATUS.CANCEL:
        return {
          main_text: "Order Cancel Requested",
          desc_text: "Order cancel has been requested to restaurant",
        }; //manual
      case ORDER_STATUS.CANCEL_ACCEPTED:
        return {
          main_text: "Order Cancel Accepted",
          desc_text: "Order cancel has been requested to restaurant",
        };
      case ORDER_STATUS.CANCEL_REJECTED:
        return {
          main_text: "Order Cancel Rejected",
          desc_text: "Order cannot be cancelled..",
        };
      case ORDER_STATUS.CANCELLED_PARTIALLY:
        return {
          main_text: "Order Cancelled Partially",
          desc_text: "Some of the items in the order cannot be cancelled..",
        }; //Not required
      case ORDER_STATUS.CANCELLED:
        return {
          main_text: "Order Cancelled",
          desc_text: "Order and all ites items are Cancelled...",
        }; //manual only After ACCEPT from Rest

      case ORDER_STATUS.SERVED:
        return {
          main_text: "Order Served",
          desc_text: "Order has been served by the reastaurant",
        }; //manual -- last stage

      // Table Statuses

      case TABLE_STATUS.TABLE_REQUEST:
        return {
          main_text: "Table Requested",
          desc_text: "Table has been requested to the restaurant",
        }; //manual
      case TABLE_STATUS.TABLE_REQUESTED:
        return {
          main_text: "Table Request Received",
          desc_text: "Table request received by the restaurant",
        };

      case TABLE_STATUS.TABLE_ACTIVE:
        return {
          main_text: "Table Active",
          desc_text: "Table request accepted by the restaurant..",
        }; // When table request is accepted the table status is set to TABLE_ACTIVE

      case "TABLE_ACCEPTED":
        return {
          main_text: "Table Request Accepted",
          desc_text: "Table request accepted by the restaurant",
        }; // When table request is accepted the table status is set to TABLE_ACTIVE
      case TABLE_STATUS.TABLE_FREE:
        return {
          main_text: "Table Freed",
          desc_text: "Table has been freed by the restaurant",
        }; //After checkout the rest table status is set to FREE
      case TABLE_STATUS.TABLE_CHECKOUT_REQUESTED:
        return {
          main_text: "Check out Requested",
          desc_text: "Checkout request has been received",
        };
      case TABLE_STATUS.TABLE_CHECKOUT_DONE:
        return {
          main_text: "Table Checked Out",
          desc_text: "Your table has been cleared and checked out",
        };

      default:
        return {
          main_text: "Random_Info",
          desc_text: "ingore",
        };
    }
  };

  const handleClick = () => {
    switch (props.notification.type) {
      case "TABLE":
        navigate("/table");
        return;
      case "ORDER":
        Boolean(props.notification?.payload_id) &&
          navigate(`/restaurant/orders/${props.notification?.payload_id}`);
        return;

      default:
        return;
    }
  };

  const notifInfo = getNotificationInfo(props.notification?.status);

  return (
    notifInfo.main_text !== "Random_Info" && (
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 8px",
          borderBottom: "1px solid lightgrey",
        }}
      >
        <div
          style={{
            flexBasis: "20%",
            flexBasis: "16%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "8px",
              background: "#f1f2d0",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <NotificationIcon style={{ width: "30px" }} />
          </div>
        </div>
        <div
          style={{
            marginLeft: "8px",
            flexBasis: "84%",
          }}
        >
          <div
            style={{
              marginBottom: "3px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                fontFamily: "'Proxima Nova'",
              }}
            >
              {notifInfo.main_text}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                fontFamily: "'Proxima Nova'",
              }}
            >
              {" "}
              {diff_minutes(
                new Date(),
                new Date(props.notification?.date || new Date())
              )}
              &nbsp;ago
            </span>
          </div>
          <div style={{ fontSize: "0.76rem", fontFamily: "'Proxima Nova'" }}>
            <span>{notifInfo.desc_text}</span>
          </div>
        </div>
      </div>
    )
  );
}
