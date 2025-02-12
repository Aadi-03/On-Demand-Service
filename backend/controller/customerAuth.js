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
        where:{
            available:true
        },
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

// this route will provide filtered results based on the customer's requirement
router.get('/filterprovider', async (req, res) => {
    const customer = await prisma.customer.findUnique({
        where: {
            id: req.userId
        },
        include:{
            address: true
        }
    });
    const {workType, distance, rating} = req.query;
    let providers = await prisma.provider.findMany({
        where:{
            available:true
        },
        include:{
            address: true,
            feedbacks:true,
        }
        
    });
    // if workType is provided in the query and workType is an array that means multiple workType is provided if not then single workType will be empty array
    if(workType && workType.length>0){
        providers = providers.filter(provider=>workType.includes(provider.workType))
        
    }
    
    // if distance is provided in the query
    if(distance){
        providers = providers.filter(provider=>calcDistance(customer.address.latitude,customer.address.longitude,provider.address.latitude,provider.address.longitude)<=distance)
    }
    // if rating is provided in the query
    if(rating){
        providers = providers.filter(provider=>{
            let star=provider.feedbacks.reduce((acc,feedback)=>acc+feedback.star,0)/provider.feedbacks.length
            // star not a number
            if(isNaN(star)){
                star=0
            }else{
                star = Math.round(star * 100) / 100
            }
            return star>=rating
        })
    }
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

});

// this route will provide order history detail of a customer
router.get('/orderhistory', async (req, res) => {
    const orders = await prisma.order.findMany({
        where:{
            askedById:req.userId
        },
        include:{
            doneBy:true,
            feedback:true
        }
    })
    // console.log(orders);
    
    const newOrders=orders.map((order)=>{
        return {
            orderId:order.id,
            orderDate:order.createdAt,
            orderCompleted:order.completed,
            orderFeedback: order.feedback?.feedback ?? "No feedback yet",
            orderRating:order.feedback?.star ?? 0,
            providerName:order.doneBy.firstName + " " + order.doneBy.lastName,
            providerPhone:order.doneBy.phoneNumber,
            providerWorkType:order.doneBy.workType,
            providerEmail:order.doneBy.email,
        }
    })
    res.status(200).json({
        orders:newOrders,
    });
});

export default router;
