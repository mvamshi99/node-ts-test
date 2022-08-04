import mongoose, { Schema, Document, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export interface IUser {
    first_name: string
    last_name: string
    email: string
    postedProperties: Array<string>;
    // hash_password: string
    // salt: string
}
const postedPropertySchema = new Schema({
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    })

  export default interface IUserModel extends Document, IUser {}

  const schema = new Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String, 
            lowercase: true, 
            required: [true, "can't be blank"], 
            // match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
            index: true
        },
        favouriteProperties: [],

        postedProperties: postedPropertySchema
    },
    {
      timestamps: true,
    },
  )

  schema.plugin(uniqueValidator)
  
  export const User = model<IUserModel>('User', schema)

  const favouritesSchema = new Schema(
    {
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
  )

  export const Favourites = mongoose.model('Favourites', favouritesSchema)



//   export const PostedProperty = mongoose.model('postedProperty', postedPropertySchema)