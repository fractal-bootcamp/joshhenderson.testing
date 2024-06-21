import express, { RequestHandler } from "express";
const app = express();
import prisma from "./src/client"

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



//Movies Search Page
app.get("/", async (_req, res) => {
    const movies = await prisma.movie.findMany()
    res.json(movies)
});
//Get movie by search query
app.get("/movies", async (req, res) => {
    function ensureString(str: any) {
        if (typeof str !== "string") return ""
        return str
    }
    const queryTitle = ensureString(req.query.title);
    const queryDescription = ensureString(req.query.description);

    console.log(queryTitle, queryDescription)

    const movieSearch = await prisma.movie.findMany({
        where: {
            title: { search: queryTitle },
            description: { search: queryDescription }
        },
    })

    const movieSearch2 = await prisma.movie.findMany({
        where: {
            title: {
                contains: "a",
            },
            description: {
                contains: "intellectual"
            }
        }
    })
    const movieSearch3 = await prisma.movie.findMany({
        where: {
            description: {
                search: "intellectual"
            }
        }
    })
    console.log("search1:", movieSearch)
    console.log("search2:", movieSearch2)
    console.log("search3:", movieSearch3)
    // return res.json({ movies })
    // } else if (!req.query.title) {
    //     const movies = await prisma.movie.findMany()

    //     return res.json({ movies })
    // }

    res.json(movieSearch3)

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
//Post a tag
app.post('/movie/:id/tag', async (req, res) => {
    const movieid = req.params.id;
    const tagText = req.body.tagText;
    const tag = await prisma.tag.create({
        data: {
            tagText: tagText,
            movieTags: {
                create: {
                    movieId: movieid,
                }
            }
        }
    })
    res.json(tag.tagText)
})

const verifyUser: RequestHandler = (req, _res, next) => {
    // get the authorization header
    // parse the token
    // use the token to get some information about the user
    // assign the user to req.user

    // req.user = user

    // we'll hardcode the user for now

    req.user = { id: "5" }

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
//Find all favorites by userId
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

// app.delete('/favorite/:id', async (req, res) => {
//     const userid = req.params['id']
//     const favorites = await prisma.favorite.delete({
//         where: {
//             userId: userid,
//             movieId: 
//         }
//     })
//     res.json(favorites)
// }
// )


export default app


