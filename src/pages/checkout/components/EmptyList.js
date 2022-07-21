import React, { useState } from "react";
import AssignmentLateOutlinedIcon from "@material-ui/icons/AssignmentLateOutlined";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@material-ui/core";
import PaperComponent from "../../cart/shared/PaperComponent";
import { useNavigate } from "react-router-dom";

export default function EmptyList() {
  const [state, setState] = useState({
    f_warn_msg: false,
  });

  const navigate = useNavigate();

  const handleDialogOpen = (flagName) => {
    setState((prevState) => ({
      ...prevState,
      [flagName]: true,
    }));
  };

  const handleDialogClose = (flagName) => {
    setState((prevState) => ({
      ...prevState,
      [flagName]: false,
    }));
  };

  const clearTable = () => {};

  return (
    <div
      style={{
        width: "100vw",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="partials">
        <Dialog
          PaperComponent={(props) => (
            <Paper
              style={{
                padding: "12px",
                borderRadius: "12px",
                width: "250px",
                borderRadius: "8px",
              }}
              {...props}
            />
          )}
          open={state.f_warn_msg}
          onClose={() => handleDialogClose("f_warn_msg")}
        >
          <DialogTitle
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px",
            }}
          >
            <i
              style={{ margin: "8px", fontSize: "1.9rem" }}
              className="fas fa-exclamation-triangle"
            ></i>
          </DialogTitle>
          <DialogContent
            style={{
              paddingTop: "0px",
              fontFamily: "'Proxima Nova'",
              fontWeight: "600",
              fontSize: "0.98rem",
              padding: "5px 20px 10px 20px",
              textAlign: "center",
            }}
          >
            You will be signed out of the table
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: "0px",
            }}
          >
            <Button
              style={{
                fontWeight: "600",
                fontFamily: "'Proxima Nova'",
              }}
              onClick={() => handleDialogClose("f_warn_msg")}
            >
              OK
            </Button>
            <Button
              style={{
                fontWeight: "600",
                fontFamily: "'Proxima Nova'",
                color: "#a29c9c",
              }}
              onClick={() => handleDialogClose("f_warn_msg")}
            >
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AssignmentLateOutlinedIcon
          style={{
            color: "gray",
            width: "70px",
            height: "65px",
            opacity: "0.88",
          }}
        />
        <Typography
          style={{
            marginTop: "7px",
            fontFamily: "'Proxima Nova'",
            fontWeight: "500",
            textDecoration: "underline",
            opacity: "0.7",
          }}
        >
          You haven't ordered anything yet!
        </Typography>
        <div>
          <Button
            // onClick={() => handleDialogOpen("f_warn_msg")}
            onClick={() => navigate("/restaurant/checkout/request")}
            style={{
              background: "#282c34",
              color: "white",
              fontFamily: "'Proxima Nova'",
              padding: "6px 20px",
              marginTop: "18px",
            }}
          >
            <i
              style={{
                marginRight: "8px",
                fontSize: "1rem",
              }}
              className="fas fa-sign-out-alt"
            ></i>
            Sign Me Out
          </Button>
        </div>
      </div>
    </div>
  );
}
