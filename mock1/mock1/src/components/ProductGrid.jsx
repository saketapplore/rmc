import ProductCard from './ProductCard'
import EmptyState from './EmptyState'
const ProductGrid = ({ products, onEdit , onDelete, onView, error, onRetry, onClearFilters}) => {

    if(error) {
        return (
            <div className='flex flex-col items-center justify-center h-full'>
                <p>No Products found....</p>

                <button
                onClick={onRetry}
                className='bg-blue-500 text-white px-4 py-2 rounded-md'
                >
                    Retry
                </button>

            </div>
        )
    }

   if(products.length === 0){
    return (
        <EmptyState onClear={onClearFilters} />
    )
   }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                products.map((product) => (
                    <ProductCard
                    key={product.id}
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