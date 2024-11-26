import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import dessert from "./components/dessert.json";

let initialState = {
  cartItems: [],
  cartContain: JSON.parse(localStorage.getItem("cart") || "[]"),
  quantity: 0,
  cartConfirmed: [],
  isLoading: false,
  isVisible: false,
  error: false,
  scrollTo: false,
};

export const fetchData = createAsyncThunk("fetchData", async () => {
  return dessert;
});

let cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let getCart = state.cartContain.find(
        (cart) => cart.id === action.payload.id
      );

      if (getCart) {
        getCart.quantity += 1;
      } else {
        state.cartContain.push({
          ...action.payload,
          quantity: 1,
        });
        localStorage.setItem("cart", JSON.stringify(state.cartContain));
      }
    },
    removeCart: (state, action) => {
      let existing = state.cartContain.find(
        (data) => data.id === action.payload.id
      );
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.cartContain = state.cartContain.filter(
          (data) => data.id !== action.payload.id
        );
      }
    },
    confirmOrder: (state, action) => {
      state.cartConfirmed.push(...state.cartContain);
      state.isVisible = true;
      state.scrollTo = true;
    },
    toggle: (state) => {
      localStorage.removeItem("cart");
      state.isVisible = false;
      state.cartConfirmed = [];
      state.cartContain = [];
      state.scrollTo = false;
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

export const { addToCart, removeCart, confirmOrder, toggle } =
  cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
