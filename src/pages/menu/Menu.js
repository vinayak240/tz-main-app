import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MenuAppBar from "./components/MenuAppBar";
import useStyles from "./styles/main";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import MenuTabs from "./components/MenuTabs";
import TabPanel from "./components/TabPanel";
import MenuSearchBar from "./components/MenuSearchBar";
import Category from "./components/Category";

const Menu = (props) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [isVegOnly, setVegOnly] = useState(false);
  const [showTopSearchBar, setShowTopSearchBar] = useState(false);

  useEffect(() => {
    document.onscroll = () => {
      let height = document.getElementById("rest-info").clientHeight + 23;

      if (Boolean(document.scrollingElement.scrollTop >= height)) {
        !showTopSearchBar && setShowTopSearchBar(true);
      } else {
        showTopSearchBar && setShowTopSearchBar(false);
      }
    };
  }, [showTopSearchBar]);

  return (
    <div
      style={{
        marginTop: showTopSearchBar
          ? `${
              document.getElementById("menu-tabs").clientHeight +
              document.getElementById("menu-app-bar").clientHeight
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
              {"Maa Da Dhaba"}
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
              {["Indian", "Italian"].join(", ")}
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
                40 min
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
                {600}
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
      <div className="menu">
        {!showTopSearchBar && (
          <MenuTabs numTabs={3} tabValue={tabValue} setTabValue={setTabValue} />
        )}
        {!showTopSearchBar && (
          <MenuSearchBar
            isVegOnly={isVegOnly}
            setVegOnly={setVegOnly}
            isAtTop={false}
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
          {Array.from({ length: 10 }).map((ele, idx, arr) => (
            <>
              <Category />
              {arr.length !== idx + 1 && (
                <hr
                  style={{ borderWidth: "16px", margin: 0 }}
                  className={classes.dottedSeperator}
                ></hr>
              )}
            </>
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {Array.from({ length: 10 }).map((ele, idx, arr) => (
            <>
              <Category />
              {arr.length !== idx + 1 && (
                <hr
                  style={{ borderWidth: "16px", margin: 0 }}
                  className={classes.dottedSeperator}
                ></hr>
              )}
            </>
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {Array.from({ length: 10 }).map((ele, idx, arr) => (
            <>
              <Category />
              {arr.length !== idx + 1 && (
                <hr
                  style={{ borderWidth: "16px", margin: 0 }}
                  className={classes.dottedSeperator}
                ></hr>
              )}
            </>
          ))}
        </TabPanel>
      </div>
    </div>
  );
};

export default Menu;
