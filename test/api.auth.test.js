import assert from 'assert';
import supertest from "supertest";
import http from "../server/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


const request = supertest(http);

const path = "/api/v1/auth";

const token = jwt.sign({
  userId: "test",
}, process.env.JWT_SECRET);


describe('Delete auth api test', () => {
  it('should remove user', done => {
    request.delete(path + "/test").send()
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        assert.equal(res.statusCode, 204);
        done();
      });
  });
});

describe('Signup api test', () => {

  const data = {
    userId: "test",
    username: "test",
    email: "test@test.com",
    password: "test",
  };

  it('should return success message', done => {
    request.post(path + "/signup").send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 201);
        assert.equal(response.hasOwnProperty("token"), true);
        assert.equal(response.hasOwnProperty("message"), true);
        assert.equal(response.hasOwnProperty("user"), true);
        assert.equal(response.message, "Registration successful");
        done();
      });
  });


  it('should return an error message', done => {
    request.post(path + "/signup").send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 400);
        assert.equal(response.hasOwnProperty("errors"), true);
        assert.equal(response.errors.hasOwnProperty("username"), true);
        assert.equal(response.errors.hasOwnProperty("email"), true);
        assert.equal(response.errors.hasOwnProperty("password"), true);
        done();
      });
  });

});

describe('Login api test', () => {

  const data = {
    username: "test",
    password: "test",
  };


  it('should return 200 status code', done => {
    request.post(path + "/login").send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 200);
        assert.equal(response.hasOwnProperty("token"), true);
        assert.equal(response.hasOwnProperty("message"), true);
        assert.equal(response.hasOwnProperty("user"), true);
        assert.equal(response.message, "Login successful");
        done();
      });
  });


  it('should return 400 status code', done => {
    request.post(path + "/login").send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 400);
        assert.equal(response.hasOwnProperty("errors"), true);
        assert.equal(response.errors.hasOwnProperty("username"), true);
        assert.equal(response.errors.hasOwnProperty("password"), true);
        done();
      });
  });

});


http.close();


