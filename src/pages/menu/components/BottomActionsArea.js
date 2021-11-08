import {
  Backdrop,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Popover,
} from "@material-ui/core";
import React, { useState } from "react";
import { scrollTo } from "../utils/scroll";

const backdropStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.appBar + 1,
    color: "#fff",
  },
}));

export default function BottomActionsArea(props) {
  const backdropClasses = backdropStyles();
  const [state, setState] = useState({
    anchorEl: null,
  });
  const [active_cat, setActiveCat] = useState(0);

  const handleFabMenuOpen = (evt) => {
    setState({
      ...state,
      anchorEl: evt.currentTarget,
    });
  };

  const handleFabMenuClose = () => {
    setState({
      ...state,
      anchorEl: null,
    });
  };

  const scrollToCategory = (catIdx) => {
    setActiveCat(catIdx);
    scrollTo({ id: `menu-cat-${catIdx + 1}` });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <div className="partials">
        <Backdrop
          className={backdropClasses.Backdrop}
          open={Boolean(state.anchorEl)}
          onClick={handleFabMenuClose}
        >
          <Popover
            id={Boolean(state.anchorEl) ? "fab-menu-popover" : undefined}
            style={{ paddingRight: "15px", width: "70vw" }}
            open={Boolean(state.anchorEl)}
            onClose={handleFabMenuClose}
            anchorEl={state.anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            PaperProps={{
              style: {
                minWidth: "70vw",
                maxHeight: "300px",
                borderRadius: "8px",
                overflow: "auto",
                padding: "20px 14px 20px 24px",
              },
            }}
          >
            <List
              style={{ padding: "0px" }}
              component="nav"
              aria-label="secondary mailbox folders"
            >
              {props.categories.map((cat, idx) => (
                <ListItem key={idx} onClick={() => scrollToCategory(idx)}>
                  <ListItemText
                    primary={
                      <span
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textTransform: "capitalize",
                          display: "block",
                          fontWeight: active_cat === idx ? "bold" : "normal",
                        }}
                      >
                        {cat.category_name}
                      </span>
                    }
                  />
                  <ListItemSecondaryAction
                    style={{
                      fontWeight: active_cat === idx ? "bold" : "normal",
                    }}
                  >
                    {cat.n_items}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Popover>
        </Backdrop>
      </div>
      <div
        style={{
          height: "60px",
          zIndex: 11,
          transition: "transform 0.25s ease",
          willChange: "transform",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          contain: "content",
          position: "relative",
          transform: "translate3d(0, 0, 0)",
        }}
      >
        <button
          onClick={handleFabMenuOpen}
          aria-describedby={
            Boolean(state.anchorEl) ? "fab-menu-popover" : undefined
          }
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translateX(-50%)",
            width: "105px",
            height: "35px",
            pointerEvents: "auto",
            borderRadius: "30px",
            border: "transparent",
            boxShadow:
              "0 5px 10px 0 rgb(0 0 0 / 30%), 0 2px 1px 0 rgb(93 141 213 / 20%)",
            textTransform: "uppercase",
            padding: "13px",
            fontWeight: 600,
            fontFamily: "Open Sans",
            color: "white",
            background: "#21242b",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <i
            style={{ marginRight: "7px", verticalAlign: "middle" }}
            className="fas fa-bars"
          ></i>{" "}
          Menu
        </button>
      </div>
    </div>
  );
}
