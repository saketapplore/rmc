import getProducts from "../services/productApi"
import { useState, useMemo,useEffect } from "react"
import ProductGrid from "../components/ProductGrid"
import SearchBar from "../components/SearchBar"
import CategoryFilter from "../components/CategoryFilter"
import SortDropdown from "../components/SortDropdown"
import ProductForm from "../components/ProductForm"
import ProductDetailsModal from "../components/ProductDetailsModal"

const ProductDashboard = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [searchTerm, setSearchTerm] = useState('')
    const [category , setCategory] = useState('all')
    const [sortOption , setSortOption] = useState('default')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingProduct, setIsEditingProduct] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const productperPage = 10;
    


    const fetchProducts = async () => {
        
        setLoading(true)
        setError("")

        try {
            const response = await getProducts()
            setProducts(response)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleViewProduct = (product) => {
        setSelectedProduct(product)
    }

    const handleAddProduct = () => {
        setIsEditingProduct(null)
        setIsFormOpen(true)
    }

    const handleEditProduct = (product) => {
        setIsEditingProduct(product)
        setIsFormOpen(true)
    }

    const handleDeleteProduct = (productId) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?')

        if(!confirmed) return;

        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId))

    }

    const handleSaveProduct = (productData) => {

        if(editingProduct){

            setProducts((prevProducts) => 
                 prevProducts.map((product) => 
                 product.id === productData.id ? productData : product 
                )
            )

        } else {
            setProducts((prevProducts) => [
                ...prevProducts , productData
            ])
        }

        setIsFormOpen(false)
        setIsEditingProduct(null)

    }

    useEffect(() => {
       fetchProducts()
    }, [])

    const filteredProducts = useMemo(() => {

        let result = products.filter((product) => {
        
            const matchesSearch =
      product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.brand
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
                      

            const matchesCategory = 
            category === 'all' ||
            product.category === category

            return matchesSearch && matchesCategory

         }
        )

        result = [...result]

        switch (sortOption){

            case 'default':
                return result;

            case 'price-asc':
                return result.sort((a,b) => a.price - b.price)

            case 'price-desc':
                return result.sort((a,b) => b.price - a.price)

            case 'name-asc':
                return result.sort((a,b) => a.title.localeCompare(b.title))
        
            case 'name-desc':
                return result.sort((a,b) => b.title.localeCompare(a.title))

            }
        
            return result


    } , [searchTerm , products , category, sortOption ])

    const totalPages = Math.ceil(filteredProducts.length / productperPage)

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * productperPage;
        const endIndex = startIndex + productperPage
        return filteredProducts.slice(startIndex , endIndex)
    } , [filteredProducts, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    } , [searchTerm , category , sortOption])
   
    const categories = useMemo(() => {

        return [
            ...new Set(products.map(p => p.category))
        ]

    }, [products])

    

  

    return(
        <>
        
        <div className="min-h-screen">

            <div className='max-w-7xl mx-auto'>

                  <button 
                   onClick={handleAddProduct}
                   className='text-black bg-blue-500 p-2 rounded'
                  >
                    Add Product
                  </button>
                  
                  <h1 className='text-xl'>Product Management</h1>

                  {
                    loading && <p className="text-center text-blue-600 font-bold">Loading Products...</p>
                  }

                  {
                    error && <p className='text-center text-red-600 font-bold'>{error}</p>
                  }

                  <SearchBar 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm}
                  />

                 <CategoryFilter 
                  categories={categories}
                  category={category}
                  setCategory={setCategory}
                 />

                 <SortDropdown 
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                 />

                 {
                    isFormOpen &&
                    <ProductForm 
                     product={editingProduct}
                     onSubmit={handleSaveProduct}
                     onCancel = {() => {
                        setIsFormOpen(false)
                        setIsEditingProduct(null)
                     }}
                    />
                 }


                  {
                    !loading && !error && (
                       <ProductGrid 
                        products = {paginatedProducts}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                        onView={handleViewProduct}
                       />    
                    )
                  }

                  {
                    selectedProduct &&
                    <ProductDetailsModal 
                     product={selectedProduct}
                     onClose={() => setSelectedProduct(null)}
                    />
                  }


                  {
                    paginatedProducts.length > 0 && (
                       <div className='flex justify-center mt-8 '>
                         <button
                         disabled={currentPage === 1}
                         onClick={() => setCurrentPage(currentPage - 1)}
                         className='px-4 py-2 border border-gray-300 rounded-lg bg-gray-800 text-white cursor-pointer'
                         >
                            Previous
                         </button>

                         <span className="text-lg font-semibold">
                            {currentPage} of {totalPages}
                         </span>

                        <button
                         disabled={currentPage === totalPages}
                         onClick={() => setCurrentPage(currentPage + 1)}
                         className='px-4 py-2 border border-gray-300 rounded-lg bg-gray-800 text-white cursor-pointer   '
                         >
                            Next
                         </button>
                         
                       </div>
                    )
                  }

            </div>

        </div>

        </>
    )

}

export default ProductDashboard