import React from 'react';
import { Guards } from "@/router"
import { Switch } from "react-router-dom"
import { HashRouter } from "react-router-dom"
import {routeConfig} from "@/router/index"
const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Guards routeConfig={routeConfig}></Guards>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
