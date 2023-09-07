import { CallbackError, Schema } from 'mongoose'
import { RoleTypeEnum } from '../../../../../../resources/framework/src'
import { EncodePassword } from '../../../../../Domain'

export const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: Object.keys(RoleTypeEnum),
      required: true
    },
    online: {
      type: Boolean,
      required: true
    }
  },
  {
    collection: 'user',
    timestamps: true
  }
)

UserSchema.pre('save', function save(next) {
  if (!this.isModified('password')) return next()

  try {
    this.password = EncodePassword.execute(this.password)

    return next()
  } catch (e) {
    return next(e as CallbackError)
  }
})
