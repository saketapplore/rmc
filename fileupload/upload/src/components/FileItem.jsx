const FileItem = ({file, onRemove, onRetry}) => {

    const fileSize = (file.size / (1024 * 1024)).toFixed(2)

     const getFileType = (type) => {

        if(type === "application/pdf") {
            return "PDF"
        }

        if(type === "image/png") {
            return "PNG"
        }

        if(type === "image/jpeg") {
            return "JPEG"
        }
        return "File"

     }

     const getStatusText = () => {
        switch(file.status) {
          case "pending":
             return "Waiting...";
           case "uploading":
              return `Uploading... ${file.progress}%`;
           case "success":
              return "uploaded";
            case "error":
                return "Upload failed"
            default:
                return ""
        }
     }

    return (

 <div className="flex items-center justify-between bg-white border rounded-lg p-4">
     <div className="flex items-center gap-3">
                 
                 {
                    file.preview ? (
                        <img 
                            src={file.preview}
                            alt={file.name}
                            className="w-10 h-10 rounded-md"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">{getFileType(file.type)}</span>
                        </div>
                    )
                 }

            <div className="ml-4">
               <p className="font-medium">
                {file.name}
               </p>

                <p className="text-sm text-gray-500">
                {fileSize} MB - {getFileType(file.type)}
              </p>

               <p className="text-sm text-gray-500">
                {getStatusText()}
               </p>

               {
                file.status === 'uploading' && (
                    <div className="mt-2 w-full">

                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                
                      <div
                        className="h-full bg-blue-500 transition-all"
                        style={{
                          width: `${file.progress}%`,
                        }}
                      />
                
                    </div>
                
                  </div>
                )
               }
 
            </div>

      </div>

     <button className="text-red-500 hover:text-red-600" onClick={onRemove}>
        Remove
     </button>

     {
      file.status === 'error' && (
        <button
          onClick={() => onRetry(file.id)}
          className="text-blue-500 hover:text-blue-600"
        >
           Retry
        </button>
      )
     }

</div>
    )

}

export default FileItem