
import mongoose, { Schema, Document, model } from 'mongoose'
// import { User } from '../models/user.model'

export interface IProperty {
  name: string
  description: string
  price: string
}

export default interface IPropertyModel extends Document, IProperty {}

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
    },
    propertyType: {
        type: String,
        required: true
    },
    saleType: {
        type: String,
        required: true
    },
    amenities: [{
        CCTV: Boolean,
        powerBackUP: Boolean,
        parking: Boolean,
    }],
    bedRoomsCount: {
        type: Number,
        required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
  },
)

export const Property = model<IPropertyModel>('Property', schema)