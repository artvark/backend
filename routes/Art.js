import {Router} from 'express';
import multer from 'multer'
//import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';
import { getArtbyLngLat } from '../services/art-management/GetArtByLocations';
import { addArt } from '../services/art-management/AddArt';
import { getWorldObjectById } from '../services/art-management/GetWorldObject';

var upload = multer({ dest: './services/art-management/uploads/' })
let router = Router();

// GET /art-management/art
router.get('/art/', getArtbyLngLat)

// GET /art-management/world-obj/?id=389d9f8989eh
router.get('/world-obj/', getWorldObjectById)

// POST /art-management/art
router.post('/art/', upload.single("art"), addArt)


export default router;