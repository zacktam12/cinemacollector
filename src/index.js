import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./Star";
// import "./index.css";
// import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarRating maxRating={10} />
    {/* <App /> */}
  </React.StrictMode>
);
