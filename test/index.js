import assert from 'assert';
import UtilsTest from "./utils.test";
import AuthApiTest from "./api.auth.test";
import EntryApiTest from "./api.diary.test";



describe('hooks', function() {

  after(function() {
    // runs after all tests in this block
    // process.exit(0);
  });

  UtilsTest();
  AuthApiTest();
  EntryApiTest();
});
