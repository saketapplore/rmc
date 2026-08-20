const MAX_FILE_SIZE = 5 * 1024 * 1024

const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf'
]

const validateFile = (file) => {

    if(!allowedTypes.includes(file.type)) {
        return "Unsupported File Type"
    }

    if(file.size > MAX_FILE_SIZE) {
        return "File size exceeds 5MB"  
    }

    return null

}

export default validateFile