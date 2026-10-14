const ProductDetailsModal = ({product, onClose}) => {

     if(!product) return;

    return (

          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
  
               <div className='bg-white p-6 rounded-lg max-w-md w-full'>
                    
                    <div className='flex justify-between items-center'>
                        <h2 className='text-2xl font-semibold'>{product.title}</h2>

                       <button
                        onClick={onClose}
                        className='cursor-pointer'
                       >
                          *
                       </button>

                    </div>

                       <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-56 object-contain rounded-lg mb-4"
        />

        <h3 className="text-2xl font-bold mb-2">
          {product.title}
        </h3>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <div className="space-y-2">

          <p>
            <strong>Brand:</strong> {product.brand}
          </p>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Price:</strong> ${product.price}
          </p>

          <p>
            <strong>Rating:</strong> ⭐ {product.rating}
          </p>

        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg"
        >
          Close
        </button>

               </div>
 
          </div>

    )

}

export default ProductDetailsModal