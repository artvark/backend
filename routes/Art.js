import {Router} from 'express';
import { getArtbyLatLng } from '../services/locations/GetArtByLocations';
//import {checkIfAuthenticated} from '../services/authentication/CheckAuthorization';

let router = Router();

router.get('/', getArtbyLatLng)

export default router;