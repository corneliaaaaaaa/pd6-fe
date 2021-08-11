// auth
// eslint-disable-next-line import/prefer-default-export
// export const userConstants = {
//   AUTH_START: 'AUTH_START',
//   AUTH_SUCCESS: 'AUTH_SUCCESS',
//   AUTH_FAIL: 'AUTH_FAIL',
//   API_CALL_ERROR: 'API_CALL_ERROR',

//   AUTH_LOGOUT: 'AUTH_LOGOUT',

//   SIGNUP_START: 'SIGNUP_START',
//   SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
//   SIGNUP_FAIL: 'SIGNUP_FAIL',

//   FORGET_PASSWORD_START: 'FORGET_PASSWORD_START',
//   FORGET_PASSWORD_SUCCESS: 'FORGET_PASSWORD_SUCCESS',
//   FORGET_PASSWORD_FAIL: 'FORGET_PASSWORD_FAIL',

//   RESET_PASSWORD_START: 'RESET_PASSWORD_START',
//   RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
//   RESET_PASSWORD_FAIL: 'RESET_PASSWORD_FAIL',

//   EDIT_SELF_PASSWORD_START: 'EDIT_SELF_PASSWORD_START',
//   EDIT_SELF_PASSWORD_SUCCESS: 'EDIT_SELF_PASSWORD_SUCCESS',
//   EDIT_SELF_PASSWORD_FAIL: 'EDIT_SELF_PASSWORD_FAIL',

//   EDIT_SELF_ACCOUNT_REQUEST: 'EDIT_SELF_ACCOUNT_REQUEST',
//   EDIT_SELF_ACCOUNT_SUCCESS: 'EDIT_SELF_ACCOUNT_SUCCESS',
//   EDIT_SELF_ACCOUNT_FAIL: 'EDIT_SELF_ACCOUNT_FAIL',

//   MAKE_SELF_STUDENT_CARD_DEFAULT_REQUEST: 'MAKE_SELF_STUDENT_CARD_DEFAULT_REQUEST',
//   MAKE_SELF_STUDENT_CARD_DEFAULT_SUCCESS: 'MAKE_SELF_STUDENT_CARD_DEFAULT_SUCCESS',
//   MAKE_SELF_STUDENT_CARD_DEFAULT_FAIL: 'MAKE_SELF_STUDENT_CARD_DEFAULT_FAIL',

//   GET_SELF_STUDENT_CARD_REQUEST: 'GET_SELF_STUDENT_CARD_REQUEST',
//   GET_SELF_STUDENT_CARD_SUCCESS: 'GET_SELF_STUDENT_CARD_SUCCESS',
//   GET_SELF_STUDENT_CARD_FAIL: 'GET_SELF_STUDENT_CARD_FAIL',

//   ADD_SELF_STUDENT_CARD_REQUEST: 'ADD_SELF_STUDENT_CARD_REQUEST',
//   ADD_SELF_STUDENT_CARD_SUCCESS: 'ADD_SELF_STUDENT_CARD_SUCCESS',
//   ADD_SELF_STUDENT_CARD_FAIL: 'ADD_SELF_STUDENT_CARD_FAIL',
// };

export const accountConstants = {
  FETCH_INSTITUTES_REQUEST: 'FETCH_INSTITUTES_REQUEST',
  FETCH_INSTITUTES_SUCCESS: 'FETCH_INSTITUTES_SUCCESS',
  FETCH_INSTITUTES_FAIL: 'FETCH_INSTITUTES_FAIL',

  FETCH_INSTITUTE_REQUEST: 'FETCH_INSTITUTE_REQUEST',
  FETCH_INSTITUTE_SUCCESS: 'FETCH_INSTITUTE_SUCCESS',
  FETCH_INSTITUTE_FAIL: 'FETCH_INSTITUTE_FAIL',

  ADD_INSTITUTE_REQUEST: 'ADD_INSTITUTE_REQUEST',
  ADD_INSTITUTE_SUCCESS: 'ADD_INSTITUTE_SUCCESS',
  ADD_INSTITUTE_FAIL: 'ADD_INSTITUTE_FAIL',

  EDIT_INSTITUTE_REQUEST: 'RENAME_INSTITUTE_REQUEST',
  EDIT_INSTITUTE_SUCCESS: 'RENAME_INSTITUTE_SUCCESS',
  EDIT_INSTITUTE_FAIL: 'RENAME_INSTITUTE_FAIL',

  FETCH_ACCOUNT_REQUEST: 'FETCH_ACCOUNT_REQUEST',
  FETCH_ACCOUNT_SUCCESS: 'FETCH_ACCOUNT_SUCCESS',
  FETCH_ACCOUNT_FAIL: 'FETCH_ACCOUNT_FAIL',

  FETCH_ACCOUNTS_REQUEST: 'FETCH_ACCOUNTS_REQUEST',
  FETCH_ACCOUNTS_SUCCESS: 'FETCH_ACCOUNTS_SUCCESS',
  FETCH_ACCOUNTS_FAIL: 'FETCH_ACCOUNTS_FAIL',

  EDIT_ACCOUNT_REQUEST: 'EDIT_ACCOUNT_REQUEST',
  EDIT_ACCOUNT_SUCCESS: 'EDIT_ACCOUNT_SUCCESS',
  EDIT_ACCOUNT_FAIL: 'EDIT_ACCOUNT_FAIL',

  DELETE_ACCOUNT_REQUEST: 'DELETE_ACCOUNT_REQUEST',
  DELETE_ACCOUNT_SUCCESS: 'DELETE_ACCOUNT_SUCCESS',
  DELETE_ACCOUNT_FAIL: 'DELETE_ACCOUNT_FAIL',

  MAKE_STUDENT_CARD_DEFAULT_REQUEST: 'MAKE_STUDENT_CARD_DEFAULT_REQUEST',
  MAKE_STUDENT_CARD_DEFAULT_SUCCESS: 'MAKE_STUDENT_CARD_DEFAULT_SUCCESS',
  MAKE_STUDENT_CARD_DEFAULT_FAIL: 'MAKE_STUDENT_CARD_DEFAULT_FAIL',

  FETCH_STUDENT_CARD_REQUEST: 'FETCH_STUDENT_CARD_REQUEST',
  FETCH_STUDENT_CARD_SUCCESS: 'FETCH_STUDENT_CARD_SUCCESS',
  FETCH_STUDENT_CARD_FAIL: 'FETCH_STUDENT_CARD_FAIL',

  ADD_STUDENT_CARD_REQUEST: 'ADD_STUDENT_CARD_REQUEST',
  ADD_STUDENT_CARD_SUCCESS: 'ADD_STUDENT_CARD_SUCCESS',
  ADD_STUDENT_CARD_FAIL: 'ADD_STUDENT_CARD_FAIL',

  EDIT_PASSWORD_REQUEST: 'EDIT_PASSWORD_REQUEST',
  EDIT_PASSWORD_SUCCESS: 'EDIT_PASSWORD_SUCCESS',
  EDIT_PASSWORD_FAIL: 'EDIT_PASSWORD_FAIL',
};

export const courseConstants = {
  FETCH_COURSES_START: 'FETCH_COURSES_START',
  FETCH_COURSES_SUCCESS: 'FETCH_COURSES_SUCCESS',
  FETCH_COURSES_FAIL: 'FETCH_COURSES_FAIL',

  ADD_COURSE_START: 'ADD_COURSE_START',
  ADD_COURSE_SUCCESS: 'ADD_COURSE_SUCCESS',
  ADD_COURSE_FAIL: 'ADD_COURSE_FAIL',

  RENAME_COURSE_START: 'RENAME_COURSE_START',
  RENAME_COURSE_SUCCESS: 'RENAME_COURSE_SUCCESS',
  RENAME_COURSE_FAIL: 'RENAME_COURSE_FAIL',

  DELETE_COURSE_START: 'DELETE_COURSE_START',
  DELETE_COURSE_SUCCESS: 'DELETE_COURSE_SUCCESS',
  DELETE_COURSE_FAIL: 'DELETE_COURSE_FAIL',

  FETCH_CLASSES_START: 'FETCH_CLASSES_START',
  FETCH_CLASSES_SUCCESS: 'FETCH_CLASSES_SUCCESS',
  FETCH_CLASSES_FAIL: 'FETCH_CLASSES_FAIL',

  ADD_CLASS_START: 'ADD_CLASS_START',
  ADD_CLASS_SUCCESS: 'ADD_CLASS_SUCCESS',
  ADD_CLASS_FAIL: 'ADD_CLASS_FAIL',

  RENAME_CLASS_START: 'RENAME_CLASS_START',
  RENAME_CLASS_SUCCESS: 'RENAME_CLASS_SUCCESS',
  RENAME_CLASS_FAIL: 'RENAME_CLASS_FAIL',

  DELETE_CLASS_START: 'DELETE_CLASS_START',
  DELETE_CLASS_SUCCESS: 'DELETE_CLASS_SUCCESS',
  DELETE_CLASS_FAIL: 'DELETE_CLASS_FAIL',

  FETCH_MEMBERS_START: 'FETCH_MEMBERS_START',
  FETCH_MEMBERS_SUCCESS: 'FETCH_MEMBERS_SUCCESS',
  FETCH_MEMBERS_FAIL: 'FETCH_MEMBERS_FAIL',

  EDIT_MEMBERS_START: 'EDIT_MEMBERS_START',
  EDIT_MEMBERS_SUCCESS: 'EDIT_MEMBERS_SUCCESS',
  EDIT_MEMBERS_FAIL: 'EDIT_MEMBERS_FAIL',
};

// export const publicConstants = {
//   GET_INSTITUTE_START: 'GET_INSTITUTE_START',
//   GET_INSTITUTE_SUCCESS: 'GET_INSTITUTE_SUCCESS',
//   GET_INSTITUTE_FAIL: 'GET_INSTITUTE_FAIL',
// };
