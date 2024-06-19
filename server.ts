import express from "express";
const app = express();
const port = 3000;
import prisma from "./src/client"

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.get("/", async (req, res) => {
    const movies = await prisma.movie.findMany()
    res.json(movies)
});

