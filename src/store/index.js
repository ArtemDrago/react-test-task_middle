import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import catalogReduser from "./redusers/catalogReduser";
import basketReduser from "./redusers/basketReduser";

export default configureStore({
   reducer: {
      catalog: catalogReduser,
      basket: basketReduser,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});