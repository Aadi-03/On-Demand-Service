import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { getJwt } from "../utils/getJwt.js";

const prisma = new PrismaClient();

export const customerSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find customer by email
        const customer = await prisma.customer.findUnique({
            where: { email },
            include:{
                address: true
            }
        });

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = getJwt(customer.id);

        res.status(200).json({
            message: "Sign-in successful",
            token,
            customer
        });
    } catch (error) {
        console.error("Error in customerSignIn:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
