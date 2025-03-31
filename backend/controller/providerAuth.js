import { OrderState, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express from "express";
import verifyProviderJwt from "../middleware/verifyProviderJwt.js";
import { acceptOrder, completeOrder, rejectOrder, reOpenOrder } from "./order.js";

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

// this route will provide the provider with the available tasks
router.get("/availableTask", async (req, res) => {
  try {
    const tasks = await prisma.order.findMany({
      where:{
        state: OrderState.AVAILABLE,
        doneById: req.providerId
      },
      include: {
        askedBy: {
          include: {
            address: true,
          },
        },
      },
    })
    res.status(200).json({availableTask:tasks});
  } catch (error) {
    res.status(200).json({ error: "Internal Server Error" });
  }
});

// this route will provide the provider with the accepted tasks
router.get("/acceptedTask", async (req, res) => {
  try {
    const tasks = await prisma.order.findMany({
      where:{
        state: OrderState.PENDING,
        doneById: req.providerId
      },
      include: {
        askedBy: {
          include: {
            address: true,
          },
        },
      },
    })
    res.status(200).json({acceptedTask:tasks});
  } catch (error) {
    res.status(200).json({ error: "Internal Server Error" });
  }
});

// this route will provide the provider with the completed tasks
router.get("/completedTask", async (req, res) => {
  try {
    const tasks = await prisma.order.findMany({
      where:{
        state: OrderState.COMPLETED,
        doneById: req.providerId
      },
      include: {
        askedBy: {
          include: {
            address: true,
          },
        },
      },
    })
    res.status(200).json({completedTask:tasks});
  } catch (error) {
    res.status(200).json({ error: "Internal Server Error" });
  }
});

// this route will update the provider availability status
router.patch("/updateStatus", async (req, res) => {
  try {
    const provider = await prisma.provider.update({
      where: {
        id: req.providerId,
      },
      data: {
        available: req.body.available,
      },
    });
    res.status(200).json(provider);
  } catch (error) {
    res.status(200).json({ error: "Internal Server Error" });
  }
});

// this route will update the provider profile details
router.patch("/updateProfile", async (req, res) => {
  try {
    const body = req.body;
    const provider = await prisma.provider.update({
      where: {
        id: req.providerId,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        gender:body.gender,
        phoneNumber: body.phoneNumber,
        dob: body.dob,
        address: {
          update: {
            houseNumber: body.address.houseNumber,
            streetName: body.address.streetName,
            state: body.address.state,
            pincode: body.address.pincode,
          },
        },
      },  
      include: {
        address: true,
      },
    });
    res.status(200).json({message:"Profile updated successfully",provider});
  } catch (error) {
    res.status(200).json({ error: "Internal Server Error" });
  }
});

// this route will mark the order as accepted by the provider and the order will be pending
router.patch("/acceptOrder",acceptOrder);

// this route will mark the order as completed at the providers end
router.patch("/completeOrder",completeOrder);

// this route will mark the order as rejected by the provider
router.patch("/rejectOrder",rejectOrder);

// this route will change the completed state order to pending
router.patch("/redoOrder",reOpenOrder);

export default router;
