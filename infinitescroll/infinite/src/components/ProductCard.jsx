const ProductCard = ({product}) => {

    return (
       <div className="bg-white rounded-lg shadow-md p-4">
         <h3 className="text-lg font-medium text-gray-900 mt-2">{product.title}</h3>
         <p className="text-gray-600 mt-1">{product.description}</p>
         <p className='text-gray-600 mt-1'>{product.price}</p>
       </div>
    )

}

export default ProductCard