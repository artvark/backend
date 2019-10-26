blobService.createBlockBlobFromLocalFile('artwork', 'artvark', 'artvark.png', function(error, result, response) {
    if (!error) {
        console.log("uploaded")
    }

    if (error) {
        console.log(error)
    }
});