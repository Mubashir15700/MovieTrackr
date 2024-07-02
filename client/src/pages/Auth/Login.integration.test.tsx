import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Login from "./Login";
import store from "../../redux/store";
import * as useApiRequestModule from "../../hooks/useApiRequest";

// Function to set up mock useApiRequest with desired return values
const setupMockUseApiRequest = (mockSendRequest: jest.Mock) => {
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
};

describe("Login Component - Integration Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mock function calls before each test
    });

    // Test Case: Submits Form with Valid Data and Logs in Successfully
    it("submits the form with valid data and logs in successfully", async () => {
        const mockSendRequest = jest.fn();
        setupMockUseApiRequest(mockSendRequest);

        const { getByLabelText, getByRole } = render(
            <MemoryRouter>
                <ErrorBoundary>
                    <Provider store={store}>
                        <Login />
                    </Provider>
                </ErrorBoundary>
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText(/email/i), { target: { value: "test@example.com" } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: "password" } });
        fireEvent.click(getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(mockSendRequest).toHaveBeenCalledTimes(1);
            expect(mockSendRequest).toHaveBeenCalledWith("POST", {
                email: "test@example.com",
                password: "password",
            });
        });
    });

    // Test Case: Handles Invalid Login Attempt
    it("does not submit the form with invalid data", async () => {
        const mockSendRequest = jest.fn();
        setupMockUseApiRequest(mockSendRequest);

        const { getByLabelText, getByRole } = render(
            <MemoryRouter>
                <ErrorBoundary>
                    <Provider store={store}>
                        <Login />
                    </Provider>
                </ErrorBoundary>
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText(/email/i), { target: { value: "invalidemail" } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: "" } });

        fireEvent.click(getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(mockSendRequest).not.toHaveBeenCalled();
        });
    });
});
