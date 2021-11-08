import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  Button,
  Checkbox,
  FormGroup,
  IconButton,
  Paper,
} from "@material-ui/core";
import FoodSymbols from "../assets/FoodSymbols";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { clone } from "ramda";
import BackIcon from "../assets/BackIcon";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#f2f6fc",
    color: "black",
  },
}));

export default function CustumizationPage(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    itemCost: Number(props.item.item_price),
    custumization_arr: [],
    count: 1,
    isSet: false,
  });

  const [error, setErrorState] = useState({
    showError: false,
    errorMsg: "",
  });

  const { custumization_arr } = props.item;

  const triggerError = (msg) => {
    setErrorState({
      showError: true,
      errorMsg: msg,
    });

    setTimeout(() => {
      setErrorState({
        showError: false,
        errorMsg: "",
      });
    }, 1000);
  };

  const handleCheckBoxInput = (evt) => {
    const [custId, optId] = evt.target.name.split("-");
    let newOpt = null;
    let oldOpt = null;

    const custIdx = custumization_arr.findIndex((cust) => cust._id === custId);
    const optIdx = custumization_arr[custIdx].options.findIndex(
      (opt) => opt._id === optId
    );

    let newCustArr = clone(state.custumization_arr);
    const actCustIdx = newCustArr.findIndex((cust) => cust._id === custId);

    if (actCustIdx === -1) {
      let newCust = clone(custumization_arr[custIdx]);
      newCust.options = newCust.options.filter((opt) => optId === opt._id);
      newCustArr = [...newCustArr, newCust];

      newOpt = newCust.options[0];
    } else if (
      Number(newCustArr[actCustIdx].custum_type) === 0 ||
      newCustArr[actCustIdx].options.length <=
        Number(newCustArr[actCustIdx].custum_type)
    ) {
      let actOptIdx = newCustArr[actCustIdx].options.findIndex(
        (opt) => opt._id === optId
      );
      if (actOptIdx === -1) {
        let l_newOpt = clone(custumization_arr[custIdx].options[optIdx]);
        newCustArr[actCustIdx].options = [
          ...newCustArr[actCustIdx].options,
          l_newOpt,
        ];
        newOpt = l_newOpt;
      } else {
        oldOpt = newCustArr[actCustIdx].options[actOptIdx];
        newCustArr[actCustIdx].options = newCustArr[actCustIdx].options.filter(
          (opt) => opt._id !== optId
        );

        if (newCustArr[actCustIdx].options.length === 0) {
          newCustArr = newCustArr.filter((cust) => cust._id !== custId);
        }
      }
    }

    const cost = state.itemCost - getOptionCost(oldOpt) + getOptionCost(newOpt);

    setState((prev) => ({
      ...prev,
      custumization_arr: [...newCustArr],
      itemCost: cost,
    }));
  };

  const handleRadioInput = (evt) => {
    const [custId, optId] = evt.target.value.split("-");
    let newOpt;
    let oldOpt;
    const custIdx = custumization_arr.findIndex((cust) => cust._id === custId);

    const actCustIdx = state.custumization_arr.findIndex(
      (cust) => cust._id === custId
    );
    oldOpt = state.custumization_arr[actCustIdx].options[0];

    const newCustArr = clone(state.custumization_arr).map((cust) => {
      if (custId === cust._id && custIdx !== -1) {
        cust.options = custumization_arr[custIdx].options.filter(
          (opt) => opt._id === optId
        );

        newOpt = cust.options[0];
      }

      return cust;
    });

    const cost = state.itemCost - getOptionCost(oldOpt) + getOptionCost(newOpt);

    setState((prev) => ({
      ...prev,
      custumization_arr: [...newCustArr],
      itemCost: cost,
    }));
  };

  const setInitialState = () => {
    const initialCustArr = clone(custumization_arr)
      .filter((cust) => Number(cust.custum_type) > 0)
      .map((cust) => {
        cust.options =
          Number(cust.custum_type) > 0
            ? cust.options.filter((opt) => opt.option_type === "total")
            : [];
        return cust;
      });

    setState((prev) => ({
      ...prev,
      custumization_arr: [...initialCustArr],
      isSet: true,
    }));
  };

  const getRadiovalue = (custId) => {
    let custIdx = state.custumization_arr.findIndex(
      (cust) => cust._id === custId
    );
    let optId = state.custumization_arr[custIdx]?.options[0]?._id;
    return `${custId}-${optId}`;
  };

  const isChecked = (custId, optId) => {
    const custIdx = state.custumization_arr.findIndex(
      (cust) => cust._id === custId
    );
    if (custIdx === -1) return false;

    const optIdx = state.custumization_arr[custIdx].options.findIndex(
      (opt) => opt._id === optId
    );
    if (optIdx === -1) return false;

    return true;
  };

  const getOptionCost = (opt) => {
    switch (opt?.option_type) {
      case "add":
        return Number(opt.option_price);
      case "minus":
        return -Number(opt.option_price);
      default:
        return 0;
    }
  };

  const checkIsDisabled = (custId, optId) => {
    const custIdx = state.custumization_arr.findIndex(
      (cust) => cust._id === custId
    );
    if (custIdx === -1) return false;

    if (
      Number(state.custumization_arr[custIdx].custum_type) === 0 ||
      state.custumization_arr[custIdx].options.length <
        Number(state.custumization_arr[custIdx].custum_type)
    ) {
      return false;
    }

    const optIdx = state.custumization_arr[custIdx].options.findIndex(
      (opt) => opt._id === optId
    );
    if (optIdx !== -1) return false;

    return true;
  };

  const addItem = () => {
    let isAllOk = state.custumization_arr.every(
      (cust) =>
        Number(cust.custum_type) === 0 ||
        Number(cust.custum_type) === cust.options.length
    );

    if (!isAllOk) {
      setErrorState({
        showError: true,
        errorMsg: "Cannot add, Please select required customizations",
      });

      return;
    }

    props.addItem(false, state.custumization_arr, state.itemCost, state.count);
  };

  useEffect(() => setInitialState(), []);

  return (
    <div>
      <AppBar position="sticky" className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            {/* <KeyboardBackspaceIcon /> */}
            <BackIcon />
          </IconButton>
          <Typography
            style={{
              fontSize: "1.12rem",
              fontWeight: 600,
              fontFamily: "Open Sans",
            }}
          >
            Customizations
          </Typography>
        </Toolbar>
        <Toolbar>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FoodSymbols
              food_type={props.item.food_type}
              style={{
                width: "19px",
                height: "fit-content",
              }}
            />{" "}
            <span style={{ fontSize: "1.1rem", marginLeft: "5px" }}>
              {props.item.item_name}
            </span>{" "}
          </div>
        </Toolbar>
      </AppBar>
      <Paper style={{ padding: "0 17px", marginTop: "20px" }} elevation={0}>
        {state.isSet &&
          custumization_arr.map((cust, custIdx) => {
            const n_options = Number(cust.custum_type);
            const isRequired = n_options > 0;
            const isRadio = n_options === 1;

            return (
              <div key={cust._id} style={{ marginBottom: "10px" }}>
                <Typography style={{ marginBottom: "7px", fontWeight: "600" }}>
                  {cust.custumization_name}
                  <span
                    style={{
                      fontSize: ".85rem",
                      color: "#686b78",
                      marginLeft: "4px",
                      fontWeight: 500,
                    }}
                  >
                    {!isRadio
                      ? isRequired
                        ? `(${cust.options.length}/${cust.custum_type})`
                        : "(optional)"
                      : ""}
                  </span>
                </Typography>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  {!isRadio ? (
                    <FormGroup>
                      {cust.options.map((opt, optIdx) => (
                        <FormControlLabel
                          style={{ color: "rgb(247, 160, 2)" }}
                          key={opt._id}
                          control={
                            <Checkbox
                              checked={isChecked(cust._id, opt._id)}
                              onChange={handleCheckBoxInput}
                              name={`${cust._id}-${opt._id}`}
                              disabled={checkIsDisabled(cust._id, opt._id)}
                            />
                          }
                          label={
                            <span
                              style={{
                                color: "#3d4152",
                              }}
                            >
                              {opt.option}
                              <span
                                style={{ color: "#93959f", marginLeft: "10px" }}
                              >
                                <span>&#8377;</span>
                                {opt.option_price}
                              </span>
                            </span>
                          }
                        />
                      ))}
                    </FormGroup>
                  ) : (
                    <RadioGroup
                      aria-label={`cust-${custIdx}`}
                      name={`${cust._id}`}
                      value={getRadiovalue(cust._id)}
                      onChange={handleRadioInput}
                    >
                      {cust.options.map((opt, optIdx) => (
                        <FormControlLabel
                          style={{ color: "rgb(247, 160, 2)" }}
                          value={`${cust._id}-${opt._id}`}
                          control={<Radio />}
                          label={
                            <span
                              style={{
                                color: "#3d4152",
                              }}
                            >
                              {opt.option}
                            </span>
                          }
                        />
                      ))}
                    </RadioGroup>
                  )}
                </FormControl>
              </div>
            );
          })}
      </Paper>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          borderTop: "1px solid lightgrey",
          padding: "5px 10px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            width: "30%",
            padding: "7px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            border: "1px solid black",
            borderRadius: "6px",
            background: "#f4eed3",
          }}
        >
          <button
            style={{
              border: "none",
              background: "transparent",
              color: "black",
            }}
            onClick={() => {
              if (state.count <= 1) {
                props.handleClose();
                return;
              }
              setState((prev) => ({
                ...prev,
                count: prev.count - 1,
              }));
            }}
          >
            <i
              style={{
                fontSize: "0.7rem",
                verticalAlign: "middle",
                color: "#000000",
              }}
              className="fas fa-minus"
            ></i>
          </button>
          <span style={{ fontSize: "1.14rem", fontWeight: "600" }}>
            {state.count}
          </span>
          <button
            style={{
              border: "none",
              background: "transparent",
              color: "black",
              fontSize: "1.2rem",
            }}
            onClick={() =>
              setState((prev) => ({
                ...prev,
                count: prev.count + 1,
              }))
            }
          >
            +
          </button>
        </div>
        <Button
          onClick={addItem}
          style={{
            width: "55%",
            padding: "7px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "6px",
            background: "rgb(255 215 34)",
            fontWeight: "700",
            textTransform: "capitalize",
          }}
        >
          Add{" "}
          <span
            style={{
              marginLeft: "7px",
              fontSize: "1rem",
            }}
          >
            <span>&#8377;</span>
            {state.itemCost * state.count}
          </span>
        </Button>
      </div>
    </div>
  );
}
