import { Header } from "./components/Header";
import { Meals } from "./components/Meals";
import { CartProvider } from "./store/CartContext";
import { UIProvider } from "./store/UIContext.jsx";
import { Cart } from './components/Cart'
import { Checkout } from "./components/Checkout";
import { Login } from "./components/Login.jsx";

function App() {
  return (
    <UIProvider>
      <CartProvider>
        <Login />
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartProvider>
    </UIProvider>
  );
}

export default App;
