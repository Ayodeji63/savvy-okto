import express from "express";
import pkg from "@prisma/client";
import cors from "cors";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.use(cors({ origin: 'https://2660-102-88-36-239.ngrok-free.app' }))


app.post('/user', async (req, res) => {
    try {
        const { username } = req.body;
        const users = await prisma.user.findFirst({
            where: {
                username: username,
            }
        });
        res.json(users);
    } catch (error) {
        console.error(error);

    }
});

app.post('/users', async (req, res) => {
    try {
        const { params } = req.body;
        const user = await prisma.user.create({
            data: {
                username: params.username,
                address: params.address,
            }
        });
        res.json(user);
    } catch (error) {
        console.error(error);

    }
})

app.post('/create', async (req, res) => {
    try {
        // First find the user
        const { params } = req.body
        const user = await prisma.user.findUnique({
            where: { username: params.fromAddress }
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Then create the transaction
        await prisma.transaction.create({
            data: {
                fromAddress: params.fromAddress,
                toAddress: params.toAddress,
                amount: params.amount,
                type: params.type,
                transactionHash: params.transactionHash,
                status: params.status,
                user: {
                    connect: { id: user.id }
                }
            }
        })
    } catch (error) {
        console.error(error);

    }
})

app.post('/fetch', async (req, res) => {
    try {
        const { user } = req.body
        const transactions = await prisma.transaction.findMany({
            where: {
                fromAddress: user,
            }
        })
        console.log(transactions);
        res.json(transactions);
    } catch (error) {
        console.error(error);

    }
})

app.listen(4000, () => console.log('Server running on http://localhost:4000'));