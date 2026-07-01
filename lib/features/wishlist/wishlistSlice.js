import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
    },
    reducers: {
        toggleWishlist: (state, action) => {
            const { productId } = action.payload
            const idx = state.items.indexOf(productId)
            if (idx >= 0) {
                state.items.splice(idx, 1)
            } else {
                state.items.push(productId)
            }
        },
        removeFromWishlist: (state, action) => {
            const { productId } = action.payload
            state.items = state.items.filter(id => id !== productId)
        },
        clearWishlist: (state) => {
            state.items = []
        },
    }
})

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
