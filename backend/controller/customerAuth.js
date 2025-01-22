import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express from "express";
import verifyJwt from "../middleware/verifyJwt.js";
import calcDistance from "../utils/calculateDistance.js";
const router = express.Router();



router.use(verifyJwt);

// this route will provide all the providers in the database
router.get('/bulkprovider', async (req, res) => {
    const customer = await prisma.customer.findUnique({
        where: {
            id: req.userId
        },
        include:{
            address: true
        }
    });
    const providers = await prisma.provider.findMany({
        include:{
            address: true,
            feedbacks:true,
        }
        
    });
    const newProvider=providers.map((provider)=>{
        let rating=provider.feedbacks.reduce((acc,feedback)=>acc+feedback.star,0)/provider.feedbacks.length
        // rating not a number
        if(isNaN(rating)){
            rating=0
        }else{
            rating = Math.round(rating * 100) / 100
        }
        const { houseNumber, streetName, state, country, pincode } = provider.address;
        const formattedAddress = `${houseNumber}, ${streetName}, ${state}, ${country} - ${pincode}`;
        return {
            providerId:provider.id,
            providerName:provider.firstName + " " + provider.lastName,
            providerAge: new Date().getFullYear() - new Date(provider.dob).getFullYear(),
            ProviderGender:provider.gender,
            providerPhone:provider.phoneNumber,
            providerWorkType:provider.workType,
            providerDistanceInKm:calcDistance(customer.address.latitude,customer.address.longitude,provider.address.latitude,provider.address.longitude) ,
            providerRating:rating,
            providerFeedback:provider.feedbacks,
            providerAddress:formattedAddress,
            providerEmail:provider.email,
        }
    })
    // sort the provider by distance
    newProvider.sort((a,b)=>a.providerDistanceInKm-b.providerDistanceInKm)
    res.status(200).json({
        provider:newProvider,
    });
})

export default router;
