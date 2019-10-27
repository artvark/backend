import models from "./services/MongoConnect";

const generatePoints = () => {
    let lat = 33.777156
    let lng = -84.396202

    var r = 200/111300 // = 100 meters
    var y0 = lat
    var x0 = lng

    for (var i = 0; i < 200; i++) {
        var u = Math.random()
        var v = Math.random()
        var w = r * Math.sqrt(u)
        var t = 2 * Math.PI * v
        var x = w * Math.cos(t)
        var y1 = w * Math.sin(t)
        var x1 = x / Math.cos(y0)
        var newY = y0 + y1
        var newX = x0 + x1

        console.log(newX)
        console.log(newY)

        var p = new models.Art({ 
            name: "Point " + i, 
            location: {
                type: "Point",
                coordinates: [newX, newY]
            }
        });
        
        p.save()
    }
}

export {generatePoints}