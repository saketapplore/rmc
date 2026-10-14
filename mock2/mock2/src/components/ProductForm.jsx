import { useState, useEffect } from "react";


const ProductForm = ({product , onSubmit , onCancel}) => {

    const [title, setTitle] = useState(product?.title || '')
    const [price, setPrice] = useState(product?.price ?? '')
    const [category, setCategory] = useState(product?.category || '')
    const [brand, setBrand] = useState(product?.brand || '')
    const [rating, setRating] = useState(product?.rating ?? '')
    const [thumbnail, setThumbnail] = useState(product?.thumbnail || '')

    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
    
        e.preventDefault()

        const newErrors = {}

        

        if(!title.trim()){
            newErrors.title = 'Title is required'
        }

        if(!price || Number(price) <= 0){
            newErrors.price = 'Valid price is required'
        }

        if(rating === "" || Number(rating) < 0 || Number(rating) > 5){
            newErrors.rating = 'Rating must be between 0 and 5'
        }

        if(!category.trim()){
            newErrors.category = "Category is required"
        }

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors)
            return;
        }

        const productData = {
            id: product?.id || Date.now(),
            title: title.trim(),
            price: Number(price),
            brand: brand.trim(),
            category: category.trim(),
            rating: Number(rating),
            thumbnail: thumbnail.trim()
        }

        onSubmit(productData)

    }


    return (

         <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
             <div className='bg-white rounded-xl p-6 w-full max-w-lg'>

               <h2 className="text-2xl font-bold mb-6">
                 {product ? 'Edit Product' : 'Add Product'}
               </h2>
               
               <form className='space-y-4' 
               onSubmit={handleSubmit} 
               > 

                  

                  <div>
                    <label className='block mb-1 font-medium'>
                       Title
                    </label>

                    <input 
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     className='w-full border rounded-lg p-2'
                    />

                    {errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title}</p>}

                  </div>

                   <div>
                    <label className='block mb-1 font-medium'>
                       Price
                    </label>

                    <input 
                     type="number"
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     className='w-full border rounded-lg p-2'
                    />

                    {errors.price && <p className='text-red-500 text-sm mt-1'>{errors.price}</p>}

                  </div>

                   <div>
                    <label className='block mb-1 font-medium'>
                       Brand
                    </label>

                    <input 
                     value={brand}
                     onChange={(e) => setBrand(e.target.value)}
                     className='w-full border rounded-lg p-2'
                    />

                  </div>

                   <div>
                    <label className='block mb-1 font-medium'>
                       Category
                    </label>

                    <input 
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                     className='w-full border rounded-lg p-2'
                    />

                    {errors.category && <p className='text-red-500 text-sm mt-1'>{errors.category}</p>}

                  </div>

                   <div>
                    <label className='block mb-1 font-medium'>
                        Rating       
                   </label>

                    <input 
                     type='number'
                     step="0.1"
                     value={rating}
                     onChange={(e) => setRating(e.target.value)}
                     className='w-full border rounded-lg p-2'
                    />

                    {errors.rating && <p className='text-red-500 text-sm mt-1'>{errors.rating}</p>}

                  </div>

                  <div>
  <label className="block mb-1 font-medium">
    Image URL
  </label>

  <input
    type="text"
    value={thumbnail}
    onChange={(e) => setThumbnail(e.target.value)}
    placeholder="https://..."
    className="w-full border rounded-lg p-2"
  />
                  </div>

             
                 <div className='flex justify-between'>

                  <button
                   className='text-black bg-red-500 p-2 rounded'
                   onClick={onCancel}
                   type="button"
                  >
                    Cancel
                  </button>

                  <button
                   type="submit"
                   className='text-black bg-blue-500 p-2 rounded'
                  >
                    {product ? 'Update' : 'Save'}
                  </button>

                  </div>

               </form>

             </div>
         </div>
         

    )

}

export default ProductForm