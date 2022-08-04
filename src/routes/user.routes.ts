import express, { Request, Response } from 'express'
import { User } from '../../models/user.model'
import mongoose from 'mongoose'
import { Property } from '../../models/property.model'

const router = express.Router()

router.get('/users', async (req: Request, res: Response) => {
  const users = await User.find({})
  return res.status(200).send(users)
})

router.get('/user/:id', async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.params.id })
      if (!user) {
        return res.status(400).json({
            "message": `User with ID: ${req.params.id} not found`
        });
      } else {
        res.status(200).json(user)
      }
    } catch (e) {
      next(e)
    }
  })

router.post('/adduser', async (req: Request, res: Response, next) => {
    try {
        console.log(req.body);
        const reqBody = req.body;
        if (!reqBody.email) {
            return res.status(400).json({
                "message": "Email is  required"
            });
        }
            const user = new User(req.body)
            await user.save()
            // res.json(property)
            return res.status(201).send(user)
      } catch (e) {
        next(e)
      }
})

router.get('/postedproperties/:id', async (req: Request, res: Response, next) => {
    try {

        const userInfo = await User.findById(req.params.id);
        const listOfPropIds = userInfo?.postedProperties; 

        const id = listOfPropIds?.length && listOfPropIds[0];
        const propertyInfo = Property.findById(id);

        console.log('ProperyInfo', propertyInfo);
        

        if (!propertyInfo) {
          return res.status(400).json({
              "message": `Property with ID: ${req.params.id} not found`
          });
        } else {
          res.status(200).json(propertyInfo)
        }
      } catch (e) {
        next(e)
      }
})

export { router as userRouter }