import './App.css'
import './styles/shop.css'
import ShoppingCart from './pages/ShoppingCart'
import CartProvider from './context/cartContext'


function App() {


  return (
    <>
     <CartProvider>
       <ShoppingCart />
     </CartProvider>
    </>
  )
}

export default App
