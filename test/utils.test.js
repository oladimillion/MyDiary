import assert from 'assert';
import { GenId } from "../server/utils/common";
import { AuthValidator, Validator } from "../server/utils/validators";


describe('Validator function test', () => {

  it('should return an error for\
    providing empty array', done => {
      assert.deepEqual(
        Validator([]), 
        {error: "All fields are required"}
      );
      done();
    });

  it('should return an error for\
    providing no argument', done => {
      assert.deepEqual(
        Validator(), 
        {error: "All fields are required"}
      );
      done();
    });

  it('should return error for\
    providing empty object', done => {
      assert.deepEqual(
        Validator({}),
        {error: "All fields are required"}
      );
      done();
    });

  it('should return error related to username', done => {
    assert.deepEqual(
      Validator({username: ''}), 
      {username: "This field is required"}
    );
    done();
  });

  it('should return error related to entry_title', done => {
    assert.deepEqual(Validator({entry_title: ""}), 
      {entry_title: "This field is required"}
    );
    done();
  });

  it('should return error related to entry_title \
    and entry_content', done => {
      assert.deepEqual(Validator({entry_title: "", entry_content: ""}), 
        {
          entry_title: "This field is required",
          entry_content: "This field is required"
        }
      );
      done();
    });

});

describe('AuthValidator function test', () => {

  it('should return an error for\
    providing empty array', done => {
      assert.deepEqual(AuthValidator([]), 
        {error: "All fields are required"}
      );
      done();
    });

  it('should return an error for\
    providing empty object', done => {
      assert.deepEqual(AuthValidator({}), 
        {error: "All fields are required"});
      done();
    });

  it('should return error related to username', done => {
    assert.deepEqual(AuthValidator({username: 'as'}), 
      {username: "This field must be four characters long at least"});
    done();
  });

  it('should return an error related to email', done => {
    assert.deepEqual(AuthValidator({email: 'email'}), 
      {email: "Enter a valid email"}
    );
    done();
  });

});

describe('GenId function test', () => {

  it('should return generated id of length 8', done => {
    assert.equal(GenId().length, 8);
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



