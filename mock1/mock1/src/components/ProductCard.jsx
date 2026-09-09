const ProductCard = ({ product, onEdit, onDelete, onView  }) => {

    return (
        <div className='bg-white rounded-lg shadow-sm p-6'
        onClick={() => onView(product)}
        >
              
              <div>
                <img 
                src={product.thumbnail}
                alt={product.title}
                className='w-full h-48 object-cover rounded-lg'
                />
              </div>

              <div>
                <h3 className='text-lg font-bold text-gray-800 mb-2'>
                     {product.title}
                </h3>
                <p className='text-gray-600 mb-4'>
                    {product.brand}
                </p>
                <p className='text-gray-600 mb-4'>
                    {product.category}
                </p>

               <div className='flex items-center justify-between'>
                  <span className='text-green-600 font-bold'>
                    ${product.price}
                  </span>
                  <span className='text-gray-600'>
                    {product.rating}
                  </span>
               </div>

               <div className='flex items-center justify-between'>

                  <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={(e) =>{ onEdit(product); e.stopPropagation()}}>
                    Edit
                  </button>

                  <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={(e) =>{ onDelete(product.id); e.stopPropagation()}}>
                    Delete
                  </button>

               </div>

              </div>

        </div>
    )

}

export default ProductCard