import express from 'express';
import { customerSignup } from '../controller/customerSignup.js';
import { customerSignIn } from '../controller/customerSignin.js';
const router = express.Router();

router.post('/signup',customerSignup);
router.post('/signin',customerSignIn);

export default router;