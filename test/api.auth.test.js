import assert from 'assert';
import supertest from "supertest";
import http from "../server/server";


const request = supertest(http);

const _path = "/api/v1/auth";



describe('Delete use api test', () => {
  it('should return 200 status code', done => {
    request.delete(_path + "/test").send()
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        done();
      });
  });
});


describe('Signup api test', () => {

  const data = {
    user_id: "test",
    username: "test",
    email: "test@test.com",
    password: "test",
  };


  it('should return 200 status code', done => {
    request.post(_path + "/signup").send(data)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        done();
      });
  });


  it('should return 400 status code', done => {
    request.post(_path + "/signup").send()
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        done();
      });
  });


  it('should return errors of type object', done => {
    request.post(_path + "/signup").send()
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(typeof JSON.parse(res.text).errors, "object");
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


  it('should return errors of type object', done => {
    request.post(_path + "/signup").send()
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(typeof JSON.parse(res.text).errors, "object");
        done();
      });
  });

});



http.close();



