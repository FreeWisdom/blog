import React from "react";
import { useRedux } from "./useRedux";
import "./styles.css";

import ShowArea from "./ShowArea";
import Buttons from "./Buttons";

function App() {
  const ReduxContainer = useRedux();
  return (
    <div className="App">
      <ReduxContainer>
        <ShowArea />
        <Buttons />
      </ReduxContainer>
    </div>
  );
}

export default App;
