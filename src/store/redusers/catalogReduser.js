import { createSlice } from "@reduxjs/toolkit";
import { getCatalogItems } from "./asyncGetCatalogItems";

export const catalogReduser = createSlice({
   name:'catalog',
   initialState: {
      catalogItems: [],
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getCatalogItems.fulfilled, (state, action) => {
         try {
            let res = action.payload;
            if (res.length != 0) {
               state.catalogItems = res;
            }
         } catch (er) {
           console.log(er);
         }
      });
   },
});

export default catalogReduser.reducer;