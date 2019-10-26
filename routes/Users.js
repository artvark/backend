import {Router} from 'express';
import { addUserFirebase, addUserCosmos } from '../services/users/CreateUser';
//import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';

let router = Router();

router.post('/', addUserFirebase, addUserCosmos, (req, res) => {
    res.write("\nMongo and Firebase Success");
    res.end();
})  

export default router;