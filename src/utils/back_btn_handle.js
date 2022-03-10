const onBackButtonEvent = (e) => {
  e.preventDefault();
  alert("Back Btn Pressed");
};

useEffect(() => {
  window.history.pushState(
    null,
    null,
    window.location.pathname + "#customizations"
  );
  window.addEventListener("popstate", onBackButtonEvent);
  return () => {
    window.removeEventListener("popstate", onBackButtonEvent);
  };
}, []);
