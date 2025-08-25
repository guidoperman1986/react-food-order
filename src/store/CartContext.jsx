import { Children, createContext, useReducer } from 'react';

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (item) => { },
    clearCart: () => { }
});

const cartReducer = (state, action) => {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload?.id);

    switch (action.type) {
        case 'ADD_ITEM':
            if (existingCartItemIndex !== -1) {
                const updatedItems = state.items.map(item => {
                    if (item.id === action.payload.id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });

                return { ...state, items: updatedItems };

            } else {
                return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
            }

        case 'REMOVE_ITEM':
            if (existingCartItemIndex !== -1) {
                const existingItem = state.items[existingCartItemIndex];
                if (existingItem.quantity > 1) {
                    const updatedItems = state.items.map(item => {
                        if (item.id === action.payload.id) {
                            return { ...item, quantity: item.quantity - 1 };
                        }
                        return item;
                    });
                    return { ...state, items: updatedItems };
                } else {
                    const updatedItems = state.items.filter(item => item.id !== action.payload.id);
                    return { ...state, items: updatedItems };
                }
            } else {
                console.warn('Item not found in cart');
                return state;
            }

        case 'CLEAR_CART':
            return { ...state, items: [] };

        default:
            return state;
    }
}

export const CartProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

    const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
    const removeItem = (item) => dispatch({ type: 'REMOVE_ITEM', payload: item });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    return (
        <CartContext.Provider value={{ cartState, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;