const ProductCard = ({product, onEdit, onDelete , onView}) => {

    return(

         <>
         
         <div
         onClick={() => onView(product)}
         className = 'bg-white border border-gray-200 rounded-lg p-4'>
            <div>
                <img 
                  src={product.thumbnail}
                  alt={product.title}
                  className='h-52 object-cover rounded-lg mb-4 w-full'
                />
            </div>

            <div className='p-4'>
                  
                  <h2 className='h-2 text-lg font-semibold mt-4'>
                    {product.title}
                  </h2>
                 
                 <div className=' flex items-center justify-between mt-20'>

                  <p className="mt-4 text-md font-semobold">
                    {product.brand}
                  </p>

                  <p className='mt-1 text-md font-semibold'>
                    {product.category}
                  </p>

                  </div>

                  <div className='flex items-center mt-4 justify-between'>
                     <span className='text-lg font-bold'>
                          ${product.price}
                     </span>

                     <span className='text-lg font-semibold'> 
                        {product.rating}
                     </span>

                  </div>

                  <div className='flex items-center justify-between mt-4'>
                       <button 
                       onClick={(e) => {e.stopPropagation(); onEdit(product)}}
                       className='text-lg font-semibold border border-blue-300 rounded-lg p-2'>
                          Edit
                       </button>

                      <button 
                      onClick={(e) => {e.stopPropagation(); onDelete(product.id)}}
                      className='text-lg font-semibold border border-red-300 rounded-lg p-2'>
                          Delete
                       </button>

                  </div>

            </div>

         </div>

         </>

    )

}

export default ProductCard