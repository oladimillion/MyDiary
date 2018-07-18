import assert from 'assert';
import { GenId } from "../server/utils/common";
import { Validator } from "../server/utils/validator";

describe('Validator function test', () => {

  it('should return "[All fields are required]" for\
    providing empty array', done => {
    assert.deepEqual(Validator([]), ["All fields are required"]);
    done();
  });

  it('should return "[All fields are required]" for\
    providing no argument', done => {
    assert.deepEqual(Validator(), ["All fields are required"]);
    done();
  });

  it('should return "[All fields are required]" for\
    providing empty object', done => {
    assert.deepEqual(Validator({}), ["All fields are required"]);
    done();
  });

  it('should return "[username is required]" for\
    providing {username: ""}', done => {
      assert.deepEqual(Validator({username: ''}), 
        ["username is required"]);
    done();
  });

  it('should return "[entry title is required]" for\
    providing {entry_title: ""}', done => {
      assert.deepEqual(Validator({entry_title: ""}), 
        ["entry title is required"]);
    done();
  });

  it('should return "[entry title is required]" for\
    providing {entry_title: "", entry_date: ""}', done => {
      assert.deepEqual(Validator({entry_title: "", entry_date: ""}), 
        ["entry title is required", "entry date is required"]);
    done();
  });

});

describe('GenId function test', () => {

  it('should return generated id of length 6', done => {
    assert.equal(GenId().length, 6);
    done();
  });

  it('should return generated id of length 10', done => {
    assert.equal(GenId(10).length, 10);
    done();
  });

  it('should return generated id of length 20', done => {
    assert.equal(GenId(20).length, 20);
    done();
  });

});



