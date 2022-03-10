import * as React from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/actions/cart";
import {
  ListItemText,
  MenuItem,
  MenuList,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import RemoveShoppingCartOutlinedIcon from "@material-ui/icons/RemoveShoppingCartOutlined";

const OptionsMenu = (props) => {
  const dispatch = useDispatch();

  return (
    <MenuList style={{ paddingTop: "0px", paddingBottom: "0px" }}>
      <MenuItem
        onClick={() => dispatch(clearCart())}
        style={{ paddingLeft: "8px", paddingRight: "8px" }}
      >
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
