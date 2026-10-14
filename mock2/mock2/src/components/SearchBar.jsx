const SearchBar = ({searchTerm, setSearchTerm}) => {

   return (
 
    <div className='mt-4'>
        
     <input 
     type='text'
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)}
     placeholder = 'Search Products...'
     className='px-4 py-2 border rounded-lg'
     />   

    </div>     

   )

}

export default SearchBar