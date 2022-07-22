import React, { useEffect, useRef, useState } from "react";
import { Button, Typography } from "@material-ui/core";
import TableAppBar from "../../table-request/components/TableAppBar";
import { EmojiMapper, FeelingMapper } from "../utils/constants";
import useCustumSearchParams from "../../table-request/hooks/useCustumSearchParams";

export default function Feedback() {
  const { r } = useCustumSearchParams();
  const [state, setState] = useState({
    rating: -1,
    feedback: "",
  });

  const setRating = (rating) => {
    setState({
      ...state,
      rating: rating,
    });
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  useEffect(() => {
    setRating(r || -1);
  }, []);

  return (
    <div>
      <TableAppBar noBack={false} />
      <div
        id="feedback"
        style={{
          marginTop: "1.8rem",
          padding: "15px",
        }}
      >
        <Typography
          style={{
            fontSize: "1.3rem",
            fontFamily: "'Proxima Nova'",
            fontWeight: "bold",
            margin: "10px",
            textAlign: "center",
          }}
        >
          Help us improve TableZap
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "24px 20px 20px",
            fontSize: "2rem",
            fontFamily: '"Proxima Nova"',
            alignItems: "flex-start",
          }}
        >
          {EmojiMapper.map((e, idx) => (
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setRating(idx + 1)}
            >
              <span
                style={{
                  padding: "5px",
                  background: idx === state.rating - 1 ? "#f0d3a0" : "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  border: idx === state.rating - 1 ? "1px solid gray" : "none",
                }}
              >
                {e}
              </span>
              <Typography
                style={{
                  fontFamily: '"Proxima Nova"',
                  fontSize: "0.74rem",
                  marginTop: "6px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {state.rating <= 0
                  ? idx === 0
                    ? "Very Bad"
                    : idx === EmojiMapper.length - 1
                    ? "Loved It!!"
                    : ""
                  : idx === state.rating - 1
                  ? FeelingMapper[state.rating - 1]
                  : ""}
              </Typography>
            </span>
          ))}
        </div>
        <div
          style={{
            visibility:
              state.rating >= 1 && state.rating <= EmojiMapper.length
                ? "visible"
                : "hidden",
          }}
        >
          <textarea
            style={{
              width: "100%",
              border: "1px solid gray",
              fontSize: "0.9rem",
              fontFamily: '"Proxima Nova"',
              padding: "10px",
              minHeight: "5.6rem",
              marginTop: "11px",
              borderRadius: "6px",
            }}
            name="feedback"
            onChange={handleChange}
            value={state.feedback}
            placeholder="Submit Feedback"
          ></textarea>
        </div>
        {state.rating >= 1 && state.rating <= EmojiMapper.length && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              backgroundColor: "white",
            }}
          >
            <Button
              style={{
                width: "100%",
                textTransform: "capitalize",
                fontSize: "1rem",
                fontFamily: '"Proxima Nova"',
                fontWeight: "600",
                background: "rgb(252, 214, 1)",
                color: "black",
                padding: "9px",
              }}
            >
              Submit Feedback
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
