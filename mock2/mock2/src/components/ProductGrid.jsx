import ProductCard from "./ProductCard";

const ProductGrid = ({products, onEdit, onDelete, onView }) => {

    return (

        <div className='grid
          grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6
        '>
           {
            products &&
            products.map((product) => (
                <ProductCard key={product.id}   
                 product={product}
                 onEdit={onEdit}
                 onDelete={onDelete}
                 onView={onView}
                />
            ))
           } 

        </div>

    )

}

export default ProductGrid