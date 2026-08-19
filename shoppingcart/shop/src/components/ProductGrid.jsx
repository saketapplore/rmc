import ProductCard from './ProductCard'

const ProductGrid = ({products, onSelect}) => {

     return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={onSelect} />
            ))}
        </div>
     )

}

export default ProductGrid