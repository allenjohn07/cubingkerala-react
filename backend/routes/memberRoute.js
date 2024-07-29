import express from 'express'
import { GetMemberById, GetMembers } from '../controllers/MemberController.js'
const router = express.Router()

router.get("/getMembers", GetMembers)

router.get("/getMemberbyId/:id", GetMemberById)

router.get("/")

export {router as MemberRouter}