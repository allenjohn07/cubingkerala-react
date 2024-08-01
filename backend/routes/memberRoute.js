import express from 'express'
import { deleteMember, GetMemberById, GetMembers, updateMember } from '../controllers/MemberController.js'
const router = express.Router()

router.get("/getMembers", GetMembers)

router.get("/getMemberbyId/:id", GetMemberById)

router.post("/updateMember", updateMember)

router.post("/deleteMember", deleteMember)

export {router as MemberRouter}