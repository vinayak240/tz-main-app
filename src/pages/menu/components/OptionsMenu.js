import * as React from "react";
import {
  Divider,
  ListItemText,
  MenuItem,
  MenuList,
  ListItemIcon,
  Typography,
  Button,
} from "@material-ui/core";
import TimelapseRoundedIcon from "@material-ui/icons/TimelapseRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import DraftsRoundedIcon from "@material-ui/icons/DraftsRounded";
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";
import { useNavigate } from "react-router-dom";

const OptionsMenu = (props) => {
  const navigate = useNavigate();

  return (
    <MenuList>
      <MenuItem>
        <ListItemIcon>
          <TimelapseRoundedIcon />
        </ListItemIcon>
        <ListItemText style={{ paddingRight: "15px" }}>Your Table</ListItemText>
        <Typography variant="body2" color="text.secondary"></Typography>
      </MenuItem>
      <MenuItem onClick={() => navigate("/restaurant/orders")}>
        <ListItemIcon>
          <ListAltRoundedIcon />
        </ListItemIcon>
        <ListItemText style={{ paddingRight: "15px" }}>
          Your Orders
        </ListItemText>
        <Typography variant="body2" color="text.secondary"></Typography>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <DraftsRoundedIcon />
        </ListItemIcon>
        <ListItemText style={{ paddingRight: "15px" }}>
          Notifications
        </ListItemText>
        <Typography variant="body2" color="text.secondary"></Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={(evt) => console.log("List itm clicked")}>
        <Button
          onClick={(evt) => {
            evt.stopPropagation();
            navigate("/restaurant/checkout");
          }}
          style={{
            width: "94%",
            color: "#282c34",
            fontSize: "0.9rem",
            fontWeight: "600",
            backgroundColor: "#fcd601",
            textTransform: "capitalize",
            margin: "auto",
            marginTop: "7px",
            borderRadius: "7px",
          }}
        >
          <DoubleArrowRoundedIcon />
          <span>Check Out</span>
        </Button>
      </MenuItem>
    </MenuList>
  );
};

export default OptionsMenu;
