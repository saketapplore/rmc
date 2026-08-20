import { useState, useRef, useMemo } from 'react'
import DropZone from '../components/DropZone'
import FileList from '../components/FileList'
import UploadSummary from '../components/UploadSummary'
import uploadFile from '../services/uploadApi'

const FileUpload = () => {
   
    const uploadControllers = useRef({})

    const [files, setFiles] = useState([])

    const [errors, setErrors] = useState([])

    const handleRemoveFile = (id) => {
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id))
    }

    const handleRetry = (fileId) => {
      handleUploadFile(fileId)
    }

    const handleClearCompleted = () => {
      setFiles((prevFiles) =>
       prevFiles.filter((file) => file.status !== "success")
      )
    }

    const overallProgress = useMemo(() => {

      if (!files.length) return 0;
    
      const totalProgress = files.reduce(
        (sum, file) => sum + file.progress,
        0
      );
    
      return Math.round(
        totalProgress / files.length
      );
    
    }, [files]);

    const handleCancel = (fileId) => {
      const cancel = uploadControllers.current[fileId];

      if(cancel){
        cancel()
      }

    }

    const handleUploadAll = () => {
     
      const pendingFiles = files.filter(
        (file) => file.status === "pending"
      )

      pendingFiles.forEach((file) => {
        handleUploadFile(file.id)
      })

    }
    
    const handleUploadFile = async (fileId) => {

      const fileToUpload = files.find(
        (file) => file.id === fileId
      );
    
      if (!fileToUpload) return;
    
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === fileId
            ? {
                ...file,
                status: "uploading",
                progress: 0,
                error: null,
              }
            : file
        )
      );
    
    
      const upload = uploadFile(
        fileToUpload.file,
        (progress) => {
    
          setFiles((prevFiles) =>
            prevFiles.map((file) =>
              file.id === fileId
                ? {
                    ...file,
                    progress,
                  }
                : file
            )
          );
    
        }
      );
    
    
      uploadControllers.current[fileId] = upload.cancel;
    
    
      try {
    
        await upload.promise;
    
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileId
              ? {
                  ...file,
                  status: "success",
                  progress: 100,
                }
              : file
          )
        );
    
      } catch (error) {
    
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileId
              ? {
                  ...file,
                  status: "error",
                  error: error.message,
                }
              : file
          )
        );
    
      } finally {
    
        delete uploadControllers.current[fileId];
    
      }
    
    };

  return (

     <div className="max-w-4xl mx-auto p-6">
          
          <h1 className="text-2xl font-bold text-center mb-6">
            File Upload
          </h1>

          <DropZone files={files} setFiles={setFiles} errors={errors} setErrors={setErrors} />

          <FileList files={files} onRemoveFile={handleRemoveFile} onRetry={handleRetry} />

          {files.length > 0 && <UploadSummary files={files} />}

          {
            files.length > 0 && (
              <button
               onClick={handleUploadAll}
               className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
              >
                Upload All
              </button>
            )
          }

          {
            files.some((file) => file.status === "success") && (
              <button 
                onClick={handleClearCompleted}
                className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
              >
                Clear Completed
              </button>
            )
          }

     </div>

  )

}

export default FileUpload
