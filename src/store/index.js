import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import catalogReduser from "./redusers/catalogReduser";

export default configureStore({
   reducer: {
      catalog: catalogReduser,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});