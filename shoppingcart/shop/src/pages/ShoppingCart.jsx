import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { getProducts } from '../services/productApi'
import ProductGrid from '../components/ProductGrid'
import useCart from '../hooks/useContext'
import Cart from "../components/Cart";
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import ProductModal from '../components/productModal'

const ShoppingCart = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('all')


const { data: products, isLoading, isError, refetch} = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
})

const categories = useMemo(() => {
    return [
        ...new Set(products?.map((product) => product.category))
    ]
}, [products])

const filteredProducts = useMemo(() => {
    return (products || []).filter((product) => {
        const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchCategory = selectedCategory === 'all' || product.category === selectedCategory
        return matchSearch && matchCategory
      })
}, [products, searchQuery, selectedCategory])

    const handleProductSelect = useCallback((product) => {
        setSelectedProduct(product)
    }, [])

if(isLoading) return <div className="shop-status">Loading...</div>
if(isError) return (
    <div className="shop-error">
        <p>Unable to load products. Please try again later.</p>
        <button className="shop-btn" onClick={refetch}>Retry</button>
    </div>
)

    return (
        <div className="shop-page">
            <h1>Shopping Cart</h1>
            <div className="shop-toolbar">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategoryFilter categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
            <div className="shop-layout">
            <ProductGrid products={filteredProducts || []} onSelect={handleProductSelect} />
            <Cart />
            </div>

        {
            selectedProduct && (
                <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )
        }
        </div>
    )

}

export default ShoppingCart