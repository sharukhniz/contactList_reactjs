import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./ContactSlice";

const Store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});
export default Store;
