import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { urls } from "./utils/urlUtils";
import { Provider } from "react-redux";
import store from "./store";
import "typeface-roboto";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path={urls.home.path} component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
