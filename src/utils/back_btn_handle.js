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
