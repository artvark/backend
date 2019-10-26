import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    createdArt: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Art' 
    }],
    likedArt: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Art' 
    }],
    firebaseId:  String
});

const User = mongoose.model('User', userSchema);
export default User;