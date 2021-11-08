const logError = () =>
  console.error(
    `Invalid element, are you sure you've provided element id or react ref?`
  );

const getElementPosition = (element) =>
  element.offsetTop -
  (document.getElementById("menu-tool-bar").clientHeight +
    document.getElementById("menu-tabs").clientHeight +
    document.getElementById("menu-search-bar").clientHeight);

export function scrollTo({ id, ref = null, duration = 3000 }) {
  const initialPosition = window.scrollY;

  const element = ref ? ref.current : id ? document.getElementById(id) : null;

  if (!element) {
    logError();
    return;
  }

  animateScroll({
    targetPosition: getElementPosition(element),
    initialPosition,
    duration,
  });
}

// animateScroll.js

const pow = Math.pow;

function easeOutQuart(x) {
  return 1 - pow(1 - x, 4);
}

export function animateScroll({ targetPosition, initialPosition, duration }) {
  let start;
  let position;
  let animationFrame;

  const requestAnimationFrame = window.requestAnimationFrame;
  const cancelAnimationFrame = window.cancelAnimationFrame;

  const maxAvailableScroll =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const amountOfPixelsToScroll = initialPosition - targetPosition;

  function step(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }

    const elapsed = timestamp - start;

    const relativeProgress = elapsed / duration;

    const easedProgress = easeOutQuart(relativeProgress);

    position =
      initialPosition - amountOfPixelsToScroll * Math.min(easedProgress, 1);

    window.scrollTo(0, position);

    if (
      initialPosition !== maxAvailableScroll &&
      window.scrollY === maxAvailableScroll
    ) {
      cancelAnimationFrame(animationFrame);
      return;
    }

    if (elapsed < duration) {
      animationFrame = requestAnimationFrame(step);
    }
  }

  animationFrame = requestAnimationFrame(step);
}
