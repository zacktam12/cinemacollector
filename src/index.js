import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./Star";
import "./index.css";
import App from "./App";
function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      {" "}
      <StarRating
        maxRating={"10"}
        color="blue"
        // className={"test"}
        onSetRating={setMovieRating}
      />
      <h2>The movie has rated {movieRating} stars </h2>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //     <StarRating
  //       maxRating={5}
  //       messages={["Terrible", "Bad", "Good", "Very Good", "Amazing"]}
  //     />
  //     <StarRating color="red" size={24} className={"test"} defaultRating={3} />
  //     <Test />

  <React.StrictMode>
    <App />
  </React.StrictMode>
);
