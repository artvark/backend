import models from "../MongoConnect"

const getArtbyLngLat = (req, res, next) => {

    let search_lat = req.query.lat;
    let search_lng = req.query.lng;

    models.Art.find({
        location: { 
            $nearSphere: { 
                $geometry: { 
                    type: "Point", 
                    coordinates: [ search_lng, search_lat ] }, 
                    $maxDistance: 50 
                } 
            } 
    }).then((r) => {
        res.send(r)
    }).catch((err) => {
        console.log(err)
        res.status("500").send("Error. Try again later.")
    })


}

export {getArtbyLngLat}

