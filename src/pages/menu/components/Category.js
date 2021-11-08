import { Collapse, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../styles/main";
import Item from "./Item";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";

export default function Category(props) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const classes = useStyles();
  const { category } = props;
  const styleObj = isCategoryOpen
    ? {}
    : {
        display: "none",
      };

  const handleCollapse = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <Paper
      id={props.id}
      style={{ padding: "24px 8px 16px 16px" }}
      elevation={0}
    >
      <Typography
        style={{ marginBottom: isCategoryOpen ? "24px" : 0 }}
        onClick={handleCollapse}
        className={classes.categoryName}
      >
        {category.category_name + ` (${category.items.length})`}
        {isCategoryOpen ? (
          <KeyboardArrowUpRoundedIcon />
        ) : (
          <KeyboardArrowDownRoundedIcon />
        )}{" "}
      </Typography>
      <Collapse style={styleObj} in={isCategoryOpen}>
        {category.items.map((ele, idx, arr) => (
          <div key={idx}>
            <div style={{ paddingBottom: "14px" }}>
              {" "}
              <Item key={ele._id} item={ele} />{" "}
            </div>
            {arr.length !== idx + 1 && (
              <hr
                style={{
                  borderWidth: "1.5px",
                  margin: "6px 0 20px 0",
                }}
                className={classes.dottedSeperator}
              ></hr>
            )}
          </div>
        ))}
      </Collapse>
    </Paper>
  );
}
