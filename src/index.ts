import express from 'express';
import mongoose from 'mongoose'
import { json } from 'body-parser';
import { todoRouter } from './routes/todo';
import { propertyRouter } from './routes/property.routes'
import { userRouter } from './routes/user.routes';

const app = express()
app.use(json())
app.use('/', todoRouter)
app.use('/', propertyRouter)
app.use('/', userRouter)

mongoose.connect('mongodb+srv://admin:0OxT14l8NRTa4j90@app-api.x15jc.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, () => {
  console.log('connected to database')
})

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})