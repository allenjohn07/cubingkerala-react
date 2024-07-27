import express from "express";
import { addRequest, editRequest, getRequests } from "../controllers/RequestController.js";
const router = express.Router();

//route to add the member request to the db
router.post("/addRequest", addRequest);

//route to get all requests from the request collection
router.get("/getRequests", getRequests)

//route to edit the request
router.post("/editRequest", editRequest)


export { router as RequestRouter };
