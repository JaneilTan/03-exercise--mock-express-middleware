const request = require("supertest");
const path = require("path");
const jestOpenAPI = require("jest-openapi").default;
const app = require("../app");
const db = require("../db");
const {
  checkJwt,
  checkScopes,
} = require("../middleware/authorizationMiddleware");
// TODO: mock the authorizationMiddleware module.

jestOpenAPI(path.join(__dirname, "../apispec.yaml"));

describe("GIVEN that the POST /property route exist", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    db.end();
  });

  test("WHEN the user is not authenticated THEN return status 401", async () => {
    checkJwt.mockImplementation((req, res, next) => {
      // TODO: mock the checkJwt implementation.
      // Throw an Error object, catch it and pass it to the next middleware
      // Don't forget to set the error status
    });

    const response = await request(app)
      .post("/api/properties")
      .set("Accept", "application/json");

    expect(response.status).toBe(401);
    expect(response).toSatisfyApiSpec();
  });

  test("WHEN the user is authenticated but does not have the right permissions THEN return status 403", async () => {
    // TODO: mock the checkJwt implementation.
    // In this test we have an authenticated user.

    // TODO: mock the checkScopes implementation.
    // The user does not have the right permission.

    const response = await request(app)
      .post("/api/properties")
      .set("Accept", "application/json");

    expect(response.status).toBe(403);
    expect(response).toSatisfyApiSpec();
  });
});
