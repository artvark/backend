import models from "../MongoConnect"
import async from "async"
import { azure, uploadStream, getContainerURL } from "../StorageConnect"
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

    // Test code to generate random lng lat positions
    // var r = 200/111300 // = 100 meters
    // var y0 = Number(lat)
    // var x0 = Number(lng)

    // var u = Math.random()
    // var v = Math.random()
    // var w = r * Math.sqrt(u)
    // var t = 2 * Math.PI * v
    // var x = w * Math.cos(t)
    // var y1 = w * Math.sin(t)
    // var x1 = x / Math.cos(y0)
    // var newY = y0 + y1
    // var newX = x0 + x1

    // lng = newX
    // lat = newY

    async.waterfall([
        (next) => {
            var id = new mongoose.Types.ObjectId();
            console.log(req.file.path)
            
            const aborter = azure.Aborter.timeout(30 * azure.ONE_MINUTE);
            const containerURL = getContainerURL("artwork")
            uploadStream(aborter, containerURL, req.file.path, id).then(() => {
                fs.unlink(req.file.path, (err) => {
                    if (err) throw err;
                });
                next(null, id)
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

