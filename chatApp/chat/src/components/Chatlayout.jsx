const ChatLayout = ({children}) => {

    return (
        <>
          <div className='min-h-screen bg-gray-100 p-4'>
            
            <h1 className="text-2xl font-bold mb-4">
                Chat Application
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-lg overflow-hidden min-h-[600px]">
                {children}
            </div>

          </div>
        </>
    )

};

export default ChatLayout;