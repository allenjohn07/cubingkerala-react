import express from 'express'
import { GetMemberById, GetMembers, updateMember } from '../controllers/MemberController.js'
const router = express.Router()

router.get("/getMembers", GetMembers)

router.get("/getMemberbyId/:id", GetMemberById)

router.post("/updateMember", updateMember)

export {router as MemberRouter}