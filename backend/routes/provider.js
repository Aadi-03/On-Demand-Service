import express from "express";
import { providerSignup } from "../controller/providerSignup.js";
import { providerSignin } from "../controller/providerSignin.js";
import providerAuth from "../controller/providerAuth.js";
const router = express.Router();

router.use('/auth',providerAuth);
router.post('/signup',providerSignup);
router.post('/signin',providerSignin);

export default router;