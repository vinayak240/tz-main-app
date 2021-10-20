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

const OptionsMenu = (props) => {
  return (
    <MenuList>
      <MenuItem>
        <ListItemIcon>
          <TimelapseRoundedIcon />
        </ListItemIcon>
        <ListItemText style={{ paddingRight: "15px" }}>
          Order Status
        </ListItemText>
        <Typography variant="body2" color="text.secondary"></Typography>
      </MenuItem>
      <MenuItem>
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
            console.log("Btn clicked");
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
