import azure from 'azure-storage'

let storageConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
let blobService = azure.createBlobService(storageConnectionString);

export { blobService }