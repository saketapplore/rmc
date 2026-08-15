const SelectedProduct = ({ product }) => {
    
    if(!product){
        return null;
    }

    return (
        <div>
            <h2>Selected Product</h2>

         <p>
            {product.title}
         </p>

         <p>
            {product.price}
         </p>

         <p>
            {product.rating}
         </p>

         <p>
            {product.category}
         </p>

        </div>
    )

}

export default SelectedProduct;