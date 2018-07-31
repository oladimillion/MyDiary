import assert from 'assert';
import UtilsTest from "./utils.test";
import AuthApiTest from "./api.auth.test";
import EntryApiTest from "./api.diary.test";
import DiaryModel from "../server/models/diary-model";
import SignupModel from "../server/models/signup-model";


const diaryModel = new DiaryModel();
const signupModel = new SignupModel();

describe('hooks', function() {

  before(function() {
    // runs before all tests in this block
    Promise.all([
      diaryModel.deleteAll({user_id: "test"}),
      signupModel.delete({username: "test"}),
    ]);
  });


  UtilsTest();
  AuthApiTest();
  EntryApiTest();

});
