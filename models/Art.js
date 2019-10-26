import mongoose from 'mongoose';


const artSchema = new mongoose.Schema({
    name: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true
        }, 
    }
});

artSchema.index({ "location": "2dsphere" });
const Art = mongoose.model('Art', artSchema);
export default Art;