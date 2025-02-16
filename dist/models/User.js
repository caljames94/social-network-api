import { Schema, model } from "mongoose";
// Schema to create User model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
            default: undefined,
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: undefined,
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// Create a virtual property `friendCount` that gets the amount of friends per user
userSchema.virtual('friendCount').get(function () {
    return this.friends?.length || 0;
});
const User = model('User', userSchema);
export default User;
