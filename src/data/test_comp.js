import { Skeleton } from "@material-ui/lab";
import React, { useState, useEffect, memo } from "react";
import Draggable from "react-draggable";
import useStyles from "../pages/styles/comman_styles";

function Item({ idx }) {
  useEffect(() => {
    console.log("Redered - ", idx);
  });

  return <div>Item - {idx}</div>;
}

const MemoItem = memo(Item);

export const MList = () => {
  const [state, setState] = useState({
    list: [0, 1, 2, 3, 4],
  });
  console.clear();

  return (
    <div style={{ width: "100vw" }}>
      <div style={{ margin: "auto 10px" }}>
        <button
          style={{ margin: "10px" }}
          onClick={() => {
            setTimeout(
              () =>
                setState((prev) => ({
                  list: [...state.list, state.list.length],
                })),
              5000
            );
          }}
        >
          Add
        </button>
        <ul>
          {state.list.map((ele) => (
            //   uuid use karle
            <MemoItem key={ele} idx={ele} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export function DragApp(props) {
  const [dragEnd, setDragEnd] = useState(0);
  const [dragPosition, setDragPosition] = useState(0);
  const comman_classes = useStyles();
  useEffect(() => {
    let end =
      window.innerWidth -
        2 * document.getElementById("drag-handle")?.clientWidth || 100;
    setDragEnd(end);
  }, []);

  const handleMouseUp = (evt) => {
    console.log("IM BACK BITCHES");
  };

  const handleDrag = (evt, data) => {
    setDragPosition(data.x);
  };

  const handleDragStop = (evt, data) => {
    if (dragPosition < dragEnd) {
      setDragPosition(0);
    } else {
      console.log("Order Placed!!");
    }
  };

  return (
    <div
      id="drag-parent"
      style={{
        padding: "10px",
        borderRadius: "8px",
        position: "fixed",
        width: "90%",
        bottom: "10px",
        left: "2%",
        background: "#e5e5e5",
      }}
    >
      <p
        style={{
          margin: "0px",
          zIndex: -1,
          position: "absolute",
          left: "30%",
          color: "gray",
          fontSize: "1.1rem",
          bottom: "25%",
        }}
      >
        <Skeleton
          animation="wave"
          style={{ display: "inline", backgroundColor: "transparent" }}
        >
          Slide to place order
        </Skeleton>
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
              color: "white",
              backgroundColor: "#e2725a",
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
  );
}
