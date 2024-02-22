import request from "supertest";
import app from "../../src/app";
import e from "express";
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
  describe("Given a valid user data", () => {
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
/*
 * Testing User Login
 */

describe("GET /api/access/login", () => {
  describe("Given a invalid user data", () => {
    const mockInvalidUserObject = {
      email: "",
      password: "testpassword",
    };
    it("should return a 400 status code as email is empty", async () => {
      // When
      const response = await request(app)
        .get("/api/access/login")
        .send(mockInvalidUserObject);
      // Then
      expect(response.status).toBe(400);
    });

    it("should return a 400 status code as password is empty", async () => {
      mockInvalidUserObject.email = "test@gmail.com";
      mockInvalidUserObject.password = "";
      // When
      const response = await request(app)
        .get("/api/access/login")
        .send(mockInvalidUserObject);
      // Then
      expect(response.status).toBe(400);
    });
  });

  describe("Given a valid user data", () => {
    const mockUserObject = {
      name: "TestUserLoginValid",
      email: "testuserloginvalid@gmail.com",
      password: "testpassword",
    };
    it("should return a 200 status code", async () => {
      // When
      let response = await request(app)
        .post("/api/access/register")
        .send(mockUserObject);
      // Then
      let loginInfo = {
        email: mockUserObject.email,
        password: mockUserObject.password,
      };
      expect(response.status).toBe(201);
      response = await request(app).get("/api/access/login").send(loginInfo);
      // Then
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("token");
      expect(response.body.data).toHaveProperty("user");
      expect(response.body.data.user).toHaveProperty("_id");
      expect(response.body.data.user).toHaveProperty(
        "name",
        mockUserObject.name
      );
      expect(response.body.data.user).toHaveProperty(
        "email",
        mockUserObject.email
      );
    });

    it("should return a 400 status code if the password is incorrect", async () => {
      let loginInfo = {
        email: mockUserObject.email,
        password: "wrongpassword",
      };
      let res = await request(app)
        .get("/api/access/login")
        .send(loginInfo)
        .expect(400);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid email or password");
    });
  });
});
