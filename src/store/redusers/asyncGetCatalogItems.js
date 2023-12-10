import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../../services/api";

export const getCatalogItems = createAsyncThunk(
   "catalog/getCatalogItems",
   async () => {
     let res = await getProducts();
     return res;
   }
);