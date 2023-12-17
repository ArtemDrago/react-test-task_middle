import { createSlice } from "@reduxjs/toolkit";

export const basketReduser = createSlice({
   name:'basket',
   initialState: {
      basketItems: [],
   },
   reducers: {
      addItemToBasket: (state, action) => {
         try {
            let res = action.payload;
            let key = res.keyProduct;
            let newProduct = false;

            if (state.basketItems.length != 0) {
               for (let i = 0; i < state.basketItems.length; i++) {
                  const product = state.basketItems[i];
                  if (key == product.keyProduct) {
                     newProduct = true;
                     break;
                  }
               }
            }
            if (!newProduct) {
               state.basketItems.push(res);
            } else {
               console.log(`Товар с id ${key} уже в корзине`)
            }

         } catch (er) {
           console.log(er);
         }
      },
      removeBasketItem: (state, action) => {
         try {
            let res = action.payload;
            let key = res.keyProduct;

            if (state.basketItems.length != 0) {
               for (let i = 0; i < state.basketItems.length; i++) {
                  const product = state.basketItems[i];
                  if (key == product.keyProduct) {
                     state.basketItems.splice(i,1);
                     break;
                  }
               }
            }
         } catch (er) {
           console.log(er);
         }
      },
   },
   extraReducers: (builder) => {},
   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export const { addItemToBasket, removeBasketItem } = basketReduser.actions;

export default basketReduser.reducer;