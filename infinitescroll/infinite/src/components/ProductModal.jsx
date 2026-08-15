import "./ProductModal.css"

const ProductModal = ({ product, onClose }) => {

    if (!product) return null

    return (

        <div className="product-modal-overlay" onClick={onClose}>

           <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>

             <h2 className="product-modal-title">
                {product.title}
             </h2>

            <p className="product-modal-description">
                {product.description}
            </p>

            <p className="product-modal-meta">
                Price: ${product.price}
            </p>

            <p className="product-modal-meta">
                Rating: {product.rating}
            </p>

            <button
            className="product-modal-close-btn"
            type="button"
            onClick={onClose}>
                Close
            </button>

           </div>

        </div>

    )

}

export default ProductModal
