import express from "express";
import { providerSignup } from "../controller/providerSignup.js";
import { providerSignin } from "../controller/providerSignin.js";
const router = express.Router();

router.post('/signup',providerSignup);
router.post('/signin',providerSignin);

export default router;