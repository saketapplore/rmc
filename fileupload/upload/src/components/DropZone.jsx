import { useState } from 'react'
import validateFile from '../utils/fileValidation'

const DropZone = ({files, setFiles, errors, setErrors}) => {

  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const processFiles = (selectedFiles) => {

    setErrors([])
  
    const validFiles = []
  
    selectedFiles.forEach((file) => {
  
      const error = validateFile(file)
  
      if (error) {
        setErrors((prev) => [
          ...prev,
          {
            id: `${file.name}-${file.lastModified}`,
            name: file.name,
            message: error
          }
        ])
  
        return
      }
  
      const duplicate =
        files.some(
          (item) =>
            item.name === file.name &&
            item.size === file.size &&
            item.file.lastModified === file.lastModified
        ) ||
        validFiles.some(
          (item) =>
            item.name === file.name &&
            item.size === file.size &&
            item.file.lastModified === file.lastModified
        )
  
      if (duplicate) {
        setErrors((prev) => [
          ...prev,
          {
            id: `${file.name}-${file.lastModified}-dup`,
            name: file.name,
            message: 'Already exists',
          },
        ])
        return
      }
  
      const newFile = {
        id: `${file.name}-${file.lastModified}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending',
        error: null,
        preview: file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : null
      }
  
      validFiles.push(newFile)
    })
  
    setFiles((prevFiles) => [
      ...prevFiles,
      ...validFiles
    ])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(
      e.dataTransfer.files
    )
    processFiles(droppedFiles)
  }

  const handleFileChange = (e) => {

    const selectedFiles = Array.from(e.target.files)
  
    processFiles(selectedFiles)
  
    e.target.value = ''
  }

    return (
       <div
  onDragEnter={handleDragEnter}
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
  className={`
    border-2 border-dashed rounded-lg p-10 text-center transition
    ${
      isDragging
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-300'
    }
  `}
>

<p className="text-xl font-medium">
  {isDragging
    ? 'Drop files here'
    : 'Drag & Drop files here'}
</p>

          <p className="text-gray-500">
            Or
          </p>

          <label 
          htmlFor="file-input"
          className="inline-block bg-blue-500 text-white px-5 py-2 rounded-lg cursor-pointer">
              Choose files</label>

              <input 
              id="file-input"
              type="file"
              multiple
              accept=".jpg, .jpeg, .png, .pdf"
              className="hidden"
              onChange={handleFileChange}
              />
          

          <p className="text-sm text-gray-500 mt-4">
        Supported: JPG, PNG, PDF
      </p>

      <p className="text-sm text-gray-500">
        Maximum size: 5 MB
      </p>

      {errors.length > 0 && (
  <div className="mt-4 space-y-2">

    {errors.map((error) => (
      <p
        key={error.id}
        className="text-sm text-red-500"
      >
        ❌ {error.name} — {error.message}
      </p>
    ))}

  </div>
)}
          
       </div>
    )

}

export default DropZone