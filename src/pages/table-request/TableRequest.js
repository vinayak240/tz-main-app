import { Button, Slide, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearSession } from "../../redux/actions/table";
import useNavigateSearch from "./hooks/useNavigateWithQuery";

function TableRequest(props) {
  const navigate = useNavigateSearch();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    search_id: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      request();
    }
  };

  const request = () => {
    dispatch(clearSession());
    navigate("/table/load", {
      qr: false,
      sid: state.search_id.toUpperCase(),
    });

    setState({
      ...state,
      search_id: "",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <div>
        <Slide in={true} direction="down" timeout={1000}>
          <div
            style={{
              fontSize: "1.3rem",
              background: "lightgoldenrodyellow",
              padding: "8px 0",
              textAlign: "center",
              fontWeight: "600",
              fontFamily: "'Proxima Nova'",
              position: "relative",
              top: "0",
              width: "100%",
            }}
          >
            #TableZap Welcomes You! 🎉
          </div>
        </Slide>
        <div style={{ marginTop: "4.3rem" }}>
          <Typography
            style={{
              fontSize: "1.6rem",
              fontWeight: "900",
              fontFamily: "'Proxima Nova'",
              textAlign: "center",
              margin: "8px",
            }}
          >
            Request For Table
          </Typography>
          <Typography
            style={{
              textAlign: "center",
              fontSize: "smaller",
              color: "#939191",
              margin: "8px 6px",
              fontFamily: "'Proxima Nova'",
            }}
          >
            Please enter the Table Code that you see on the Table{" "}
          </Typography>
        </div>
      </div>
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          name="search_id"
          value={state.search_id}
          style={{
            width: "83%",
            padding: "15px 10px",
            background: "rgb(235, 235, 236)",
            border: "none",
            borderRadius: "5px",
            boxSizing: "border-box",
            fontSize: "1.2rem",
            fontWeight: "600",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={request}
          style={{
            width: "95%",
            fontWeight: "600",
            background: "#fcd601",
            fontFamily: "'Proxima Nova'",
            padding: "8px 0",
            filter:
              state.search_id.length === 0 ? "grayscale(0.8)" : "grayscale(0)",
          }}
          disabled={state.search_id.length === 0}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
}

export default TableRequest;
