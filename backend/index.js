import express from "express";
import pkg from "@prisma/client";
import cors from "cors";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' }))

app.post('/user', async (req, res) => {
    const { username } = req.body;
    const users = await prisma.user.findFirst({
        where: {
            username: username,
        }
    });
    res.json(users);
});

app.post('/users', async (req, res) => {
    const { params } = req.body;
    const user = await prisma.user.create({
        data: {
            username: params.username,
            address: params.address,
        }
    });
    res.json(user);
})

app.listen(4000, () => console.log('Server running on http://localhost:4000'));