import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import { useInfiniteQuery } from '@tanstack/react-query'
import getProducts from "../services/productApi"
import Loader from "../components/Loader"
import ProductGrid from "../components/ProductGrid"
import SearchBar from "../components/SearchBar"
import EmptyState from "../components/EmptyState"
import CategoryFilter from "../components/CategoryFilter"
import SortDropdown from "../components/SortDropdown"
import ProductModal from "../components/ProductModal"
import Error from "../components/Error"


const ProductPage = () => {

    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('default')
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [category, setCategory] = useState('all')

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: ({ pageParam = 0 }) => getProducts(pageParam),

        initialPageParam: 0,
 
        getNextPageParam: (lastPage, allPages) => {
           const loaded = allPages.reduce(
             (sum, page) => sum + page.products.length,
             0
           )

           if (loaded >= lastPage.total) {
             return undefined
           }

           return loaded
        }

    })

    const loaderRef = useRef(null)

    const handleProductClick = useCallback((product) => {
        setSelectedProduct(product)
    }, [])

    const handleCloseModal = useCallback(() => {
        setSelectedProduct(null)
    }, [])

    useEffect(() => {

        const handleKeyDown = (event) => {
      
          if (event.key === "Escape") {
            handleCloseModal();
          }
      
        };
      
        document.addEventListener(
          "keydown",
          handleKeyDown
        );
      
        return () => {
          document.removeEventListener(
            "keydown",
            handleKeyDown
          );
        };
      
      }, [handleCloseModal]);

    useEffect(() => {
      const element = loaderRef.current
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          const target = entries[0]
          if (target?.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        },
        { root: null, rootMargin: "200px", threshold: 0 }
      )

      observer.observe(element)
      return () => observer.disconnect()
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    const products = data?.pages.flatMap((page) => page.products) ?? []

    const categories = [...new Set(products.map((product => product.category)))]

   const visibleProducts = useMemo(() => {

    const filteredProducts = products.filter((product) => {
    
      const matchesSearch = 
      product.title.toLowerCase().includes(search.toLowerCase())

      const matchesCategory = 
      category === 'all' || product.category === category

      return matchesSearch && matchesCategory

  })

  const sortedProducts = [...filteredProducts]

  if(sort === 'price-low') {
      sortedProducts.sort((a,b) => a.price - b.price)
  }else if(sort === 'price-high'){
      sortedProducts.sort((a,b) => b.price - a.price)
  } else if(sort === 'rating-high'){
      sortedProducts.sort((a,b) => b.rating - a.rating)
  }

  return sortedProducts
   }, [products, search, category, sort])

    

   
    if (isLoading) return <Loader />

    if (isError) return (
        <Error onRetry={refetch} />
    )
    
    return (

        <div>

          <SearchBar search={search} setSearch={setSearch} />

          <CategoryFilter 
          category={category}
          setCategory={setCategory}
          categories={categories}
          />

          <SortDropdown 
          sort={sort}
          setSort={setSort}
          />

           {
            visibleProducts.length > 0 ? (
                <ProductGrid products={visibleProducts} onProductClick={handleProductClick} />
            ) : (
                <EmptyState />
            )
           }

          <div
            ref={loaderRef}
            style={{ minHeight: 40, marginTop: 16, padding: "16px 0", textAlign: "center" }}
            className="scroll-sentinel"
          >
            {isFetchingNextPage && (
              <p>Loading more products...</p>
            )}
            {!hasNextPage && products.length > 0 && (
              <p>No more products to load.</p>
            )}
          </div>

          <ProductModal 
          product={selectedProduct}
          onClose={handleCloseModal}
          />
        </div>

    )

}

export default ProductPage
