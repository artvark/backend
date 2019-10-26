import {Router} from 'express';
import { getArtbyLngLat } from '../services/locations/GetArtByLocations';
//import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';
import multer from 'multer'
import { addArt } from '../services/locations/AddArt';
var upload = multer({ dest: './routes/uploads/' })

let router = Router();

router.get('/', getArtbyLngLat)

router.post('/', upload.single("art"), addArt)


export default router;