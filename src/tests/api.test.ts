import seed, { mockFavs, mockMovies, mockTags, mockTags2 } from "../seed";

import { beforeEach, describe, expect, it, test, vi } from 'vitest'
import { sum } from "../App";
import prisma from "../client";
import supertest from "supertest";
import { mockFavs2 } from "../seed";
import app from "../../server"

// practice test
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})
//before each run the seed file
beforeEach(async () => {
    await seed();
});
//Check environment variables
describe("check environment variables", () => {
    it("should return the expect postgres database url", () => {
        expect(process.env.DATABASE_URL).toBe(
            "postgresql://josh:postgres@localhost:10101/testing"
        );
    });
});
//return all movies - homepage 
describe('find all movies', () => {
    it("finds all of the movie items in the database", async () => {
        const response = await supertest(app).get("/").expect(200)

        expect(response.body).toEqual(mockMovies)
    })
})
//Get Movie by search query
describe('movie search works', () => {
    it("does a full text search", async () => {
        const movies = await prisma.movie.findMany()
        console.log(movies)
        const response = await supertest(app).get("/movies?title=Ta&description=intellectuals").expect(200)

        expect(response.body).toEqual([{
            id: "2",
            title: "Tar",
            description: "Movie for aspiring intellectuals",
            movieTagMovieId: null,
            movieTagTagId: null
        }])
    })
})

//Movie Details Page



// Post a tag 
describe('make a tag', () => {
    it("post a tag", async () => {
        const reponse = await supertest(app).post("/movie/1/tag")
            .send({
                tagText: "horror"
            })
            .set('Content-Type', 'application/json').expect(200)
        expect(reponse.body).toEqual("horror")
    })
})

//Add to favorites

describe('add movie to a users favorite list', () => {
    it("assigns the movie selected to the user's favorite list", async () => {
        const response = await supertest(app).post('/favorite/1').expect(200);
        expect(response.body).toEqual(mockFavs2[0])
    })
})

//Movie Favorites Page
//Find all favorites by userId
describe('find all user favorites', () => {
    it("finds all of the favorites for a user in the database", async () => {
        const response = await supertest(app).get("/favorite/2").expect(200);
        expect(response.body).toEqual([mockFavs[0]])
    })
})

//Delete a favorite
// describe('delete a favorite', () => {
//     it('deletes a favorite', async () => {
//         const favorite = await supertest(app).get("/movies?title:ta description:intellectuals").expect(200)await prisma.favorite.findMany();
//             data: {
//                 userId: userid,
//                 movieId: movieid
//             }
//     })
// })




