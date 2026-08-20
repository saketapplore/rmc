const UploadSummary = ({ files }) => {

    const total = files.length;
  
    const uploaded = files.filter(
      (file) => file.status === "success"
    ).length;
  
    const uploading = files.filter(
      (file) => file.status === "uploading"
    ).length;
  
    const failed = files.filter(
      (file) => file.status === "error"
    ).length;
  
    return (
      <div className="mt-6 grid grid-cols-4 gap-4">
  
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500">
            Files
          </p>
  
          <p className="text-xl font-bold">
            {total}
          </p>
        </div>
  
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">
            Uploaded
          </p>
  
          <p className="text-xl font-bold">
            {uploaded}
          </p>
        </div>
  
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">
            Uploading
          </p>
  
          <p className="text-xl font-bold">
            {uploading}
          </p>
        </div>
  
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">
            Failed
          </p>
  
          <p className="text-xl font-bold">
            {failed}
          </p>
        </div>
  
      </div>
    );
  };
  
  export default UploadSummary;