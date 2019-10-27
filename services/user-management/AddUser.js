import admin from '../authentication/FirebaseConnect';
import models from '../MongoConnect'

const addUserFirebase = (req, res, next) => {

    const {
        email,
        password,
    } = req.body;

    admin.auth().createUser({
        email,
        password,
    }).then((user) => {
        req.firebaseId = user.uid
        next();
    }).catch((err) => {
        console.log('error', err);
        res.status("500").send({ err });
    }) 
}

const addUserCosmos = (req, res, next) => {

    const {
        name,
        username,
        email,
    } = req.body;

    var user = new models.User({ 
        name: name, 
        username: username,
        email: email, 
        savedArt: [],
        createdArt: [],
        firebaseId: req.firebaseId
    });
    
    user.save().then(() => {
        res.write(user.id)
        next();
    }).catch((error) => {
        console.log('error', error);
        res.send({ error });
    })
    
}

export {addUserFirebase, addUserCosmos}
