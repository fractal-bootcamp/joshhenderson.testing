import express, { RequestHandler } from "express";
const app = express();
const port = 3000;
import prisma from "./client"

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
//Movies Search Page
app.get("/", async (req, res) => {
    const movies = await prisma.movie.findMany()
    res.json(movies)
});

app.get("/movies", async (req, res) => {
    const queryTitle = req.query.title as string;
    const queryDescription = req.query.description as string;

    if (typeof req.query.title === "string") {

        const movies = await prisma.movie.findMany({
            where: {
                title: { search: queryTitle },
                description: { search: queryDescription }
            },
        })
    }
})

//Movie Details Page
// post a movie
app.post('/movie/:id', async (req, res) => {
    const { title, description } = req.body
    const movie = await prisma.movie.create({
        data: {
            title: title,
            description: description
        }
    })
    res.json(movie)
})
//add a tag
app.post('/tag/:id', async (req, res) => {
    const tagText = req.body as string
    const tag = await prisma.tag.create({
        data: {
            tagText: tagText
        }
    })
    res.json(tag)
})

const verifyUser: RequestHandler = (req, _res, next) => {
    // get the authorization header
    // parse the token
    // use the token to get some information about the user
    // assign the user to req.user

    // req.user = user

    // we'll hardcode the user for now

    req.user = { id: "1" }

    next()

}

//add to favorites
app.post('/favorite/:movieid', verifyUser, async (req, res) => {
    // auth implementation
    // const userid = req.user.id

    const userid = req.user?.id!
    const movieid = req.params['movieid']

    const favorite = await prisma.favorite.create({
        data: {
            userId: userid,
            movieId: movieid
        }
    })
    res.json(favorite)
}
)

//Movie Favorites Page
app.get('/favorite/:id', async (req, res) => {
    const userid = req.params['id']
    const favorites = await prisma.favorite.findMany({
        where: {
            userId: userid,
        }
    })
    res.json(favorites)
}
)




