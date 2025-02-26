import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express from "express";
import verifyProviderJwt from "../middleware/verifyProviderJwt.js";

const router = express.Router();

router.use(verifyProviderJwt);

// this route provide the provider  profile details
router.get("/profile", async (req, res) => {
  try {
    const provider = await prisma.provider.findUnique({
      where: {
        id: req.providerId,
      },
      include: {
        address: true,
        feedbacks: true,
        orders: {
          include: {
            askedBy: {
              include: {
                address: true,
              },
            },
          },
        },
        favoritedBy: {
          include: {
            customer: true,
          },
        },
      },
    });
    // await new Promise ((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 2000);
    // });
    const stars = provider.feedbacks.reduce(
      (acc, feedback) => acc + feedback.star,
      0
    );
    provider.rating = stars / provider.feedbacks.length;

    res.status(200).json(provider);
  } catch (error) {
    res.status(200).json({ error: "Internal Server Error" });
  }
});

export default router;
