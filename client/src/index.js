import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./store/actions/authActions";
import store from "./store/store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
