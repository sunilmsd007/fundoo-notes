import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    colour: {
      type: String
    },
    isArchive: {
      type: Boolean,
      default: false
    },
    isTrash: {
      type: Boolean,
      default: false
    },
    userID: {
        type: String
    }

  },
  {
    timestamps: true
  }
);

export default model('Notes', userSchema);
