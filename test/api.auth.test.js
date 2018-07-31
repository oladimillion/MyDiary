import assert from 'assert';
import supertest from "supertest";
import http from "../server/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


const request = supertest(http);

const _path = "/api/v1/auth";

const token = jwt.sign({
  user_id: "test",
  username: "test",
  email: "test@test.com",
}, process.env.JWT_SECRET);

export default function AuthApiTest(){

  describe('Signup api test', () => {

    const data = {
      user_id: "test",
      username: "test",
      email: "test@test.com",
      password: "test",
    };



    it('should return 200 status code for \
    providing valid data', done => {
      request.post(_path + "/signup").send(data)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });


    it('should return 400 status code \
    for providing empty field', done => {
      request.post(_path + "/signup").send()
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
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
      request.post(_path + "/login").send(data)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });


    it('should return 400 status code', done => {
      request.post(_path + "/login").send()
        .end((err, res) => {
          assert.equal(res.statusCode, 400);
          done();
        });
    });

  });

}

http.close();


