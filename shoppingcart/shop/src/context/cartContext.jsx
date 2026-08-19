import { createContext, useReducer, useEffect } from 'react'

export const CartContext = createContext(null)

const getInitialCart = () => {
    const savedCard = localStorage.getItem('cart')

    if(!savedCard) return { cart: [] }
    
    try {
        const parsed = JSON.parse(savedCard)
        return {
            cart: Array.isArray(parsed) ? parsed : []
        }
    } catch (error) {
        return {
            cart: []
        }
    }

}

const initialState = getInitialCart()

const cartReducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_CART' : {
            const existingProduct = state.cart.find(product  => product.id === action.payload.id
            )
            if(existingProduct){
                return {
                    ...state,
                    cart: state.cart.map(
                      product => product.id === action.payload.id ? {...product, quantity: product.quantity + 1} : product
                    )
                }
            }
            return {
                ...state,
                cart: [...state.cart, {
                    ...action.payload,
                    quantity: 1
                }]
            }
        }
        case 'REMOVE_FROM_CART' :
        return {
            ...state,
            cart: state.cart.filter(
                (item) => item.id !== action.payload
            )
        }
        case 'INCREASE_QUANTITY' :
            return {
                ...state, 
                cart: state.cart.map((item) => item.id === action.payload.id ? {...item , quantity: item.quantity + 1} : item)
        }
        case 'DECREASE_QUANTITY' :
           const product = state.cart.find(item => item.id === action.payload.id)

            if(!product) return state

            if(product.quantity === 1){
                return {
                    ...state,
                    cart: state.cart.filter(item => item.id !== action.payload.id)
                }
            }

            return {
                ...state , 
                cart: state.cart.map(item => item.id === action.payload.id ? {...item , quantity: item.quantity - 1} : item)
        }
        case 'CLEAR_CART' :
            return {
                ...state,
                cart: []
            }



        default:
            return state
    }
}

const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, initialState)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart])

    return (

        <CartContext.Provider value={{state, dispatch}} >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider