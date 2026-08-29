import {useState, useEffect, useMemo} from 'react'
import getProducts from '../services/productApi'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import SortDropdown from '../components/SortDropdown'
import ProductForm from '../components/ProductForm'
import ProductDetailsModal from '../components/ProductDetailsModal'

const ProductDashboard = () => {

    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('all')
    const [loading , setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [sortOption, setSortOption] = useState('default')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 80
    
    const handleAddProduct = () => {
        setEditingProduct(null)
        setIsFormOpen(true)
    }

    const loadProducts = async () => {

        try {
         setLoading(true)
         setError(null)
         const data = await getProducts()
         setProducts(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        loadProducts()
    }, [])

    const filteredProducts = useMemo(() => {

        let result = products.filter((product) => {
           
            const matchesSearch = 
            product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
         
            const matchesCategory = 
             category === 'all' ||
             product.category === category

            return matchesSearch && matchesCategory

        })

        result = [...result]

        switch(sortOption) {

            case 'price-asc':
              result.sort((a,b) => a.price - b.price)
              break;

            case 'price-desc':
                result.sort((a,b) => b.price - a.price)
                break;
            case 'rating-desc':
                result.sort((a,b) => b.rating - a.rating)
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

    }, [products, searchTerm, category, sortOption])

    const categories = useMemo(() => {
        return [
            ... new Set(
                products.map((product) => product.category)
            )
        ]
    }, [products])

    const handleSaveProduct = (productData) => {

        if(editingProduct) {

            setProducts((prevProducts) => 
              prevProducts.map((product) => 
               product.id === editingProduct.id 
                ? { ...product, ...productData, id: editingProduct.id }
                : product
            )
            )

        } else {
            setProducts((prevProducts) => [
                productData,
                ...prevProducts
            ])
            setCurrentPage(1)
            setSearchTerm('')
            setCategory('all')
            setSortOption('default')
        }
      
        setIsFormOpen(false)
        setEditingProduct(null)
    }

    const handleDeleteProduct = (productId) => {
    
        const confirmed = window.confirm(
            'Are you sure you want to delete this product?'
        )

        if(!confirmed) return;

        setProducts((prevProducts) => 
          prevProducts.filter(
            (product) => product.id !== productId
           )
        )
    }

    const handleEditProduct = (product) => {
        setEditingProduct(product)
        setIsFormOpen(true)
    }

    const handleViewProduct = (product) => {
        setSelectedProduct(product)
        setIsFormOpen(false)
    }

    const handleClearFilters = () => {
        setSearchTerm('')
        setCategory('all')
        setSortOption('default')
    }

    useEffect(() => {
        setCurrentPage(1);
      }, [searchTerm, category, sortOption]);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const paginatedProducts = useMemo(() => {
      
       const startIndex = (currentPage - 1) * productsPerPage

       const endIndex = startIndex + productsPerPage
       
       return filteredProducts.slice(
        startIndex, endIndex
       )

    }, [filteredProducts, currentPage, productsPerPage])

    return (
        
      <div className='min-h-screen bg-gray-50 p-4'>
           
           <div className='max-w-7xl mx-auto'>

               <h1 className='text-2xl'>
                 Product Dashboard
               </h1>

               <button 
                onClick={handleAddProduct}
                className='bg-blue-500 text-white px-4 py-2 rounded-lg'
               >
                Add Product
               </button>

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

               <ProductGrid products={paginatedProducts}
                     onEdit={handleEditProduct}
                     onDelete={handleDeleteProduct}
                     onView={handleViewProduct}
                     loading={loading}
                     error={error}
                     onRetry={loadProducts}
                     onClear={handleClearFilters}
                    />
               {
                selectedProduct && (
                    <ProductDetailsModal 
                     product={selectedProduct}
                     onClose={() => setSelectedProduct(null)}
                    />
                )
               }
               {
                isFormOpen && (
                    <ProductForm 
                     product={editingProduct}
                     onSubmit={handleSaveProduct}
                     onCancel={() => {
                        setIsFormOpen(false)
                        setEditingProduct(null)
                     }}
                    />
                )
               }

           </div>

      </div>        
    )

}

export default ProductDashboard