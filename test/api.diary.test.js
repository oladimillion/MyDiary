import assert from 'assert';
import supertest from "supertest";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import http from "../server/server";


const request = supertest(http);
dotenv.config();



const path = "/api/v1/entries";
const token = jwt.sign({
  userId: "test",
}, process.env.JWT_SECRET);





describe('Delete entry api test', () => {
  it('should remove entry', done => {
    request.delete(path + "/test").send()
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        assert.equal(res.statusCode, 204);
        done();
      });
  });
});


describe('Create entry api test', () => {

  const data = {
    entryTitle: 'this is a title',
    entryContent: 'this is a content',
  };


  it('should add a new entry', done => {
    request.post(path).send(data)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 201);
        assert.equal(response.hasOwnProperty("entry"), true);
        assert.equal(response.entry.hasOwnProperty("user_id"), true);
        assert.equal(response.entry.hasOwnProperty("entry_id"), true);
        assert.equal(response.entry.hasOwnProperty("entry_title"), true);
        assert.equal(response.entry.hasOwnProperty("entry_content"), true);
        assert.equal(response.entry.hasOwnProperty("created_at"), true);
        assert.equal(response.entry.hasOwnProperty("updated_at"), true);
        assert.equal(typeof response.entry, "object");
        assert.equal(response.entry.user_id, "test");
        assert.equal(response.entry.entry_title, "this is a title");
        assert.equal(response.entry.entry_content, "this is a content");
        done();
      });
  });



  it('should return an error message', done => {
    request.post(path).send({})
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 400);
        assert.equal(response.hasOwnProperty("errors"), true);
        assert.equal(
          response.errors.hasOwnProperty("entryTitle"), true
        );
        assert.equal(
          response.errors.hasOwnProperty("entryContent"), true
        );
        assert.equal(
          response.errors.entryTitle, 
          "This field is required"
        );
        assert.equal(
          response.errors.entryContent, 
          "This field is required"
        );
        done();
      });
  });

  it('should create an entry', done => {
    request.post(path).send(data)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(typeof response.entry, "object");
        assert.equal(response.hasOwnProperty("entry"), true);
        assert.equal(
          response.entry.hasOwnProperty("entry_title"), true
        );
        assert.equal(
          response.entry.hasOwnProperty("entry_content"), true
        );
        done();
      });
  });


  it('should return an error message', done => {
    request.post(path).send({})
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        assert.deepEqual(JSON.parse(res.text).errors, 
          {
            entryTitle: "This field is required", 
            entryContent: "This field is required"
          });
        done();
      });
  });

  it('should return same response data as the submitted data', done => {
    request.post(path).send(data)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const payload = JSON.parse(res.text).entry;
        assert.equal(payload.entry_title, data.entryTitle);
        assert.equal(payload.entry_content, data.entryContent);
        done();
      });
  });

  it('should return an error', done => {
    request.post(path)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 401);
        assert.equal(response.hasOwnProperty("error"), true);
        done();
      });
  });

});

describe('Get all entries api test', () => {

  it('should require authentication', done => {
    request.get(path)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 401);
        assert.equal(response.hasOwnProperty("error"), true);
        done();
      });
  });


  it('should return entries', done => {
    request.get(path).send()
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(response.hasOwnProperty("message"), true);
        assert.equal(response.hasOwnProperty("entries"), true);
        done();
      });
  });

  it('should return an object with entries array', done => {
    request.get(path).send()
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(response.hasOwnProperty("message"), true);
        assert.equal(response.hasOwnProperty("entries"), true);
        assert.equal(Array.isArray(response.entries), true);
        done();
      });
  });

});


describe('Get single entry api test', () => {

  it('should require authentication', done => {
    request.get(path + "/randomid")
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 401);
        assert.equal(response.hasOwnProperty("error"), true);
        done();
      });
  });

  it('should return 404 status code', done => {
    request.get(path + "/randomid").send()
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 404);
        assert.equal(response.error, "Entry not found");
        done();
      });
  });

});


describe('Update single entry api test', () => {

  const data = {
    entryTitle: 'this is a title',
    entryContent: 'this is a content',
  };

  it('should require authentication', done => {
    request.put(path + "/randomid")
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 401);
        assert.equal(response.hasOwnProperty("error"), true);
        assert.equal(response.error, "Authentication failed. Try again");
        done();
      });
  });

  it('should return error messages', done => {
    request.put(path + "/randomid").send({})
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 400);
        assert.equal(response.hasOwnProperty("errors"), true);
        assert.equal(
          response.errors.hasOwnProperty("entryTitle"), true
        );
        assert.equal(
          response.errors.hasOwnProperty("entryContent"), true
        );
        assert.equal(
          response.errors.entryTitle, 
          "This field is required"
        );
        done();
      });
  });


  it('should return 404 status code', done => {
    request.get(path + "/randomid").send()
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.equal(res.statusCode, 404);
        assert.equal(response.error, "Entry not found");
        done();
      });
  });

  it('should return fields that are not provided', done => {
    request.put(path + "/randomid").send({})
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        assert.deepEqual(response.errors, 
          {
            entryTitle: "This field is required", 
            entryContent: "This field is required"
          });
        done();
      });
  });

});


http.close();



