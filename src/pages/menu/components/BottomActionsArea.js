import {
  Backdrop,
  Button,
  ButtonBase,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Popover,
  Slide,
} from "@material-ui/core";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import React, { useEffect, useState } from "react";
import { scrollTo } from "../utils/scroll";
import { connect } from "react-redux";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import animationStyles from "../../styles/comman_styles";

const backdropStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.appBar + 1,
    color: "#fff",
  },
}));

function BottomActionsArea(props) {
  const backdropClasses = backdropStyles();
  const animationClasses = animationStyles();
  const [state, setState] = useState({
    anchorEl: null,
    transition: 60,
  });
  const [active_cat, setActiveCat] = useState(props.active_cat || 0);

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

  useEffect(() => {
    setActiveCat(props.active_cat);
    setTimeout(() => {
      setState((prev) => ({ ...prev, transition: 0 }));
    }, 500);
  }, [props.active_cat]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
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
      <div>
        {props.showFAB && (
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
              transform: `translate3d(0, ${state.transition}px, 0)`,
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
        )}
      </div>
      {Boolean(props.cart?.items?.length > 0) && (
        <Slide in={true} direction="up">
          <ButtonBase
            className={animationClasses.clickEffect}
            onClick={props.checkOut}
            style={{
              height: "48px",
              width: "100%",
              zIndex: 11,
              transition: "transform 0.25s ease",
              willChange: "transform",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              contain: "content",
              position: "relative",
              backgroundColor: "#fcd601",
              transform: `translate3d(0, ${state.transition}px, 0)`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              fontWeight: 600,
              fontSize: "0.9rem",
              pointerEvents: "auto",
            }}
          >
            <div>
              <span>
                {`${(() => {
                  let t_count = props.cart.items.reduce(
                    (count, item) => item.itemCount + count,
                    0
                  );

                  return `${t_count} item${t_count > 1 ? "s" : ""}`;
                })()}`}{" "}
              </span>
              <span style={{ padding: "4px" }}>|</span>
              <span>
                <span>&#8377;</span>
                {props.cart.totalCost}
              </span>
            </div>
            <div>
              <span style={{ textTransform: "uppercase" }}>View Cart</span>
              <PlayArrowRoundedIcon
                style={{ marginLeft: "1px", verticalAlign: "middle" }}
              />
            </div>
          </ButtonBase>
        </Slide>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(BottomActionsArea);
