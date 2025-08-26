import { useContext } from 'react';
import CartContext from '../store/CartContext';
import UiContext from '../store/temp';
import { currencyFormatter } from '../util/formatting';
import { CartItem } from './CartItem';
import { Button } from './UI/Button';
import { Modal } from './UI/Modal';

export const Cart = () => {
    const { cartState: { items = [] } } = useContext(CartContext)
    const { showCartModal, showCheckoutModal, isCartModalOpen } = useContext(UiContext)

    function handleShowCheckoutModal() {
        showCheckoutModal(true);
    }

    const cartTotal = items?.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    return (
        <Modal
            className='cart'
            open={isCartModalOpen}
            onClose={() => showCartModal(false)}
        >
            <h2>Your cart</h2>
            <ul>
                {
                    items?.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))
                }
            </ul>
            <p className='cart-total'>Total price: {currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button
                    textOnly
                    onClick={() => showCartModal(false)}
                >Close</Button>
                {items.length > 0 && (
                    <Button
                        onClick={handleShowCheckoutModal}
                    >Checkout</Button>
                )}
            </p>
        </Modal>
    )
}
