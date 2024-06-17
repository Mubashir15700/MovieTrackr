import request from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import User from "../models/userModel.js";

describe("POST /api/auth/signup", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.DB_CONNECTION_STRING!);
    });

    afterAll(async () => {
        // Disconnect from MongoDB after all tests are done
        await mongoose.disconnect();
    });

    it("should create a new user when valid data is provided", async () => {
        // Mock user data
        const userData = {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
        };

        const response = await request(app)
            .post("/signup")
            .send(userData)
            .expect("Content-Type", /json/)
            .expect(201); // Expecting status code 201 for successful creation

        expect(response.body).toHaveProperty("status", "success");
        expect(response.body.data).toHaveProperty("token");
        expect(response.body.data.user).toHaveProperty("name", userData.name);
        expect(response.body.data.user).toHaveProperty("email", userData.email);

        // Assert that the 'set-cookie' header is defined and contains your cookie name
        expect(response.header["set-cookie"]).toBeDefined();
        expect(response.header["set-cookie"][0]).toMatch(/jwt_token=/); // Replace with your actual cookie name

        // Additional assertions on the cookie options if needed
        expect(response.header["set-cookie"][0]).toContain("HttpOnly");
        expect(response.header["set-cookie"][0]).toContain("Secure");
        expect(response.header["set-cookie"][0]).toContain("SameSite=Strict");
    });

    it("should return 409 Conflict if email already exists", async () => {
        // Mock user data with existing email
        const existingUser = new User({
            name: "Jane Smith",
            email: "jane.smith@example.com",
            password: "password456",
        });
        await existingUser.save();

        const userData = {
            name: "John Doe",
            email: "jane.smith@example.com", // Use existing email
            password: "password123",
        };

        // Send POST request to signup endpoint
        const response = await request(app)
            .post("/signup")
            .send(userData)
            .expect("Content-Type", /json/)
            .expect(409); // Expecting status code 409 for conflict

        // Assert the response body
        expect(response.body).toHaveProperty(
            "error",
            "This email is already taken",
        );
    });
});
