const uploadFile = (file, onProgress) => {

    let interval;

    let cancelUpload;

    const promise =new Promise((resolve, reject) => {

        let progress = 0;

         interval = setInterval(() => {

            progress += 10;

            onProgress(progress);

            if(progress >= 100){
                clearInterval(interval);

                resolve({
                    success: true,
                })

            }

        }, 300)

        cancelUpload = () => {

            clearInterval(interval);
            reject(new Error("Upload cancelled"));
        }

    })

    return {
        promise,
        cancel: cancelUpload,
    }

}

export default uploadFile;