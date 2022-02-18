import React from "react";
import ReactDOM from "react-dom";
import "./main.scss";
import App from "./App";
import { UserProvider } from "./context/UserContext";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
