import assert from 'assert';
import supertest from "supertest";
import http from "../server/server";

const request = supertest(http);


const _path = "/api/v1/entries";

describe('Get all entries api test', () => {

  it('should return 200 status code\
    successful fetch request', done => {
    request.get(_path).send().end((err, res) => {
			assert.equal(res.statusCode, 200);
			done();
		});
  });

  it('should always return an object', done => {
    request.get(_path).send().end((err, res) => {
			assert.equal(typeof JSON.parse(res.text), "object");
			done();
		});
  });

  it('should return an object with payload array', done => {
    request.get(_path).send().end((err, res) => {
			assert.equal(Array.isArray(JSON.parse(res.text).payload), true);
			done();
		});
  });

});


describe('Get single entry api test', () => {

  it('should return 400 status code for\
    fetching entry of non-exiting id', done => {
    request.get(_path + "/randomid").send().end((err, res) => {
			assert.equal(res.statusCode, 400);
			done();
		});
  });

  it('should always return an object', done => {
    request.get(_path + "/randomid").send().end((err, res) => {
			assert.equal(typeof JSON.parse(res.text), "object");
			done();
		});
  });

  it('should return an object with array of error message for\
    fetching entry of non-exiting id', done => {
    request.get(_path + "/randomid").send().end((err, res) => {
			assert.equal(Array.isArray(JSON.parse(res.text).message), true);
			done();
		});
  });

  it('should return an "Entry not found" error message for\
    fetching entry of non-exiting id', done => {
    request.get(_path + "/randomid").send().end((err, res) => {
      assert.deepEqual(JSON.parse(res.text).message, 
        ["Entry not found"]);
			done();
		});
  });

});

describe('Create entry api test', () => {
  const data = {
    entry_title: 'this is a title',
    entry_date: '12/07/2018',
    entry_content: 'this is a content',
  };

  it('should return 200 status code', done => {
    request.post(_path).send(data).end((err, res) => {
      assert.equal(res.statusCode, 200);
      done();
    });
  });

  it('should return 403 status code for submitting\
    empty fields', done => {
    request.post(_path).send({}).end((err, res) => {
      assert.equal(res.statusCode, 403);
      done();
    });
  });

  it('should return an payload object after\
    successful creation of an entry', done => {
    request.post(_path).send(data).end((err, res) => {
      assert.equal(typeof JSON.parse(res.text).payload, "object");
      done();
    });
  });

  it('should return an object with message array after\
    successful creation of an entry', done => {
    request.post(_path).send(data).end((err, res) => {
      assert.equal(Array.isArray(JSON.parse(res.text).message), true);
      done();
    });
  });

  it('should return ["Entry successfully added"] message after\
    successful creation of an entry', done => {
    request.post(_path).send(data).end((err, res) => {
      assert.deepEqual(JSON.parse(res.text).message, 
        ["Entry successfully added"]);
			done();
		});
  });

  it('should return ["All fields are required"] error \
    message for submitting empty fields', done => {
    request.post(_path).send({}).end((err, res) => {
      assert.deepEqual(JSON.parse(res.text).message, 
        ["All fields are required"]);
			done();
		});
  });

  it('should return same object as the submitted data', done => {
    request.post(_path).send(data).end((err, res) => {
      const payload = JSON.parse(res.text).payload;
      assert.equal(payload.entry_title, data.entry_title);
      assert.equal(payload.entry_date, data.entry_date);
      assert.equal(payload.entry_content, data.entry_content);
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

  it('should return 403 status code for \
    submitting empty fields', done => {
    request.put(_path + "/randomid").send({}).end((err, res) => {
			assert.equal(res.statusCode, 403);
			done();
		});
  });

  it('should return "All fields are required" error \
    message for submitting empty fields', done => {
    request.put(_path + "/randomid").send({}).end((err, res) => {
      assert.deepEqual(JSON.parse(res.text).message, 
        ["All fields are required"]);
			done();
		});
  });

  it('should return 400 status code for \
    updating non-exiting entry', done => {
    request.put(_path + "/randomid").send(data).end((err, res) => {
			assert.equal(res.statusCode, 400);
			done();
		});
  });

  it('should return an "Entry not found" error\
    message for updating non-exiting entry', done => {
    request.put(_path + "/randomid").send(data).end((err, res) => {
      assert.deepEqual(JSON.parse(res.text).message, 
        ["Entry not found"]);
			done();
		});
  });

});


http.close();



