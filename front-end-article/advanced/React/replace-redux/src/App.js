import React from "react";
import { Color } from "./color";
import "./styles.css";

import ShowArea from "./ShowArea";
import Buttons from "./Buttons";

function App() {
  return (
    <div className="App">
      <Color>
        <ShowArea />
        <Buttons />
      </Color>
    </div>
  );
}

export default App;
