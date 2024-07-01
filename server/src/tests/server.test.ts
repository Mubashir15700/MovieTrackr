const request = require("supertest");
const app = require("../app"); // Import your Express app instance

describe("Express Server Test", () => {
    // Test case for the /test endpoint
    it("GET /test should return 200 OK", async () => {
        const response = await request(app).get("/test");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello World!");
    });

    // Test case for a non-existing endpoint
    it("GET /nonexistent should return 404 Not Found", async () => {
        const response = await request(app).get("/nonexistent");
        expect(response.status).toBe(404);
        // You can add more assertions based on your error handling logic
        expect(response.body.message).toBe("/nonexistent"); // Assuming your errorHandler sends back a message
    });
});
