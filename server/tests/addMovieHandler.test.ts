import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import { v4 as uuidv4 } from "uuid";
import Watchlist, { WatchlistDocument } from "../src/models/watchlistModel";
import { HttpStatusCode } from "../src/constants/httpStatusCodes";

describe("addMovieHandler Test", () => {
    it("adds a movie to the user's watchlist", async () => {
        // Mock data for the request body
        const mockMovieData = {
            title: "Test Movie",
            description: "Test description",
            releaseYear: 2023,
            genre: ["Action"],
            isWatched: false,
        };

        // Mock user ID
        const mockUserId = new mongoose.Types.ObjectId();

        // Mock Watchlist.findOne to return null (no existing watchlist)
        jest.spyOn(Watchlist, "findOne").mockResolvedValueOnce(null);

        // Mock Watchlist.create to return a new watchlist with the movie added
        const mockCreatedWatchlist = {
            user: mockUserId,
            movies: [{ movieId: uuidv4(), ...mockMovieData }],
        } as WatchlistDocument;
        jest.spyOn(Watchlist, "create").mockResolvedValueOnce(mockCreatedWatchlist);

        // Simulate mock authentication token stored in cookie
        const mockToken = 'mock_token_value';

        // Send a POST request to addMovieHandler endpoint
        const response = await request(app)
            .post("/api/watchlist/movies/add")
            .send(mockMovieData)
            .set("Cookie", `jwt_token=${mockToken}`); // Set the cookie with the JWT token


        // Assertions
        expect(response.status).toBe(HttpStatusCode.CREATED);
        expect(response.body.status).toBe("success");
        expect(response.body.data.movie.title).toBe(mockMovieData.title);
        expect(response.body.data.movie.description).toBe(mockMovieData.description);
        // Add more assertions as per your data structure

        // Verify database interaction
        const updatedWatchlist = await Watchlist.findOne({ user: mockUserId });
        expect(updatedWatchlist).not.toBeNull();
        expect(updatedWatchlist!.movies.length).toBe(1); // Assuming one movie was added
        expect(updatedWatchlist!.movies[0].title).toBe(mockMovieData.title);
    });
});
