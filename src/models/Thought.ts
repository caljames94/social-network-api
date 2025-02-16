import { Schema, model, Document, Types } from 'mongoose';
import reactionSchema from './Reaction';

// Interface for the Thought document
interface IThought extends Document {
  thoughtText: string;
  createdAt?: Date;
  username: string;
  userId: Types.ObjectId;
  reactions?: Types.DocumentArray<typeof reactionSchema>;
  reactionCount?: number;
}

// Schema to create Thought model
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toISOString(),
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
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions?.length || 0;
});

// Create the Thought model using the thoughtSchema
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;

