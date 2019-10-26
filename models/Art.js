import mongoose from 'mongoose';


const artSchema = new mongoose.Schema({
    name: String,
});

const Art = mongoose.model('Art', artSchema);
export default Art;