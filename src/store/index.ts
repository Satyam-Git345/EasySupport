import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ticketsReducer from "./ticketsSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

//pass ticket reducer in combinereducer
const rootReducer = combineReducers({ tickets: ticketsReducer });

//define persist key to save data in redux toolkit persist
const persistConfig = {
  key: "easysupport",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//make store to save data in redux toolkit 
export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
