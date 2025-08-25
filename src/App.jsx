import { Header } from "./components/Header";
import { Meals } from "./components/Meals";
import { CartProvider } from "./store/CartContext";
import { UIProvider } from "./store/UIContext";
import { Cart } from './components/Cart'
import { Checkout } from "./components/Checkout";

function App() {
  return (
    <UIProvider>
      <CartProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartProvider>
    </UIProvider>
  );
}

export default App;
