import assert from 'assert';
import supertest from "supertest";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import http from "../server/server";

dotenv.config();




const request = supertest(http);
const _path = "/api/v1/entries";
const token = jwt.sign({
  user_id: "test",
  username: "test",
  email: "test@test.com",
}, process.env.JWT_SECRET);




describe('Delete user api test', () => {
  it('should return 200 status code', done => {
    request.delete(_path + "/test").send()
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        done();
      });
  });
});



describe('Create entry api test', () => {

  const data = {
    entry_title: 'this is a title',
    entry_content: 'this is a content',
  };


  it('should return 200 status code', done => {
    request.post(_path).send(data)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        done();
      });
  });


  it('should return 400 status code for submitting\
      empty fields', done => {
        request.post(_path).send({})
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            assert.equal(res.statusCode, 400);
            done();
          });
      });

  it('should return an payload object after\
      successful creation of an entry', done => {
        request.post(_path).send(data)
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            assert.equal(typeof JSON.parse(res.text).entry, "object");
            done();
          });
      });

  it('should return an message of type string', done => {
    request.post(_path).send(data)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        assert.equal(typeof JSON.parse(res.text).message, "string");
        done();
      });
  });

  it('should return "Entry successfully added" message after\
      successful creation of an entry', done => {
        request.post(_path).send(data)
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            assert.deepEqual(JSON.parse(res.text).message, 
              "Entry successfully added");
            done();
          });
      });

  it('should return {entry_title: "This field is required", \
      entry_content: "This field is required"} error \
      message for submitting empty fields', done => {
        request.post(_path).send({})
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            assert.deepEqual(JSON.parse(res.text).errors, 
              {
                entry_title: "This field is required", 
                entry_content: "This field is required"
              });
            done();
          });
      });

  it('should return same object as the submitted data', done => {
    request.post(_path).send(data)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        const payload = JSON.parse(res.text).entry;
        assert.equal(payload.entry_title, data.entry_title);
        assert.equal(payload.entry_date, data.entry_date);
        assert.equal(payload.entry_content, data.entry_content);
        done();
      });
  });

});

describe('Get all entries api test', () => {

  it('should return 200 status code\
      successful fetch request', done => {
        request.get(_path)
          .send()
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            assert.equal(res.statusCode, 200);
            done();
          });
      });

  it('should always return an object', done => {
    request.get(_path)
      .send()
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        assert.equal(typeof JSON.parse(res.text), "object");
        done();
      });
  });

  it('should return an object with entries array', done => {
    request.get(_path).send()
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        assert.equal(Array.isArray(JSON.parse(res.text).entries), true);
        done();
      });
  });

});


describe('Get single entry api test', () => {

  it('should return 404 status code for\
      fetching entry of non-exiting id', done => {
        request.get(_path + "/randomid").send()
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            assert.equal(res.statusCode, 404);
            done();
          });
      });

  it('should always return an object', done => {
    request.get(_path + "/randomid").send()
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        assert.equal(typeof JSON.parse(res.text), "object");
        done();
      });
  });

  it('should return an error message of "Entry not found" for\
      fetching entry of non-exiting id', done => {
        request.get(_path + "/randomid").send()
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            assert.equal(JSON.parse(res.text).error, "Entry not found");
            done();
          });
      });

  it('should return an error message of type String for\
      fetching entry of non-exiting id', done => {
        request.get(_path + "/randomid").send()
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            assert.equal(typeof JSON.parse(res.text).error, "string");
            done();
          });
      });

});



describe('Update single entry api test', () => {

  const data = {
    entry_title: 'this is a title',
    entry_date: '12/07/2018',
    entry_content: 'this is a content',
  };

  it('should return 400 status code for \
      submitting empty fields', done => {
        request.put(_path + "/randomid").send({})
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            assert.equal(res.statusCode, 400);
            done();
          });
      });

  it('should return {entry_title: "This field is required", \
      entry_content: "This field is required"} error \
      message for submitting empty fields', done => {
        request.put(_path + "/randomid").send({})
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            assert.deepEqual(JSON.parse(res.text).errors, 
              {
                entry_title: "This field is required", 
                entry_content: "This field is required"
              });
            done();
          });
      });

  it('should return 404 status code for \
      updating non-exiting entry', done => {
        request.put(_path + "/randomid").send(data)
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            assert.equal(res.statusCode, 404);
            done();
          });
      });

  it('should return an "Entry not found" error\
      message for updating non-exiting entry', done => {
        request.put(_path + "/randomid").send(data)
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            assert.equal(JSON.parse(res.text).error, 
              "Entry not found");
            done();
          });
      });
});


http.close();



