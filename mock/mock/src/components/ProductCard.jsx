export const ProductCard = ({product, onEdit, onDelete, onView}) => {

    return (
        <div 
        onClick={() => onView(product)}
        className='cursor-pointer bg-white rounded-xl shadow-sm overflow-hidden'>

            <div className='h-52 bg-gray-100'>
                <img 
                src={product.thumbnail}
                alt={product.name}
                className='w-full h-full object-cover'
                />
            </div>

            <div className= 'p-4'>

                <h2 className='font-semibold text-lg'>
                    {product.title}
                </h2>

                <p className='text-sm text-gray-500 mt-1'> 
                    {product.brand}
                </p>

                <p className='text-sm text-gray-400 mt-1 capitalize'>
                    {product.category}
                </p>

                <div className='flex items-center justify-between mt-4'>

                    <span className='text-lg font-bold'>
                        ${product.price}
                    </span>

                    <span className='test-sm'>
                        {product.rating}
                    </span>

                </div>

                <div className='flex gap-3 mt-4'>
                     <button
                     onClick={(e) => {
                        e.stopPropagation();
                        onEdit(product);
                     }}
                     className='flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg'>
                        Edit
                     </button>
                     <button 
                     onClick={(e) => {
                        e.stopPropagation();
                        onDelete(product.id);
                     }}
                     className='flex-1 bg-red-500 text-white py-2 rounded-lg'>
                        Delete
                     </button>
                </div>

            </div>

        </div>
    )

}

export default ProductCard