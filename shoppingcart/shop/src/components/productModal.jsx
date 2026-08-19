import { useEffect, useRef } from "react"
import useCart from "../hooks/useContext"

const ProductModal = ({product , onClose}) => {

    const {dispatch} = useCart()

    const handleAddToCart = () => {
        dispatch({type: 'ADD_TO_CART', payload: product})
    }
 
const modalRef = useRef(null)

useEffect(() => {
   
    const handleKeyDown = (e) => {
        if(e.key === 'Escape'){
            onClose()
        }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
        document.removeEventListener('keydown', handleKeyDown)
    }

}, [onClose])

  if(!product) return null

  return (
    <div ref={modalRef} className="product-modal-overlay" onClick={onClose}>
        <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <div className="product-modal-actions">
            <button className="shop-btn" type="button" onClick={onClose}>Close</button>
            <button className="shop-btn shop-btn-primary" type="button" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
        </div>
  );
};

export default ProductModal;