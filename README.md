# MyDiary &nbsp;[![Build Status](https://travis-ci.com/oladimillion/MyDiary.svg?branch=develop)](https://travis-ci.com/oladimillion/MyDiary) &nbsp; [![Coverage Status](https://coveralls.io/repos/github/oladimillion/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/oladimillion/MyDiary?branch=develop) &nbsp; [![Test Coverage](https://api.codeclimate.com/v1/badges/89acbd6eef30f6f96119/test_coverage)](https://codeclimate.com/github/oladimillion/MyDiary/test_coverage) &nbsp; [![Maintainability](https://api.codeclimate.com/v1/badges/89acbd6eef30f6f96119/maintainability)](https://codeclimate.com/github/oladimillion/MyDiary/maintainability)

> MyDiary is an online journal where you can
> pen down your thoughts and feelings

## Running the app locally
  1. Clone the repository:
  ```
  git clone https://github.com/oladimillion/MyDiary.git
  ```
  2. Navigate into the cloned repository folder

  3. Install dependencies:
  ```
  $ npm install
  ```
  4. run `npm run start` to start the server

  5. visit `http://localhost:8000`

## App is live
  visit [https://mydiary-ola.herokuapp.com](https://mydiary-ola.herokuapp.com)

## App's API endpoints

| Functionality       |  HTTP Method  |         API endpoints                |
| ------------------- | --------------|------------------------------------- |
| Login               | POST          | /api/v1/auth/login                   |
| Registration        | POST          | /api/v1/auth/signup                  |
| Update Profile      | PUT           | /api/v1/auth/update                  |
| Add entry           | POST          | /api/v1/entries                      |
| Update entry        | PUT           | /api/v1/entries/&lt;entryId&gt;      |
| Entry List          | GET           | /api/v1/entries                      |
| Entry Detail        | GET           | /api/v1/entries/&lt;entryId&gt;      |
| Delete entry        | DELETE        | /api/v1/entries/&lt;entryId&gt;      |
| Add/update reminder | POST          | /api/v1/reminders                    |
| Delete reminder     | DELETE        | /api/v1/reminders/&lt;remindersId&gt;|


## App's template on Github Pages

|          Templates           |                                              URLs                                     |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| Login                        | [Login](https://oladimillion.github.io/MyDiary/UI/login.html)                          |
| Registration                 | [Registration](https://oladimillion.github.io/MyDiary/UI/register.html)                |
| Add and Modify               | [Add and Modify](https://oladimillion.github.io/MyDiary/UI/entry.html)                 |
| Entry List and Entry Content | [Entry List and Entry Content](https://oladimillion.github.io/MyDiary/UI/entries.html) |



