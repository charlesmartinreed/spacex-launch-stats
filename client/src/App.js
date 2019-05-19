import React from "react";
import "./App.css";
import spaceXLogo from "./spacexlogo.svg";

function App() {
  return (
    <div className="App">
      <img
        src={spaceXLogo}
        alt="SpaceX"
        style={{ width: 300, display: "block", margin: "auto" }}
      />
    </div>
  );
}

export default App;
