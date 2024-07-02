import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Dashboard from "../../pages/Dashboard/Dashboard";
import MovieForm from "./MovieForm";
import store from "../../redux/store";
import * as useApiRequestModule from "../../hooks/useApiRequest";
import "@testing-library/jest-dom/extend-expect"; // for extended matchers

// Mock useApiRequest hook
jest.mock("../../hooks/useApiRequest");

describe("MovieForm Integration Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mock function calls before each test
    });

    it("navigates to Dashboard after adding a movie", async () => {
        const mockSendRequest = jest.fn().mockResolvedValue({
            status: "success",
            data: {
                movie: {
                    movieId: "movie_id",
                    title: "Movie Title",
                    description: "Movie description",
                    releaseYear: 2023,
                    genre: ["Action", "Thriller"],
                },
            },
        });

        // Mock useApiRequest hook to return the mockSendRequest function
        jest.spyOn(useApiRequestModule, "default").mockReturnValue({
            response: null, // Set initial response to null for triggering useEffect
            error: null,
            loading: false,
            sendRequest: mockSendRequest,
        });

        const { getByLabelText, getByText } = render(
            <MemoryRouter>
                <Provider store={store}>
                    <MovieForm purpose="add" />
                    <Dashboard /> {/* Render Dashboard component to check for added movie */}
                </Provider>
            </MemoryRouter>
        );

        // Simulate user input in the form fields
        fireEvent.change(getByLabelText(/title/i), {
            target: { value: "Movie Title" },
        });
        fireEvent.change(getByLabelText(/description/i), {
            target: { value: "Movie description" },
        });
        fireEvent.change(getByLabelText(/release year/i), {
            target: { value: "2023" },
        });
        fireEvent.change(getByLabelText(/genre/i), {
            target: { value: "Action" },
        });

        // Submit the form
        fireEvent.click(getByText(/submit/i));

        // Wait for the form submission to complete asynchronously
        await waitFor(() => {
            // Assert that sendRequest function is called once with the correct arguments
            expect(mockSendRequest).toHaveBeenCalledTimes(1);
            expect(mockSendRequest).toHaveBeenCalledWith("POST", {
                title: "New Movie",
                description: "A new movie",
                releaseYear: 2023,
                genre: ["Action"],
            });
        });

        // Check navigation to home page after successful form submission
        expect(window.location.pathname).toBe("/");

        // Check if the added movie is displayed on the home page
        const addedMovieTitle = getByText("Movie Title");
        expect(addedMovieTitle).toBeInTheDocument();
    });
});
