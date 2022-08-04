import express, { Request, Response } from 'express'
import { Property } from '../../models/property.model'
import mongoose from 'mongoose'
import { User } from '../../models/user.model'

const router = express.Router()

router.get('/properties', async (req: Request, res: Response) => {
  const property = await Property.find({})
  return res.status(200).send(property)
})

router.get('/property/:id', async (req, res, next) => {
    try {
      const property = await Property.findOne({ _id: req.params.id })
      if (!property) {
        return res.status(400).json({
            "message": `Property with ID: ${req.params.id} not found`
        });
      } else {
        res.status(200).json(property)
      }
    } catch (e) {
      next(e)
    }
  })

router.post('/addproperty', async (req: Request, res: Response, next) => {
    try {
        console.log(req.body);
        console.log(req.body.userID)
        const reqBody = req.body;
        if (reqBody.userId === "") {
            return res.status(400).json({
                "message": "Userid is  required"
            });
        }
            const property = new Property(req.body)
            // const updateUser = User.findById(req.body.id);
            // updateUser.update()
            await property.save()
            // res.json(property)
            return res.status(201).send(property)
      } catch (e) {
        next(e)
      }
})

router.patch('/updateproperty/:id', async (req, res, next) => {
    try {

      const property = await Property.findOne({ _id: req.params.id })
      if (!property) {
        return res.status(404).json({
          "message": `Property with ID: ${req.params.id} not found`
        });
      }
      const { name, description, price } = req.body;
      property.name = name ?? property.name;
      property.description = description ?? property.description;
      property.price = price ?? property.price;

      await property.save();
      res.json(property);
    } catch (e) {
      next(e)
    }
  })

  router.delete('/deleteproperty/:id', async (req, res, next) => {
    try {
      // console.log(mongoose.Types.ObjectId.isValid(req.params.id))
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(500).json({
          "message": `Property with ID: ${req.params.id} is invalid`
        });
      }
      const property = await Property.findOne({ _id: req.params.id })
      if (!property) {
        return res.status(404).json({
          "message": `Property with ID: ${req.params.id} not found`
        });
      }
      await property.deleteOne()
      res.status(200).json({
        "message": "Deleted property successfully"
      })
    } catch (e) {
      next(e)
    }
  })

export { router as propertyRouter }