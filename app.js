import express from 'express'
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.json());

import models from './services/MongoConnect'
import { blobService } from './services/StorageConnect';

// === Top Level Route Declarations ===
import users from './routes/Users';
app.use("/users", users);

import art from './routes/Art';
app.use("/art", art);

app.get('/', (req, res) => res.send('Hello World!'));

// Setting port to be set by env var, for Heroku
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));

// import { generatePoints } from './services/locations/GetArtByLocations';
// generatePoints()
