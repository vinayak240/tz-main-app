import { isObjEmpty } from "./helpers";

const onBackButtonEvent = (e) => {
  e.preventDefault();
  alert("Back Btn Pressed");
};

export const stopPropagation = () => {
  let navigationObj = JSON.parse(localStorage.getItem("navigation"));
  if (isObjEmpty(navigationObj)) {
    navigationObj = {};
  }

  localStorage.setItem(
    "navigation",
    JSON.stringify({ ...navigationObj, isStopProgation: true })
  );
};

export const setPropagation = () => {
  let navigationObj = JSON.parse(localStorage.getItem("navigation"));
  if (isObjEmpty(navigationObj)) {
    navigationObj = {};
  }

  localStorage.setItem(
    "navigation",
    JSON.stringify({ ...navigationObj, isStopProgation: false })
  );
};

export const getPropagationFlag = () => {
  let navigationObj = JSON.parse(localStorage.getItem("navigation"));

  if (isObjEmpty(navigationObj)) {
    return false;
  }

  return Boolean(navigationObj.isStopProgation);
};

export const disableBackButton = (global) => {
  // if (typeof global === "undefined") {
  //   throw new Error("window is undefined");
  // }

  // var _hash = "!";
  // var noBackPlease = function () {
  //   global.location.href += "#";

  //   // making sure we have the fruit available for juice....
  //   // 50 milliseconds for just once do not cost much (^__^)
  //   global.setTimeout(function () {
  //     global.location.href += "!";
  //   }, 50);
  // };

  // // Earlier we had setInerval here....
  // global.onhashchange = function () {
  //   if (global.location.hash !== _hash) {
  //     global.location.hash = _hash;
  //   }
  // };

  // global.onload = function () {
  //   noBackPlease();

  //   // disables backspace on page except on input fields and textarea..
  //   document.body.onkeydown = function (e) {
  //     var elm = e.target.nodeName.toLowerCase();
  //     if (e.which === 8 && elm !== "input" && elm !== "textarea") {
  //       e.preventDefault();
  //     }
  //     // stopping event bubbling up the DOM tree..
  //     e.stopPropagation();
  //   };
  // };

  // window.history.pushState(null, "", window.location.href);
  // window.onpopstate = () => {
  //   window.history.pushState(null, "", window.location.href);
  // };

  global.onpopstate = function () {
    global.history.go(1);
  };
};
