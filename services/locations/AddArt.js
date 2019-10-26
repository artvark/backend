import models from "../MongoConnect"
import async from "async"
import { blobService } from "../StorageConnect"
import mongoose from 'mongoose';
import fs from 'fs';

const addArt = (req, res, next) => {

    var {
        lat,
        lng,
        name
    } = req.body

    // console.log(req.file)
    // console.log(req.body)

    async.waterfall([
        (next) => {
            var id = new mongoose.Types.ObjectId();
            blobService.createBlockBlobFromLocalFile('artwork', String(id), req.file.path, function(error, result, response) {
                if (!error) {
                    console.log("Uploaded")

                    fs.unlink(req.file.path, (err) => {
                        if (err) throw err;
                        next(null, id)
                    });
                }
        
                if (error) {
                    console.log(error)
                }
            })
        },
        (blobRef, next) => {
            var p = new models.Art({ 
                name: name, 
                location: {
                    type: "Point",
                    coordinates: [lng, lat]
                }
            });
            p._id = blobRef
            p.save().then(() => {
                console.log("Added art")
                next()
            })
        }
    ], (err) => {
        if (err) {
            res.status("500").send("")
            return
        } 
        res.send("OK")
    })
    

}

export { addArt }

