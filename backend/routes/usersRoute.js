import express from 'express'
import { LoginCuber, RegisterCuber } from '../controllers/AuthControllers.js'


const router = express.Router()

//Register Route
router.post("/register", RegisterCuber)

//Login Route
router.post("/login", LoginCuber)


export { router as userRouter };