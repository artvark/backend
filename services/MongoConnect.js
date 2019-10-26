import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

import User from '../models/User';
import Art from '../models/Art'

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

var mongoDbUrl = process.env.DB_CONNECT;
mongoose.connect(mongoDbUrl);

let db = mongoose.connection
db.once('open', function() {
    console.log('Connected to mongo')
});

const models = { User, Art };
export default models;