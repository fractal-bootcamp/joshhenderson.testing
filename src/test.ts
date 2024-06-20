import { PrismaClient } from "@prisma/client";

console.log('seriosuly bro')
const prisma = new PrismaClient()

async function handleNewMovie() {

    const movieList = await prisma.movie.create({
        data: {
            title: "Movie Title",
            description: "Movie description"
        }
    });
    console.log('added new movie:', movieList)
    console.log('you suck at code')
};

handleNewMovie()