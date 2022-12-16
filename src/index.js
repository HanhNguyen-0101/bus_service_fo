import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-quill/dist/quill.snow.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/configStore";
import { HashRouter } from "react-router-dom";
import { history } from "./utils/history";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
