import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "./cartSlice";

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { placeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
