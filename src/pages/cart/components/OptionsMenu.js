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
import RemoveShoppingCartOutlinedIcon from "@material-ui/icons/RemoveShoppingCartOutlined";

const OptionsMenu = (props) => {
  return (
    <MenuList style={{ paddingTop: "0px", paddingBottom: "0px" }}>
      <MenuItem style={{ paddingLeft: "8px", paddingRight: "8px" }}>
        <ListItemIcon style={{ minWidth: "40px" }}>
          <RemoveShoppingCartOutlinedIcon />
        </ListItemIcon>
        <ListItemText style={{ paddingRight: "15px" }}>Clear Cart</ListItemText>
        <Typography variant="body2" color="text.secondary"></Typography>
      </MenuItem>
    </MenuList>
  );
};

export default OptionsMenu;
