import { useContext } from "react"
import { currencyFormatter } from "../util/formatting"
import CartContext from "../store/CartContext"

export const CartItem = ({ item }) => {
    const { addItem, removeItem } = useContext(CartContext)

    const handleRemove = () => {
        removeItem(item)
    }

    const handleAdd = () => {
        addItem(item)
    }

    return (
        <li>
            <div className="cart-item">
                <img
                    style={{ width: '100px', objectFit: 'cover' }}
                    src={'https://nest-food-order-backend.onrender.com/' + item.image}
                    alt={item.name}
                />
                <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {currencyFormatter.format(item.price * item.quantity)}</p>
                </div>

                <p className="cart-item-actions">
                    <button onClick={handleRemove}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={handleAdd}>+</button>
                </p>
            </div>
        </li>
    )
}
