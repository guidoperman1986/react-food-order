import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import { Modal } from './UI/Modal';
import { Input } from './UI/Input';
import { Button } from './UI/Button';
import UiContext from '../store/temp';
import { useHttp } from '../hooks/useHttp';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export const Checkout = () => {
    const { cartState: { items = [] }, clearCart } = useContext(CartContext)
    const {
        showCheckoutModal,
        isCheckoutModalOpen,
        isSuccessOrderModalOpen,
        showSuccessOrderModal,
        showCartModal
    } = useContext(UiContext)

    const { data, isLoading: isSending, error, sendRequest } = useHttp('http://localhost:3000/orders', requestConfig);

    function placeOrder(formData) {
        /* // Send the order to the server or process it

        const fullName = formData.get('full-name');
        const email = formData.get('email');
        const street = formData.get('street');
        const postalCode = formData.get('postal-code');
        const city = formData.get('city');

        //validations
        if (!fullName || !email || !street || !postalCode || !city) {
            // Handle validation errors
            return;
        } */

    }

    function submitOrder(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const customerData = Object.fromEntries(formData.entries());

        sendRequest({
            order: {
                customer: customerData,
                items,
            }
        });
        showCheckoutModal(false);
        showSuccessOrderModal(true);
    }

    function handleCloseModals() {
        showSuccessOrderModal(false);
        showCartModal(false);

        clearCart();
    }

    const cartTotal = items?.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    let actions = <>
        {
            isSending
                ? <span>Sending Order...</span> :
                <>
                    <Button
                        textOnly
                        type="button"
                        onClick={() => showCheckoutModal(false)}
                    >Close</Button>
                    <Button type="submit">Place Order</Button>
                </>
        }
    </>;

    if (data.ok && error === undefined) {
        return <Modal open={isSuccessOrderModalOpen} onClose={() => showSuccessOrderModal(false)}>
            <h2>Success!</h2>
            <p>Your order has been placed successfully!</p>
            <p>We will get back to you shortly.</p>

            <p className='modal-actions'>
                <Button                    
                    type="button"
                    onClick={handleCloseModals}
                >Close</Button>
            </p>
        </Modal>
    }

    return (
        <Modal
            open={isCheckoutModalOpen}
            onClose={() => showCheckoutModal(false)}
        >
            <form onSubmit={submitOrder}>
                <h2>Checkout</h2>
                <p>Total amount: <span>{currencyFormatter.format(cartTotal)}</span></p>

                <Input label="Full Name" id="name" />
                <Input label="Email Address" id="email" type="email" />
                <Input label="Street" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" id="postal-code" />
                    <Input label="City" id="city" />
                </div>

                {
                    error &&
                    <Error
                        title="Failed to submit the order"
                        message={error}
                    ></Error>
                }

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}