import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import useStyles from "../../styles/comman_styles";

export function OrderSlideButton(props) {
  const [dragEnd, setDragEnd] = useState(0);
  const [dragPosition, setDragPosition] = useState(0);
  const comman_classes = useStyles();
  useEffect(() => {
    let end =
      window.innerWidth -
        2 * document.getElementById("drag-handle")?.clientWidth || 100;
    setDragEnd(end);
  }, []);

  const handleDrag = (evt, data) => {
    setDragPosition(data.x);
  };

  const handleDragStop = (evt, data) => {
    if (dragPosition < dragEnd) {
      setDragPosition(0);
    } else {
      props.onSlideComplete();
    }
  };

  return (
    <div
      id="drag-parent"
      style={{
        padding: "10px",
        borderRadius: "8px",
        position: "fixed",
        width: "95%",
        bottom: "10px",
        left: "2.5%",
        background: "rgb(235, 235, 235)",
      }}
    >
      <div>
        <p
          className={comman_classes.shine}
          style={{
            margin: "0px",
            // color: "#e2725a", with Orange
            color: "#21242b",
            zIndex: -1,
            position: "absolute",
            fontSize: "1.1rem",
            bottom: "25%",
            width: "97%",
            textAlign: "center",
            opacity: 0.87,
            fontWeight: 500,
            fontFamily: "'Proxima Nova'",
          }}
        >
          Slide to place order
        </p>
        <Draggable
          axis="x"
          handle="#drag-handle"
          defaultPosition={{ x: 0, y: 0 }}
          position={{ x: dragPosition, y: 0 }}
          bounds={{
            right: dragEnd,
            left: 0,
          }}
          scale={1}
          onDrag={handleDrag}
          onStop={handleDragStop}
          allowAnyClick={true}
        >
          <div>
            <button
              style={{
                visibility: dragPosition === dragEnd ? "hidden" : "visible",
                fontWeight: "bold",
                // color: "white", // with Orange
                color: "#21242b",
                // backgroundColor: "#e2725a", //Orange
                backgroundColor: "rgb(252, 214, 1)",
                fontSize: "1rem",
                border: "none",
                borderRadius: "5px",
                padding: "8px 10px",
              }}
              id="drag-handle"
            >
              {"> >"}
            </button>
          </div>
        </Draggable>
      </div>
    </div>
  );
}
