import { createContext, useReducer } from 'react';

const UiContext = createContext({
    isCartModalOpen: false,
    isCheckoutModalOpen: false,
    isSuccessOrderModalOpen: false,
    showCartModal: (show) => { },
    showCheckoutModal: (show) => { },
    showSuccessOrderModal: (show) => { }
});

const uiReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_CART_MODAL':
            return {
                ...state,
                isCartModalOpen: action.payload
            };
        case 'SHOW_CHECKOUT_MODAL':
            return {
                ...state,
                isCheckoutModalOpen: action.payload
            };
        case 'SHOW_SUCCESS_ORDER_MODAL':
            return {
                ...state,
                isSuccessOrderModalOpen: action.payload
            };
        default:
            return state;
    }
};

export const UIProvider = ({ children }) => {
    const [uiState, dispatch] = useReducer(uiReducer, {
        isCartModalOpen: false,
        isCheckoutModalOpen: false,
        isSuccessOrderModalOpen: false
    });

    const showCartModal = (show) => {
        dispatch({
            type: 'SHOW_CART_MODAL',
            payload: show
        });
    };

    const showCheckoutModal = (show) => {
        dispatch({
            type: 'SHOW_CHECKOUT_MODAL',
            payload: show
        });
    };

    const showSuccessOrderModal = (show) => {
        dispatch({
            type: 'SHOW_SUCCESS_ORDER_MODAL',
            payload: show
        });
    };

    return (
        <UiContext.Provider value={{
            isCartModalOpen: uiState.isCartModalOpen,
            isCheckoutModalOpen: uiState.isCheckoutModalOpen,
            isSuccessOrderModalOpen: uiState.isSuccessOrderModalOpen,
            showCartModal,
            showCheckoutModal,
            showSuccessOrderModal
        }}>
            {children}
        </UiContext.Provider>
    );
}

export default UiContext;