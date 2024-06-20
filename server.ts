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

// type data = {
//     data: string
// }

app.post('/movie', async (req, res) => {
    const { title, description } = req.body
    const movie = await prisma.movie.create({
        data: {
            title: title,
            description: description
        }
    })
    res.json(movie)
})

async function movie() {
    const movieExample = await prisma.movie.create({
        data: {
            title: "title",
            description: "description"
        }
    })
    console.log(movieExample)
}

movie();
