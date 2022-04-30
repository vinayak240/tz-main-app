import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { memo, useEffect, useState } from "react";
import BackIcon from "../assets/BackIcon";
import { clone } from "ramda";
import Item from "./Item";
import useMainStyles from "../styles/main";
import {
  decideFoodType,
  findCartItem,
  findOriginalPackage,
  getMenuName,
  getMenuType,
} from "../utils/helper";
import Package from "./Package";
import { connect } from "react-redux";
import { getPropagationFlag } from "../../../utils/back_btn_handle";

const SearchItem = memo(Item);

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: "53px",
    backgroundColor: "#ffffff",
    color: "black",
    borderBottom: "1px solid rgb(175 175 175 / 20%)",
  },
}));

function MenuSearchPage(props) {
  const classes = useStyles();
  const m_classes = useMainStyles();
  const [state, setState] = useState({
    search_text: "",
    filtered_menu: [],
  });
  const [curState, setCurState] = useState(null);

  const { menu } = props;

  const handleSearchTextChange = (evt) => {
    let query = evt.target.value;
    let list = [];
    let deciderValue = 2 * query.trim().split(" ").length - 1;
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
    let menu = clone(props.menu);

    let filteredMenu = [];

    for (const mt in menu) {
      let type = getMenuType(menu[mt]);
      filteredMenu.push({
        section_name: getMenuName(mt, props.original_menu),
        type,
        list: search(key, menu[mt], getMenuType(menu[mt])),
      });
    }

    filteredMenu = filteredMenu.filter((section) => section.list.length > 0);

    return filteredMenu;
  };
  const search = (key, list, type = "category") => {
    const tokenArr = key.split(" ");
    const nameAttr = type === "package" ? "package_name" : "item_name";
    let lvl1Ids = [];
    let lvl2Ids = [];
    let filteredList = [];
    // PreProcess the List when the Menu is changed
    if (type !== "package") {
      list = type === "category" ? preProcessList(list) : list;
      list = list.filter((item) => !props.is_veg || item.food_type === "veg");
    } else {
      list = list.filter(
        (i_package) =>
          !props.is_veg || decideFoodType(i_package.items) === "veg"
      );
    }

    let lvl1List = tokenArr
      .map((token) => {
        if (token.length <= 1) {
          return [];
        }
        return list.filter((item) => {
          if (
            !lvl1Ids.includes(item._id) &&
            item[nameAttr].toLowerCase().startsWith(token)
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
            item[nameAttr].toLowerCase().includes(token)
          ) {
            lvl2Ids = [...lvl2Ids, item._id];
            return true;
          }

          return false;
        });
      })
      .flat();

    list = list.filter((item) => !lvl2Ids.includes(item._id));
    filteredList = [...lvl1List, ...lvl2List];

    if (type === "package") {
      filteredList = filteredList.map((pack) => {
        pack.items = search(key, pack.items, "item");
        return pack;
      });

      list = list.map((pack) => {
        pack.items = search(key, pack.items, "item");
        return pack;
      });

      list = list.filter((pack) => pack.items.length > 0);

      filteredList = [...filteredList, ...list];
    }

    return filteredList;
  };

  const preProcessList = (list) => {
    return list.map((cat) => cat.items).flat();
  };

  const goBack = (isPopped = false, isStopPropagation = false) => {
    if (!isPopped) {
      window.history.back();
    }

    if (!isStopPropagation) {
      props.handleClose();
    }
  };

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    goBack(true, getPropagationFlag());
  };

  useEffect(() => {
    setCurState(window.history.state);
    window.history.pushState(
      window.history.state,
      null,
      window.location.pathname + "#search"
    );
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

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
                onClick={() => goBack()}
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
                  alt="Close Icon"
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
                  {section.type === "category" ? (
                    <Item
                      key={`${item._id}-${itemIdx}`}
                      item={item}
                      cart_item={findCartItem(props.cart, item._id)}
                    />
                  ) : (
                    <div>
                      <Package
                        package={findOriginalPackage(
                          props.original_menu,
                          item._id
                        )}
                        key={`${item._id}-${itemIdx}`}
                      />
                      {item.items.length > 0 && (
                        <div
                          style={{
                            border: "1px solid lightgray",
                            padding: "6px 12.5px 12px 12.5px",
                            borderRadius: "8px",
                            paddingTop: "6px",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "1rem",
                              fontWeight: 600,
                              margin: "8px 0px 12px 0px",
                              textAlign: "center",
                            }}
                          >
                            In Package Items
                          </Typography>
                          {item.items.map((packItem, idx, itemArr) => (
                            <div>
                              <Item
                                key={`${item._id}-${idx}`}
                                item={packItem}
                                isPackage={true}
                              />
                              {itemArr.length !== idx + 1 && (
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
                        </div>
                      )}
                    </div>
                  )}{" "}
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

const mapStateToProps = (state) => ({
  cart: state.cart,
  original_menu: state.restaurant?.menu,
});

export default connect(mapStateToProps)(MenuSearchPage);
