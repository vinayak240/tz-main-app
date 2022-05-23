import React from "react";

export function VegFoodSymbol(props) {
  return (
    <img
      alt="veg"
      {...props}
      src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png"
    />
  );
}

export function NonVegFoodSymbol(props) {
  return (
    <img
      {...props}
      alt="non veg"
      src="https://img.icons8.com/color/48/000000/non-vegetarian-food-symbol.png"
    />
  );
}

export function EggFoodSymbol(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={props.style.width}
      height={props.style.height}
      viewBox="0 0 172 172"
      style={{ fill: "#000000", ...props.style }}
    >
      <g
        fill="none"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{ mixBlendMode: "normal" }}
      >
        <path d="M0,172v-172h172v172z" fill="none"></path>
        <g fill="#f1c40f">
          <path d="M150.5,150.5h-129v-129h129zM28.66667,143.33333h114.66667v-114.66667h-114.66667z"></path>
          <path d="M86,46.58333c-21.76922,0 -39.41667,17.64744 -39.41667,39.41667c0,21.76922 17.64744,39.41667 39.41667,39.41667c21.76922,0 39.41667,-17.64744 39.41667,-39.41667c0,-21.76922 -17.64744,-39.41667 -39.41667,-39.41667z"></path>
        </g>
      </g>
    </svg>
  );
}

export default function FoodSymbols(props) {
  return {
    veg: <VegFoodSymbol {...props} />,
    non_veg: <NonVegFoodSymbol {...props} />,
    egg_only: <EggFoodSymbol {...props} />,
  }[props.food_type];
}
