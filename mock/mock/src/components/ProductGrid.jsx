import ProductCard from './ProductCard'
import SkeletonCard from './SkeletonCard'
import EmptyState from './EmptyState'
const ProductGrid = ({products, onEdit, onDelete , onView, loading, error, onRetry, onClear}) => {

    if (loading) {
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        );
      }

      if(error) {
         return (

           <div className='bg-white rounded-xl p-8 text-center'>
             <p>Unable to load products.</p>

             <button
              type="button"
              onClick={onRetry}
              className='bg-blue-600 text-white px-4 py-2 rounded-lg'
             >
               Retry
             </button>

           </div>

         )
      }

    
      if (products.length === 0) {
        return <EmptyState onClear={onClear} />
      }

      return (

        <div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        >
            {
                products.map((product) => (
                    <ProductCard key={product.id}
                     product={product}
                     onEdit={onEdit}
                     onDelete={onDelete}
                     onView={onView}
                    />
                ))}
        </div>
    )

}

export default ProductGrid