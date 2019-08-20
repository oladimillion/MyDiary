import assert from 'assert';
import supertest from "supertest";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import http from "../server/server";


const request = supertest(http);
dotenv.config();



const path = "/api/v1/reminders";
const token = jwt.sign({
  userId: "test",
}, process.env.JWT_SECRET);





describe('Delete reminder api test', () => {
  it('should remove entry', done => {
    request.delete(path + "/test").send()
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        assert.equal(res.statusCode, 204);
        done();
      });
  });
});


describe('Add reminder api test', () => {

  const data = {
    time: '2:19:56 PM',
  };


  it('should add a new reminder', done => {
    request.post(path).send(data)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 201);
        assert.equal(response.hasOwnProperty("message"), true);
        assert.equal(response.hasOwnProperty("reminder"), true);
        assert.equal(response.message, "Reminder successfully added");
        assert.equal(typeof response.reminder, "object");
        done();
      });
  });

  it('should not add a new reminder', done => {
    request.post(path).send({time: "invalid time"})
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 500);
        assert.equal(response.hasOwnProperty("error"), true);
        assert.equal(response.error, "Reminder could not be added");
        done();
      });
  });

  it('should not add a new reminder', done => {
    request.post(path).send({time: "invalid time"})
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 401);
        assert.equal(response.hasOwnProperty("error"), true);
        assert.equal(response.error, "Authentication failed. Try again");
        done();
      });
  });

  it('should not add a new reminder', done => {
    request.post(path).send({time: ""})
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 403);
        assert.equal(response.hasOwnProperty("errors"), true);
        assert.equal(response.errors.hasOwnProperty("time"), true);
        assert.equal(response.errors.time, 'This field is required');
        done();
      });
  });


});

describe('Get all reminder api test', () => {

  it('should get all reminders', done => {
    request.get(path).send()
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 200);
        assert.equal(response.hasOwnProperty("message"), true);
        assert.equal(response.hasOwnProperty("reminders"), true);
        assert.equal(response.message, "Reminders successfully fetched");
        done();
      });
  });

  it('should not get all reminders', done => {
    request.get(path).send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 401);
        assert.equal(response.hasOwnProperty("error"), true);
        assert.equal(response.error, "Authentication failed. Try again");
        done();
      });
  });
});


http.close();


