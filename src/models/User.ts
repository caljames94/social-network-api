import { Schema, model, Document, ObjectId } from "mongoose";

// Interface representing a User document
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
  }
  
  // Schema to create User model
  const userSchema = new Schema<IUser>(
    {
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
        match: [/.+@.+\..+/, 'Must match a valid email address'],
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
  // Create a virtual property `friendCount` that retrieves the length of the user's friends array field on query
  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
  // Create the User model using the userSchema
  const User = model<IUser>('User', userSchema);
  
  export default User;