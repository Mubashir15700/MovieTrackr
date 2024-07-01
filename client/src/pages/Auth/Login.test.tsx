import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Login from "./Login";

test("renders Login component", () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    );

    // Add your assertions here
    expect(screen.getByText("Login")).toBeInTheDocument();
});
