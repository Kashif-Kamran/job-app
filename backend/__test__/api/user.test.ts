import request from "supertest";
import app from "../../src/app";
//  User Registration Test Suite
describe("POST /api/access/register", () => {
  /*
   * Testing validation checks for user registration
   */
  describe("Given a invalid user data", () => {
    const mockUserObject = {
      name: "testuser",
      email: "",
      password: "testpassword",
    };

    it("should return a 400 status code as email is empty", async () => {
      // When
      const response = await request(app)
        .post("/api/access/register")
        .send(mockUserObject);
      // Then
      expect(response.status).toBe(400);
    });

    it("should return a 400 status code as password is empty", async () => {
      mockUserObject.email = "temp@gmail.com";
      mockUserObject.password = "";
      // When
      const response = await request(app)
        .post("/api/access/register")
        .send(mockUserObject);
      // Then
      expect(response.status).toBe(400);
    });

    it("should return a 400 status code as user name is empty", async () => {
      mockUserObject.password = "testpassword";
      mockUserObject.name = "";
      // When
      const response = await request(app)
        .post("/api/access/register")
        .send(mockUserObject);
      // Then
      expect(response.status).toBe(400);
    });
  });
  /*
   * Testing User Registration
   */
  describe("given a valid user data", () => {
    const mockUserObject = {
      name: "testuser",
      email: "test@gmail.com",
      password: "testpassword",
    };

    it("should return a 201 status code", async () => {
      // When
      const response = await request(app)
        .post("/api/access/register")
        .send(mockUserObject);
      // Then
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data).toHaveProperty("name", mockUserObject.name);
      expect(response.body.data).toHaveProperty("email", mockUserObject.email);
      expect(response.body.data).toHaveProperty("role", "user");
      expect(response.body.data).not.toHaveProperty("password");
    });

    it("should return a 400 status code if the user already exists", async () => {
      // When
      const response = await request(app)
        .post("/api/access/register")
        .send(mockUserObject);
      // Then
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User already exists");
    });
    const mockAdminObject = {
      name: "testAdmin",
      email: "testAdmin1@gmail.com",
      password: "testpassword",
      role: "admin",
    };
    it("should return a 201 status code and role as admin", async () => {
      // When
      const response = await request(app)
        .post("/api/access/register")
        .send(mockAdminObject);
      console.log("Response ; ", response);
      // Then
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data).toHaveProperty("name", mockAdminObject.name);
      expect(response.body.data).toHaveProperty("email", mockAdminObject.email);
      expect(response.body.data).toHaveProperty("role", "admin");
      expect(response.body.data).not.toHaveProperty("password");
    });
  });
});
