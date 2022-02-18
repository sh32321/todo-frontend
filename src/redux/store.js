import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import todosReducer from "./reducer";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const persistConfig = {
  key: "root",
  storage: storage,
};
const pxReducer = persistReducer(persistConfig, todosReducer);

export const store = createStore(pxReducer, devTools);
export const persistor = persistStore(store);
