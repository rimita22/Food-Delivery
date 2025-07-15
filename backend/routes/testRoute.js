import express from "express";
import userModel from "../models/userModel.js";

const router = express.Router();

router.get("/test", async (req, res) => {
  const user = await userModel.findById("686fdd688917942d45628630");
  res.json({ user });
});

export default router;
