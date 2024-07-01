import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Login from "./Login";
import store from "../../redux/store";
import * as useApiRequestModule from "../../hooks/useApiRequest";

describe("Login Component", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mock function calls before each test
    });

    // Test Case Name: Renders Login Form Correctly
    it("renders login form correctly", async () => {
        // Render the Login component within BrowserRouter and ErrorBoundary
        const { findByLabelText, findByRole } = render(
            <BrowserRouter>
                <ErrorBoundary>
                    <Provider store={store}>
                        <Login />
                    </Provider>
                </ErrorBoundary>
            </BrowserRouter>
        );

        // Use findBy queries which are asynchronous and wait until the element appears
        const emailInput = await findByLabelText(/email/i);
        const passwordInput = await findByLabelText(/password/i);
        const loginButton = await findByRole("button", { name: /login/i });

        // Assert that email and password inputs, and login button are rendered
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    // Test Case Name: Submits Form with Valid Data and Logs in Successfully
    it("submits the form with valid data and logs in successfully", async () => {
        const mockSendRequest = jest.fn();

        // Mock useApiRequest hook to return a successful response
        jest.spyOn(useApiRequestModule, "default").mockReturnValue({
            response: {
                status: "success",
                data: {
                    user: {
                        _id: "user_id",
                        name: "Test User",
                        email: "test@example.com",
                    },
                },
            },
            error: null,
            loading: false,
            sendRequest: mockSendRequest,
        });

        // Render the Login component within BrowserRouter and ErrorBoundary
        const { getByLabelText, getByRole } = render(
            <BrowserRouter>
                <ErrorBoundary>
                    <Provider store={store}>
                        <Login />
                    </Provider>
                </ErrorBoundary>
            </BrowserRouter>
        );

        // Simulate user input and form submission
        fireEvent.change(getByLabelText(/email/i), { target: { value: "test@example.com" } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: "password" } });
        fireEvent.click(getByRole("button", { name: /login/i }));

        // Wait for the API request to complete
        await waitFor(() => {
            // Assert that sendRequest function is called with the correct arguments
            expect(mockSendRequest).toHaveBeenCalledTimes(1);
            expect(mockSendRequest).toHaveBeenCalledWith("POST", {
                email: "test@example.com",
                password: "password",
            });
        });
    });

    // Test Case Name: Handles Invalid Login Attempt
    it("does not submit the form with invalid data", async () => {
        const mockSendRequest = jest.fn();

        // Mock useApiRequest hook to return a successful response
        jest.spyOn(useApiRequestModule, "default").mockReturnValue({
            response: {
                status: "success",
                data: {
                    user: {
                        _id: "user_id",
                        name: "Test User",
                        email: "test@example.com",
                    },
                },
            },
            error: null,
            loading: false,
            sendRequest: mockSendRequest,
        });

        // Render the Login component within BrowserRouter and ErrorBoundary
        const { getByLabelText, getByRole } = render(
            <BrowserRouter>
                <ErrorBoundary>
                    <Provider store={store}>
                        <Login />
                    </Provider>
                </ErrorBoundary>
            </BrowserRouter>
        );

        // Simulate user input with invalid email and password
        fireEvent.change(getByLabelText(/email/i), { target: { value: "invalidemail" } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: "" } });

        fireEvent.click(getByRole("button", { name: /login/i }));

        // Wait for the API request to complete
        await waitFor(() => {
            // Assert that sendRequest function is not called for invalid data
            expect(mockSendRequest).not.toHaveBeenCalled();
        });
    });
});
