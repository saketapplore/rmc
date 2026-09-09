import { useEffect, useState, useMemo} from 'react'
import getProducts from '../services/productApi'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import SortDropdown from '../components/SortDropdown'
import ProductForm from '../components/ProductForm'
import ProductDetailModal from '../components/ProductDetailModal'

const ProductDashboard = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [sortOption, setSortOption] = useState('default')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingProduct, setIsEditingProduct] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 10

    const handleAddProduct = () => {
      setIsFormOpen(true)
      setIsEditingProduct(null)
    }

    const handleViewProduct = (product) => {
      setSelectedProduct(product)
    }

    const handleEditProduct = (product) => {
      setIsFormOpen(true)
      setIsEditingProduct(product)
    }

  const handleSaveProduct = (productData) => {
    if(editingProduct){
      setProducts(
        prevProducts => prevProducts.map(p => p.id === productData.id ? productData : p)
      )
    } else {
      setProducts(
        [...products, productData]
      )
    }
    setIsFormOpen(false)
    setIsEditingProduct(null)
  }

  const handleDeleteProduct = (productId) => {

    const confirmed = window.confirm('Are you sure you want to delete this product?')

    if(!confirmed) return;

    setProducts(
      prevProducts => prevProducts.filter(
        p => p.id !== productId
      )
    )

    setIsFormOpen(false)
    setIsEditingProduct(null)

  }

    const fetchProducts = async () => {
         setLoading(true)
         setError(null)
         try {
            const data = await getProducts()
            setProducts(data.products)
            setLoading(false)
         } catch (error) {
            setError(error.message)
         } finally {
            setLoading(false)
        }

    }

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
          categoryFilter === 'all' ||
          product.category === categoryFilter;
    
        return matchesSearch && matchesCategory;
      });

      result = [...result]

      switch (sortOption) {
        case 'price-asc':
          result.sort((a,b) => a.price - b.price)
          break;
        case 'price-desc':
          result.sort((a,b) => b.price - a.price)
          break;
        case 'name-asc':
          result.sort((a,b) => a.title.localeCompare(b.title))
          break;
        case 'name-desc':
          result.sort((a,b) => b.title.localeCompare(a.title))
          break;
        default:
          break;
      }

      return result


    }, [products, searchTerm, categoryFilter, sortOption])

    const categories = useMemo(() => {
       return [...new Set(products.map((product) => product.category))]
    }, [products])

    const handleClearFilters = () => {
      setSearchTerm('')
      setCategoryFilter('all')
      setSortOption('default')
    }

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    
    const paginatedProducts = useMemo(() => {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      return filteredProducts.slice(startIndex, endIndex)
    }, [filteredProducts, currentPage, productsPerPage])

    useEffect(() => {
      setCurrentPage(1)
    }, [searchTerm, categoryFilter, sortOption])

    useEffect(() => {
        fetchProducts()
    } , [])

    return (
       <div className='min-h-screen bg-gray-100'>
          <div className='max-w-7xl mx-auto px-4 py-8'>

                <button
                onClick={handleAddProduct}
                className='bg-blue-500 text-white px-4 py-2 rounded-md mb-6'
                >
                  Add Product
                </button>
                
                {
                  isFormOpen && (
                    <ProductForm 
                    product={editingProduct || {}}
                    onCancel={() => {setIsFormOpen(false)
                      setIsEditingProduct(null)
                    }}
                    onSave={handleSaveProduct}
                    />
                  )
                }

                <h1 className='text-3xl font-bold text-gray-800 mb-6'>Product Management</h1>

                  <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  />

                  <CategoryFilter
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  categories={categories}
                  /> 

                  <SortDropdown
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  />

                {
                  loading ? (
                    <div> Loading.... </div>
                  ) 
                  : error ? (
                    <div> Error: {error} </div>
                  ) : 
                  (
                    <ProductGrid products={paginatedProducts} onEdit={handleEditProduct} onDelete={handleDeleteProduct} 
                    onView={handleViewProduct}
                    error={error}
                    onRetry={fetchProducts}
                    onClearFilters={handleClearFilters}
                    /> 
                  )
                }

                {
                  totalPages > 1 &&
                  <div className='flex justify-center items-center mt-6'>
                     <button
                     onClick={() => setCurrentPage(currentPage - 1)}
                     disabled={currentPage === 1}
                     className='bg-blue-500 text-white px-4 py-2 rounded-md'
                     >
                       Previous
                     </button>
                     <span className='mx-4 text-gray-500'>
                      Page {currentPage} of {totalPages}
                     </span>
                     <button
                     onClick={() => setCurrentPage(currentPage + 1)}
                     disabled={currentPage === totalPages}
                     className='bg-blue-500 text-white px-4 py-2 rounded-md'
                     >
                       Next
                     </button>
                  </div>
                }

                {selectedProduct && (
                  <ProductDetailModal
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                  />
                )}

          </div>
       </div>

    )

}

export default ProductDashboard