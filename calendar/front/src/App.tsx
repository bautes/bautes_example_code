import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main, Project } from "./routes";
import { Provider } from "react-redux";
import store from "./redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/:showId/episode/:id">
              <Project />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
