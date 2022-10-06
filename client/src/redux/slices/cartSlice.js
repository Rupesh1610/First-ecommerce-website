import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProducts: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addCart: (state, action) => {
            state.cartProducts.push(action.payload)
            state.quantity += 1
            state.total = action.payload.price * action.payload.Quantity
        }
    }
})

export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;

export const fetchCartItems = () => {
    return async function fetchCartItemsThunk(dispatch, getState) {
        const res = await fetch('/api/cart/:id')
        const data = await res.json()
        dispatch(addCart(data))
    }
}