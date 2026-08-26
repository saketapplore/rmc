import { useState } from 'react'

const ProductForm = ({ product , onSubmit , onCancel}) => {

    const [title, setTitle] = useState(product?.title || '')
    const [description, setDescription] = useState(product?.description || '')
    const [price, setPrice] = useState(product?.price || '')
    const [brand, setBrand] = useState(product?.brand || '')
    const [category, setCategory] = useState(product?.category || '')
    const [rating , setRating] = useState(product?.rating || '')
    const [thumbnail , setThumbnail] = useState(product?.thumbnail || '')

    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
  
        e.preventDefault()

        const newErrors = {}

        if(!title.trim()) {
            newErrors.title = 'Title is required'
        }

        if(!price || Number(price) <= 0) {
            newErrors.price = 'Price must be greater than 0'
        }

        if(!category.trim()) {
            newErrors.category = 'Category is required'
        }

        if(rating === "" ||
            Number(rating) < 0 ||
            Number(rating) > 5
        ) {
            newErrors.rating = "Rating must be between 0 and 5"
        }

        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return;
        }

        const productData = {
            id: product?.id || Date.now(),
            title: title.trim(),
            description: description.trim(),
            price: Number(price),
            brand: brand.trim(),
            category: category.trim(),
            rating: Number(rating)
        }

        onSubmit(productData)
        
    }

    return (

        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
            <div className='bg-white rounded-xl p-6 w-full max-w-lg'>

                <h2 className='text-xl font-bold mb-6'>
                    {product ? 'Edit Product' : 'Add Product'}
                </h2>

                <form
                onSubmit={handleSubmit}
                className='space-y-4'>
                      <div>
                        <label className='block mb-1 font-medium'>
                            Title
                        </label>
                        <input 
                         type='text'
                         value={title}
                         onChange={(e) => setTitle(e.target.value)}
                         className='w-full border rounded-lg p-2'
                        />
                      </div>
                      <div>
                        <label className='block mb-1 font-medium'>
                            Description
                        </label>
                        <input 
                         type='text'
                         value={description}
                         onChange={(e) => setDescription(e.target.value)}
                         className='w-full border rounded-lg p-2'
                        />
                      </div>
                      <div>
                        <label className='block mb-1 font-medium'>
                            Price
                        </label>
                        <input 
                         type='number'
                         value={price}
                         onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className='block mb-1 font-medium'>
                            Brand
                        </label>
                        <input 
                         type='text'
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
                         type='text'
                         value={category}
                         onChange={(e) => setCategory(e.target.value)}
                         className='w-full border rounded-lg p-2'
                        />
                      </div>
                      <div>
                        <label className='block mb-1 font-medium'>
                            Rating
                        </label>
                        <input 
                         type='number'
                         min="0"
                         max="5"
                         value={rating}
                         onChange={(e) => setRating(e.target.value)}
                         className='w-full border rounded-lg p-2'
                        />

                         {errors.rating && (
                            <p className='text-red-500 text-sm'>
                                {errors.rating}
                            </p>
                         )}

                      </div>

                      <div className='flex justify-end gap-3 pt-4'>
                        <button
                        type='button'
                        onClick={onCancel}
                        className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600'>
                            Cancel
                        </button>
                        <button
                        type='submit'
                        className='bg-blue-600 text-white px-4 py-2 rounded-lg'>
                            {product ? 'Update' : 'Add'}
                        </button>
                      </div>

                </form>

            </div>
        </div>

    )

}

export default ProductForm;