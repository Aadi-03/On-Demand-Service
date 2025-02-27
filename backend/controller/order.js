import { PrismaClient,OrderState } from "@prisma/client";
const prisma = new PrismaClient();

// order created by the customer
export const createOrder = async (req, res) => {
    try {
        const {name,description,providerId} = req.body;
        if (!name || !description || !providerId) {
            return res.status(200).json({ error: "All mandatory fields must be provided" });
        }
        const order = await prisma.order.create({
            data: {
                taskName: name,
                description: description,
                doneById: providerId,
                askedById: req.userId,
                state: OrderState.AVAILABLE,
            }
        }); 
        res.status(200).json({order});
    
    } catch (error) {
        res.status(200).json({ error: "Internal Server Error" });
    }
}

// order accepted by provider
export const acceptOrder = async (req, res) => {
    try {
        const {orderId} = req.body;
        if (!orderId) {
            return res.status(200).json({ error: "All mandatory fields must be provided" });
        }
        const order = await prisma.order.update({
            where: {
                id: orderId,
                doneById: req.providerId,
                state: OrderState.AVAILABLE,
            },
            data: {
                state: OrderState.PENDING,
            }
        });
        res.status(200).json({order});
    } catch (error) {
        res.status(200).json({ error: "Internal Server Error" });
    }
}

// order marked completed by the provider
export const completeOrder = async (req, res) =>{
    try {
        const {orderId} = req.body;
        if (!orderId) {
            return res.status(200).json({ error: "All mandatory fields must be provided" });
        }
        const order = await prisma.order.update({
            where: {
                id: orderId,
                doneById: req.providerId,
                state: OrderState.PENDING,
            },
            data: {
                state: OrderState.COMPLETED,
            }
        });
        res.status(200).json({order});
    } catch (error) {
        res.status(200).json({ error: "Internal Server Error" });
    }
}

// order marked completed by the customer
export const completedOrder = async (req, res) => {
    try {
        const {orderId} = req.body;
        if (!orderId) {
            return res.status(200).json({ error: "All mandatory fields must be provided" });
        }
        const order = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                state: OrderState.COMPLETED,
                completed: true,
            }
        });
        res.status(200).json({order});
    } catch (error) {
        res.status(200).json({ error: "Internal Server Error" });
    }
}

// if the customer not satisfied with the work done by the provider (for the customer)
export const reOpenOrder = async (req, res) => {
    try {
        const {orderId} = req.body;
        if (!orderId) {
            return res.status(200).json({ error: "All mandatory fields must be provided" });
        }
        const order = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                state: OrderState.PENDING,
            }
        });
        res.status(200).json({order});
    } catch (error) {
        res.status(200).json({ error: "Internal Server Error" });
    }
}

// order rejected by the provider
export const rejectOrder = async (req, res) => {
    try {
        const {orderId} = req.body;
        if (!orderId) {
            return res.status(200).json({ error: "All mandatory fields must be provided" });
        }
        const order = await prisma.order.update({
            where: {
                id: orderId,
                doneById: req.providerId,
                state: OrderState.AVAILABLE,
            },
            data: {
                state: OrderState.REJECTED,
            }
        });
        res.status(200).json({order});
    } catch (error) {
        res.status(200).json({ error: "Internal Server Error" });
    }
}

// order deleted by the customer
export const deleteOrder = async (req, res) => {
    try {
        const {orderId} = req.body;
        if (!orderId) {
            return res.status(200).json({ error: "All mandatory fields must be provided" });
        }
        const order = await prisma.order.delete({
            where: {
                id: orderId,
            }
        }); 
        res.status(200).json({order});
    
    } catch (error) {
        res.status(200).json({ error: "Internal Server Error" });
    }
}