import "@testing-library/jest-dom";
import { render, fireEvent, RenderResult } from "@testing-library/react"; // Import RenderResult for TypeScript support
import { MemoryRouter } from "react-router-dom";
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

describe("Login Component", () => {
    let screen: RenderResult; // Define screen as RenderResult

    const mockSendRequest = jest.fn();
    setupMockUseApiRequest(mockSendRequest);

    beforeEach(() => {
        jest.clearAllMocks();
        screen = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );
    });

    it("renders login form correctly", () => {
        // Destructure getByLabelText from screen.getByLabelText
        const { getByLabelText, getByRole } = screen;

        // Test assertions
        expect(getByLabelText(/email/i)).toBeInTheDocument();
        expect(getByLabelText(/password/i)).toBeInTheDocument();
        expect(getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    it("displays validation messages for empty fields", async () => {
        const { getByRole, findByText } = screen;

        fireEvent.click(getByRole("button", { name: /login/i }));

        const emailError = await findByText(/email is required/i);
        const passwordError = await findByText(/password is required/i);

        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
    });
});
