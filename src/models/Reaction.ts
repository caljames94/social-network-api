import { Schema, Types } from 'mongoose';

// Interface for the Reaction subdocument
interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  userId: Types.ObjectId;
  createdAt?: Date;
}

// Reaction schema (subdocument schema, not a model)
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toISOString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default reactionSchema;