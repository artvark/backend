import * as azure from '@azure/storage-blob';
import path from 'path';
import fs from 'fs';

let storageConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
// let blobService = azure.createBlobService(storageConnectionString);

const ONE_MEGABYTE = 1024 * 1024;
const FOUR_MEGABYTES = 4 * ONE_MEGABYTE;
const ONE_MINUTE = 60 * 1000;
const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME;
const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

const credentials = new azure.SharedKeyCredential(STORAGE_ACCOUNT_NAME, ACCOUNT_ACCESS_KEY);
const pipeline = azure.StorageURL.newPipeline(credentials);
const serviceURL = new azure.ServiceURL(`https://artvarkstorage.blob.core.windows.net`, pipeline);
const ContainerURL = azure.ContainerURL
const BlockBlobURL = azure.BlockBlobURL

async function uploadStream(aborter, containerURL, filePath, fileId) {
    filePath = path.resolve(filePath);

    const fileName = fileId +  ".png";
    const blockBlobURL = azure.BlockBlobURL.fromContainerURL(containerURL, fileName);

    const stream = fs.createReadStream(filePath, {
      highWaterMark: FOUR_MEGABYTES,
    });

    const uploadOptions = {
        bufferSize: FOUR_MEGABYTES,
        maxBuffers: 5,
    };

    return await azure.uploadStreamToBlockBlob(
                    aborter, 
                    stream, 
                    blockBlobURL, 
                    uploadOptions.bufferSize, 
                    uploadOptions.maxBuffers);
}

function downloadBlob(aborter, containerName, fileName) {
    const containerURL = azure.ContainerURL.fromServiceURL(serviceURL, containerName);
    const blockBlobURL = azure.BlockBlobURL.fromContainerURL(containerURL, fileName);
    return blockBlobURL.download(aborter, 0);
}

function getContainerURL(containerName) {
    return azure.ContainerURL.fromServiceURL(serviceURL, containerName);
}

// function getBlobURL(containerURL, blobName) {
//     return azure.BlockBlobURL.fromContainerURL(containerURL, blobName);
// }

export { azure, ONE_MINUTE, uploadStream, ContainerURL, getContainerURL, BlockBlobURL, downloadBlob }