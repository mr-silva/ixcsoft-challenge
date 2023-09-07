import { Schema } from 'mongoose'

export const MessageSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    fromUserId: {
      type: String,
      required: true
    },
    toUserId: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    collection: 'message',
    timestamps: true
  }
)
