const request = require("supertest");
const app = require("../index.js");  // This points to our Express app

describe("API Tests", () => {
  it("should return Hello, World!", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Hello, World!");
  });

  it("should return application status", async () => {
    const res = await request(app).get("/status");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("my-application");
    expect(res.body["my-application"][0]).toHaveProperty("description");
    expect(res.body["my-application"][0]).toHaveProperty("version");
    expect(res.body["my-application"][0]).toHaveProperty("sha");
  });
});
