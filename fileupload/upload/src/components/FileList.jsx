import FileItem from './FileItem'

const FileList = ({files, onRemoveFile, onRetry}) => {

    if(!files || files.length === 0){
        return (
            <div className="mt-6 text-center text-gray-500">
              <p className="text-lg">
                No files selected
              </p>
            </div>
          );
    }

    return (

        <div className="mt-6">
            <h2 className="text-lg font-medium mb-4">
                Selected Files
            </h2>

            <div className="space-y-3">
      
                {
                    files.map((file) => (
                        <FileItem 
                         key={file.id}
                         file={file}
                         onRemove={() => onRemoveFile(file.id)}
                         onRetry={onRetry}
                        />
                    ))
                }

            </div>

        </div>

    )

}

export default FileList
