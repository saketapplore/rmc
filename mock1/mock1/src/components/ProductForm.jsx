import { useState } from 'react'
const ProductForm = ({product, onSave, onCancel}) => {

    const [title, setTitle] = useState(product?.title || '')
    const [brand, setBrand] = useState(product?.brand || '')
    const [price, setPrice] = useState(product?.price || '')
    const [category, setCategory] = useState(product?.category || '')
    const [rating , setRating] = useState(product?.rating || '')
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        const newError = {}

        if(!title.trim()) {
            newError.title = 'Title is required'
        }

        if(!brand.trim()) {
            newError.brand = 'Brand is required'
        }

        if(price <= 0) {
            newError.price = 'Price is required'
        }

        if(!category) {
            newError.category = 'Category is required'
        }
        
        if(rating <= 0 || rating > 5) {
            newError.rating = 'Rating must be between 1 and 5'
        }

        if(Object.keys(newError).length > 0) {
            setError(newError)
            return
        }

        onSave({
            id: product.id || Date.now(),
            title,
            brand,
            price,
            category,
            rating
        })
        onCancel()

    }

    return (

        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>

            <div className='bg-white p-6 rounded-lg w-full max-w-md'>

                <div>
                    <label htmlFor='title' className='block text-sm font-medium text-gray-700'>Title</label>
                    <input 
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full p-2 border rounded-md'
                    />
                </div>

                
                <div>
                    <label htmlFor='title' className='block text-sm font-medium text-gray-700'>Brand</label>
                    <input 
                    type='text'
                    id='brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className='w-full p-2 border rounded-md'
                    />
                </div>

      
                <div>
                    <label htmlFor='price' className='block text-sm font-medium text-gray-700'>Price</label>
                    <input 
                    type='number'
                    id='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className='w-full p-2 border rounded-md'
                    />
                </div>

           
                <div>
                    <label htmlFor='category' className='block text-sm font-medium text-gray-700'>Category</label>
                    <input 
                    type='text'
                    id='category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='w-full p-2 border rounded-md'
                    />
                </div>
       

                <div>
                    <label htmlFor='rating' className='block text-sm font-medium text-gray-700'>Rating</label>
                    <input 
                    type='number'
                    id='rating'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className='w-full p-2 border rounded-md'
                    />
                </div>
           

                <div className='flex justify-between'>
                    <button
                    onClick={onCancel}
                    className='bg-red-500 text-white px-4 py-2 rounded-md'
                    >
                        Cancel
                    </button>
                    <button
                    onClick={handleSubmit}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md'
                    >
                        Save
                    </button>
                </div>

            </div>

        </div>

    )

}

export default ProductForm