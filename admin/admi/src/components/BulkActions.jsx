const BulkActions = ({selectedCount, onDelete}) => {


    if(selectedCount === 0){
        return null;
    }

    return (

        <div className='bg-blue-500 border border-blue-200 rounded-lg p-4 mb-4 flex items-center justify-between'>
           
           <p className='font-medium text-blue-800'>
             {selectedCount} users selected
           </p>

           <button
           type='button'
           onClick={onDelete}
           className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors'
           >
             Delete Selected
           </button>

        </div>

    )

}

export default BulkActions;