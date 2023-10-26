import {
    ADD_TO_CART,
    REMOVE_FROM_CART
} from "./productTypes"

const initialState = {
    cart: [],
    error: ''
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
          
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(prod => prod._id !== action.payload)
            }
        default: return state
    }
}

export default productReducer;