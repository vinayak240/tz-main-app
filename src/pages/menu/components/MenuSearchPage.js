import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import BackIcon from "../assets/BackIcon";
import { clone } from "ramda";
import Item from "./Item";
import useMainStyles from "../styles/main";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: "53px",
    backgroundColor: "#ffffff",
    color: "black",
    borderBottom: "1px solid rgb(175 175 175 / 20%)",
  },
}));

export default function MenuSearchPage(props) {
  const classes = useStyles();
  const m_classes = useMainStyles();
  const [state, setState] = useState({
    search_text: "",
    filtered_menu: [],
  });

  const { menu } = props;

  const handleSearchTextChange = (evt) => {
    let query = evt.target.value;
    let list = [];
    let deciderValue = 2 * query.split(" ").length - 1;
    if (query.length > deciderValue) {
      list = filterItems(query);
    } else {
      list = [];
    }

    setState((prev) => ({
      ...prev,
      search_text: query,
      filtered_menu: [...list],
    }));
  };

  const clearSearchText = () => {
    setState({
      ...state,
      search_text: "",
      filtered_menu: [],
    });
  };

  const filterItems = (query) => {
    const key = query.toLowerCase();
    let filteredMenu = [
      { section_name: "Food Menu", list: search(key, menu.food) },
      { section_name: "Bar Menu", list: search(key, menu.bar) },
      //   { section_name: "Buffet Menu", list: search(key, menu.food) }, Enable it after Buffet item Done
    ];

    filteredMenu = filteredMenu.filter((section) => section.list.length > 0);

    return filteredMenu;
  };
  const search = (key, list) => {
    const tokenArr = key.split(" ");
    // PreProcess the List when the Menu is changed
    list = preProcessList(list);
    let lvl1Ids = [];
    let lvl2Ids = [];
    let lvl1List = tokenArr
      .map((token) => {
        if (token.length <= 1) {
          return [];
        }
        return list.filter((item) => {
          if (
            !lvl1Ids.includes(item._id) &&
            item.item_name.toLowerCase().startsWith(token)
          ) {
            lvl1Ids = [...lvl1Ids, item._id];
            return true;
          }

          return false;
        });
      })
      .flat();

    list = list.filter((item) => !lvl1Ids.includes(item._id));

    let lvl2List = tokenArr
      .map((token) => {
        if (token.length <= 1) {
          return [];
        }
        return list.filter((item) => {
          if (
            !lvl2Ids.includes(item._id) &&
            item.item_name.toLowerCase().includes(token)
          ) {
            lvl2Ids = [...lvl2Ids, item._id];
            return true;
          }

          return false;
        });
      })
      .flat();

    return clone([...lvl1List, ...lvl2List]);
  };

  const preProcessList = (list) => {
    return list.map((cat) => cat.items).flat();
  };

  return (
    <div>
      <AppBar className={classes.appBar} position="sticky" elevation={0}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              item
              xs={1}
            >
              <IconButton
                edge="start"
                color="inherit"
                onClick={props.handleClose}
                aria-label="close"
              >
                <BackIcon />
              </IconButton>
            </Grid>
            <Grid item xs={9}>
              <input
                style={{
                  fontSize: "1rem",
                  lineHeight: "20px",
                  width: "100%",
                  height: "100%",
                  outline: 0,
                  border: "none",
                  overflow: "hidden",
                  fontFamily: "inherit",
                  color: "inherit",
                  background: "inherit",
                  verticalAlign: "middle",
                  fontFamily: "Nunito",
                  letterSpacing: "-0.3px",
                }}
                type="text"
                name="search_text"
                value={state.search_text}
                placeholder="Search in menu.."
                onChange={handleSearchTextChange}
                autoFocus
              />
            </Grid>
            <Grid
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              item
              xs={1}
            >
              {state.search_text.length > 0 && (
                <img
                  onClick={clearSearchText}
                  style={{ width: "27px" }}
                  src="https://img.icons8.com/ios/50/000000/multiply.png"
                />
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div>
        {state.filtered_menu.map((section, idx) => (
          <section style={{ padding: "15px" }} key={idx}>
            <Typography style={{ marginBottom: "18px", fontWeight: "600" }}>
              {`In ${section.section_name}`}
            </Typography>
            {section.list.map((item, itemIdx, arr) => (
              <div key={itemIdx}>
                <div style={{ paddingBottom: "14px" }}>
                  {" "}
                  <Item key={`${item._id}-${itemIdx}`} item={item} />{" "}
                </div>
                {arr.length !== itemIdx + 1 && (
                  <hr
                    style={{
                      borderWidth: "1.5px",
                      margin: "6px 0 20px 0",
                    }}
                    className={m_classes.dottedSeperator}
                  ></hr>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
