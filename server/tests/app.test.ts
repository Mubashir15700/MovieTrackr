import request from "supertest"; // Import supertest for HTTP assertions
import app from "../src/app"; // Adjust the path to app.ts as per your project structure

describe("Express App Tests", () => {
    it("responds with Hello World! on /test GET request", async () => {
        const response = await request(app).get("/test");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello World!");
    });

    it("handles 404 errors", async () => {
        const response = await request(app).get("/nonexistent-route");
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("/nonexistent-route");
    });
});
