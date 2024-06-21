import client from "./client"

export const mockMovies = [
    {
        id: "1",
        title: "Tenet",
        description: "Movie for aspiring psychos",
        movieTagMovieId: null,
        movieTagTagId: null
    },
    {
        id: "2",
        title: "Tar",
        description: "Movie for aspiring intellectuals",
        movieTagMovieId: null,
        movieTagTagId: null
    },
]

export const mockUsers = [
    {
        id: "1",
        name: "jared",
    },
    {
        id: "2",
        name: "andrew",
    }, {
        id: "3",
        name: "andrew",
    }, {
        id: "5",
        name: "josh",
    }
];

export const mockFavs = [
    {
        userId: "2",
        movieId: "1",
    },
    {
        userId: "3",
        movieId: "1",
    },
    {
        userId: "3",
        movieId: "2",
    }
];
export const mockFavs2 = [{
    userId: "5",
    movieId: "1",
}

]
export const mockTags = [
    {
        id: "1",
        tagText: "horror"
    },
    {

        id: "2",
        tagText: "romance"
    }
];
export const mockTags2 = [
    {

        tagText: "horror"
    },
    {

        id: "2",
        tagText: "romance"
    }
];


const seed = async () => {
    await client.movie.deleteMany({
        where: {},
    });
    await client.user.deleteMany({
        where: {},
    });
    await client.favorite.deleteMany({
        where: {},
    });
    await client.tag.deleteMany({
        where: {},
    });

    //create movies
    const movie = await client.movie.createMany({
        data: mockMovies
    });

    // create users 
    const user = await client.user.createMany({
        data: mockUsers,
        skipDuplicates: true
    });
    //create favorites
    const favorite = await client.favorite.createMany({
        data: mockFavs,
        skipDuplicates: true
    });
    //make mock tags
    const tag = await client.tag.createMany({
        data: mockTags,
        skipDuplicates: true
    });
};

export default seed;