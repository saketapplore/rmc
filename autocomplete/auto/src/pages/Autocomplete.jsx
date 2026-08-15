import { useState , useRef , useEffect, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import useDebounce from "../hooks/useDebounce"
import fetchProducts from "../services/productApi"
import SearchInput from "../components/SearchInput"
import SuggestionList from "../components/SuggestionList"
import Error from "../components/Error"
import EmptyState from "../components/EmptyState"
import SelectedProduct from "../components/SelectedProduct"


const Autocomplete = () => {

const searchInputRef = useRef(null)


const [query, setQuery] = useState("")
const [selectedProduct, setSelectedProduct] = useState(null)
const [isOpen, setIsOpen] = useState(false)
const [highlightedIndex, setHighlightedIndex] = useState(-1)

const handleSelect = useCallback((product) => {
    setSelectedProduct(product);
    setQuery(product.title);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const handleKeyDown = (e) => {

    if (!products.length) {
      return;
    }
  
    if (e.key === "ArrowDown") {
      e.preventDefault();
  
      setHighlightedIndex((prev) => {
        if (prev === products.length - 1) {
          return 0;
        }
  
        return prev + 1;
      });
    }
  
    if (e.key === "ArrowUp") {
      e.preventDefault();
  
      setHighlightedIndex((prev) => {
        if (prev <= 0) {
          return products.length - 1;
        }
  
        return prev - 1;
      });
    }

    if(e.key === "Enter"){
      e.preventDefault();

      if(highlightedIndex >= 0){
        handleSelect(products[highlightedIndex]);
      }

    }

    if(e.key === "Escape"){
      setIsOpen(false);
      setHighlightedIndex(-1);
    }

  };

  useEffect(() => {

    const handleOutsideClick = (e) => {

      if(searchInputRef.current && 
        !searchInputRef.current.contains(e.target)
      ){
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }
      document.addEventListener("mousedown" , handleOutsideClick)

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick)
      }

    }

  , [])

  useEffect(() => {
    if (query.trim() === "") {
      setSelectedProduct(null)
    }
  }, [query])

  const debouncedQuery = useDebounce(query, 500);

  const {
    data: products = [],
    isLoading , 
    isError, 
    refetch
  } = useQuery({
    queryKey:["products" , debouncedQuery],
    queryFn: ({signal}) => 
        fetchProducts(debouncedQuery, signal),

    enabled: debouncedQuery.length >= 2
  })

 
return (

    <div>

{
    isOpen && isLoading && (
        <div lassName="mt-2 border rounded-lg p-4 bg-white">
            <p className="text-sm text-gray-500">
                Searching...
            </p>
        </div>
    )
  }

  {
    isOpen && isError && (
        <Error onRetry={refetch} />
    )
  }

  {
    isOpen && 
    !isLoading &&
    !isError &&
    debouncedQuery.length > 2 &&
    products.length === 0 && (
        <EmptyState />
    )
  }


        <h1>Product Search</h1>

<div ref={searchInputRef}>
        <SearchInput 
         query={query}
         setQuery={setQuery}
         setIsOpen={setIsOpen}
         onKeyDown={handleKeyDown}
        />


{isOpen && !isLoading && !isError && products.length > 0 && (

<SuggestionList 
 products={products}
 onSelect={handleSelect}
 highlightedIndex={highlightedIndex}
/>

)}

</div>

{selectedProduct && (
<SelectedProduct product={selectedProduct} />
)}



    </div>

)


}

export default Autocomplete