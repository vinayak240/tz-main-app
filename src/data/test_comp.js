import React, { useState, useEffect, memo } from "react";

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
