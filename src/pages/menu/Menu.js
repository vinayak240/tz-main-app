import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MenuAppBar from "./components/MenuAppBar";
import useStyles from "./styles/main";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import MenuTabs from "./components/MenuTabs";
import TabPanel from "./components/TabPanel";
import MenuSearchBar from "./components/MenuSearchBar";
import Category from "./components/Category";
import restaurantData from "../../data/rest.json";
import BottomActionsArea from "./components/BottomActionsArea";
import Package from "./components/Package";
import { decideFoodType, decideToShowMenuFAB } from "./utils/helper";
import { getElementPosition } from "./utils/scroll";

const Menu = (props) => {
  // Since Menu is not updated so we use menu as props [ The whole restaturant data is used as props ]
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [isVegOnly, setVegOnly] = useState(false);
  const [showTopSearchBar, setShowTopSearchBar] = useState(false);
  const [s_active_cat, setScrollActiveCat] = useState(0);
  const restaurnt = restaurantData;

  const menuMap = ["food", "bar", "buffet"];

  useEffect(() => {
    document.onscroll = () => {
      try {
        let height = document.getElementById("rest-info")?.clientHeight + 20;

        if (Boolean(document.scrollingElement.scrollTop >= height)) {
          !showTopSearchBar && setShowTopSearchBar(true);
        } else {
          showTopSearchBar && setShowTopSearchBar(false);
        }

        let offsets = restaurnt.menu[menuMap[tabValue]].map((cat, idx) => ({
          element: document.getElementById(`menu-cat-${idx + 1}`),
          offset: getElementPosition(
            document.getElementById(`menu-cat-${idx + 1}`)
          ),
        }));

        let active_cat = offsets.findIndex(
          (ele) =>
            window.scrollY + window.innerHeight / 2 - ele.offset <=
            ele.element?.clientHeight
        );

        if (active_cat !== -1) {
          setScrollActiveCat(active_cat);
        }
      } catch (err) {
        console.log("Error while scrolling");
      }
    };
  }, [showTopSearchBar, tabValue, menuMap, restaurnt.menu]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tabValue]);

  return (
    <div
      style={{
        marginTop: showTopSearchBar
          ? `${
              document.getElementById("menu-tabs").clientHeight +
              document.getElementById("menu-tool-bar").clientHeight
            }px`
          : "0px",
      }}
    >
      <MenuAppBar
        isVegOnly={isVegOnly}
        setVegOnly={setVegOnly}
        isAtTop={showTopSearchBar}
        tabValue={tabValue}
        setTabValue={setTabValue}
        menu={restaurnt.menu}
      />

      <Paper id="rest-info" className={classes.restInfo}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography
              style={{ paddingLeft: "10px" }}
              className={classes.main_text}
            >
              {restaurnt.rest_name}
              <CheckCircleRoundedIcon
                style={{
                  width: "18px",
                  fill: "mediumseagreen",
                  verticalAlign: "middle",
                  margin: "3px",
                }}
              />
            </Typography>
            <Typography className={classes.light_text}>
              {restaurnt.rest_tags.join(", ")}
            </Typography>
          </Grid>

          <hr className={classes.dottedSeperator}></hr>

          <Grid className={classes.infoGrid} item xs={4}>
            <Typography style={{ textAlign: "center", fontSize: "1.13rem" }}>
              <i className="far fa-star"></i>
              <span
                style={{
                  fontSize: "16px",
                  marginLeft: "5px",
                  fontWeight: "600",
                }}
              >
                4.7
              </span>
            </Typography>
            <Typography
              style={{ textAlign: "center", fontSize: "12px" }}
              className={classes.light_text}
            >
              <span>{"100+ ratings"}</span>
            </Typography>
          </Grid>
          <Grid className={classes.infoGrid} item xs={4}>
            <Typography style={{ textAlign: "center", fontSize: "1.13rem" }}>
              <i className="far fa-clock"></i>
              <span
                style={{
                  fontSize: "16px",
                  marginLeft: "5px",
                  fontWeight: "600",
                }}
              >
                {restaurnt.serve_time} min
              </span>
            </Typography>
            <Typography
              style={{ textAlign: "center", fontSize: "12px" }}
              className={classes.light_text}
            >
              <span>{"Serve time"}</span>
            </Typography>
          </Grid>
          <Grid className={classes.infoGrid} item xs={4}>
            <Typography style={{ textAlign: "center", fontSize: "1.1rem" }}>
              <span
                style={{
                  fontSize: "16px",
                  marginLeft: "5px",
                  fontWeight: "600",
                }}
              >
                <span>&#8377;</span>
                {restaurnt.cost_for_two}
              </span>
            </Typography>
            <Typography
              style={{ textAlign: "center", fontSize: "12px" }}
              className={classes.light_text}
            >
              <span>{"For two"}</span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <div id="rest-menu">
        {!showTopSearchBar && (
          <MenuTabs numTabs={3} tabValue={tabValue} setTabValue={setTabValue} />
        )}
        {!showTopSearchBar && (
          <MenuSearchBar
            isVegOnly={isVegOnly}
            setVegOnly={setVegOnly}
            isAtTop={false}
            menu={restaurnt.menu}
          />
        )}
        <hr
          style={{
            borderWidth: "1.5px",
            margin: 0,
          }}
          className={classes.dottedSeperator}
        ></hr>
        <TabPanel value={tabValue} index={0}>
          {restaurnt.menu["food"].map((ele, idx, arr) => (
            <div key={idx}>
              <Category
                id={`menu-cat-${idx + 1}`}
                key={ele._id}
                category={ele}
                is_veg={isVegOnly}
              />
              {arr.length !== idx + 1 && (
                <hr
                  style={{ borderWidth: "16px", margin: 0 }}
                  className={classes.dottedSeperator}
                ></hr>
              )}
            </div>
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {restaurnt.menu["bar"].map((ele, idx, arr) => (
            <div key={idx}>
              <Category
                id={`menu-cat-${idx + 1}`}
                key={ele._id}
                category={ele}
                is_veg={isVegOnly}
              />
              {arr.length !== idx + 1 && (
                <hr
                  style={{ borderWidth: "16px", margin: 0 }}
                  className={classes.dottedSeperator}
                ></hr>
              )}
            </div>
          ))}
        </TabPanel>
        <TabPanel style={{ padding: "15px" }} value={tabValue} index={2}>
          {restaurnt.menu["buffet"]
            .filter(
              (i_package) =>
                !isVegOnly || decideFoodType(i_package.items) === "veg"
            )
            .map((ele, idx, arr) => (
              <>
                <Package package={ele} key={ele._id} />
                {arr.length !== idx + 1 && (
                  <hr
                    style={{
                      borderWidth: "1.5px",
                      margin: "6px 0 20px 0",
                    }}
                    className={classes.dottedSeperator}
                  ></hr>
                )}
              </>
            ))}
        </TabPanel>
      </div>
      <BottomActionsArea
        active_cat={s_active_cat}
        showFAB={decideToShowMenuFAB(restaurnt.menu[menuMap[tabValue]])}
        categories={restaurnt.menu[menuMap[tabValue]].map((cat) => ({
          category_name: cat.category_name,
          n_items: cat.items.length,
        }))}
        checkOut={props.checkOut}
      />
      <div
        style={{ height: "120px", width: "100%", background: "#f4f4f5" }}
      ></div>
    </div>
  );
};

export default Menu;
