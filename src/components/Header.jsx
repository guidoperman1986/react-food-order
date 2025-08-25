import { useContext } from 'react';
import logoImg from "../assets/logo.jpg";
import { Button } from '../components/UI/Button';
import CartContext from '../store/CartContext.jsx';
import UiContext from "../store/UIContext.jsx";


export const Header = () => {
    const { cartState } = useContext(CartContext);
    const { showCartModal, isCartModalOpen } = useContext(UiContext);
    const newTotalItems = cartState.items.reduce((acc, item) => acc + item.quantity, 0);

    const handleOpeningCart = () => {
        showCartModal(!isCartModalOpen);
    };

    return (
        <header id='main-header'>
            <div id="title">
                <img src={logoImg} alt="Some resto" />
                <h1>React Food</h1>
            </div>

            <nav>
                <Button
                    textOnly
                    onClick={handleOpeningCart}
                >Cart ({newTotalItems})</Button>
            </nav>
        </header>
    )
}
