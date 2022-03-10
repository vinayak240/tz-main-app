import React from "react";
import { ListItemText, MenuItem, MenuList } from "@material-ui/core";

const OptionsMenu = (props) => {
  const options = [
    {
      label: "Your Orders",
    },
    {
      label: "All Orders",
    },
  ];
  return (
    <MenuList style={{ paddingTop: "0px", paddingBottom: "0px" }}>
      {options.map((o) => (
        <MenuItem
          style={{
            padding: "2px 15px",
            minHeight: "0px",
          }}
        >
          <ListItemText style={{ textAlign: "center" }}>
            <span
              style={{
                fontSize: "0.95rem",
                fontFamily: "'Proxima Nova'",
                fontWeight: "500",
              }}
            >
              {o.label}
            </span>
          </ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
};

export default OptionsMenu;
