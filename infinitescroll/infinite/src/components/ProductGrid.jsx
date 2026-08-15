import ProductCard from "./ProductCard"
import {memo} from "react"

const ProductGrid = ({ products = [] , onProductClick}) => {
  
    return (

        <div className="product-grid">

            {
                products.map((product) => (
                    <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
                ))
            }

        </div>

    )

}

export default memo(ProductGrid)