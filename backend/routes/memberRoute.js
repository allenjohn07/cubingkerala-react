import express from 'express'
import { GetMembers } from '../controllers/MemberController.js'
const router = express.Router()

router.get("/getMembers", GetMembers)

export {router as MemberRouter}