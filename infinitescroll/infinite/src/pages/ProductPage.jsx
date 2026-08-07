import { useQuery , useInfiniteQuery } from '@tanstack/react-query'
import getProducts from "../services/productApi"
import Loader from "../components/Loader"
import ProductGrid from "../components/ProductGrid"


const ProductPage = () => {

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: ({pageParam = 0}) => getProducts(pageParam),

        initialPageParam: 0,
 
        getNextPageParam: (lastPage, allPages) => {
           const totalProducts = lastPage.total;
           const loadedProducts = allPages.length * 10

           if(loadedProducts >= totalProducts) {
            return undefined;
           }
 
         return loadedProducts;
        }

    })

    const products = data?.pages.flatMap((page) => page.products)

    if (isLoading) return <Loader />

    if (isError) return <div>Error: {error.message}</div>

    
    return (

        <div>
          <ProductGrid products={products} />
        </div>

    )

}

export default ProductPage