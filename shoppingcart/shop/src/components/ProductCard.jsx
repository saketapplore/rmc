import useCart  from "../hooks/useContext"
import { memo } from "react"



const ProductCard = memo(({product , onSelect}) => {

    const {dispatch} = useCart()

    const handleAddToCart = () => {
        dispatch({type: 'ADD_TO_CART', payload: product})
    }

    return (
        <div className="product-card" onClick={() => onSelect(product)}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={(e) => {
                e.stopPropagation()
                handleAddToCart()
            }}>Add to Cart</button>
        </div>
    )

})  

export default ProductCard