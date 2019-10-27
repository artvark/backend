import models from "../MongoConnect"
import { downloadBlob, azure } from "../StorageConnect"
import fs from 'fs';

const getWorldObjectById = (req, res, next) => {

    let objId = req.query.id;

    const aborter = azure.Aborter.timeout(30 * azure.ONE_MINUTE);
    let fileName = objId+".png"
    console.log(fileName)
    downloadBlob(aborter, "artwork", fileName)
        .then((r) => {
            // const writable = fs.createWriteStream(fileName);
            // var downloaded = r.originalResponse.readableStreamBody.pipe(writable)
            res.write(r.originalResponse.readableStreamBody.read())
            res.end();
            
        })
        .catch((err) => {
            console.log(err)
        })

}

export { getWorldObjectById }

