const ProductDetailModal = ({product, onClose}) => {

    if(!product) return null;

    return (
     
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>

          <div className='bg-white rounded-lg shadow-lg p-6'>
                 
                 <div className='flex justify-between items-center'>
                    <h1>Product Details</h1>
                    <button onClick={onClose}>Close</button>
                 </div>

                 <div className='mt-4'>

                 <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-56 object-contain rounded-lg mb-4"
        />

        <h3 className="text-2xl font-bold mb-2">
          {product.title}
        </h3>

     

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

        
                 </div>
        </div>
      </div>
    );
  };

export default ProductDetailModal;