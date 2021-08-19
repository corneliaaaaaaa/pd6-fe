// eslint-disable-next-line import/prefer-default-export
export const challengeConstants = {
  FETCH_CHALLENGES_REQUEST: 'FETCH_CHALLENGES_REQUEST',
  FETCH_CHALLENGES_SUCCESS: 'FETCH_CHALLENGES_SUCCESS',
  FETCH_CHALLENGES_FAIL: 'FETCH_CHALLENGES_FAIL',

  ADD_CHALLENGE_REQUEST: 'ADD_CHALLENGE_REQUEST',
  ADD_CHALLENGE_SUCCESS: 'ADD_CHALLENGE_SUCCESS',
  ADD_CHALLENGE_FAIL: 'ADD_CHALLENGE_FAIL',
};

export const gradeConstants = {
  FETCH_CLASS_GRADE_START: 'FETCH_CLASS_GRADE_START',
  FETCH_CLASS_GRADE_SUCCESS: 'FETCH_CLASS_GRADE_SUCCESS',
  FETCH_CLASS_GRADE_FAIL: 'FETCH_CLASS_GRADE_FAIL',

  ADD_CLASS_GRADE_START: 'ADD_CLASS_GRADE_START',
  ADD_CLASS_GRADE_SUCCESS: 'ADD_CLASS_GRADE_SUCCESS',
  ADD_CLASS_GRADE_FAIL: 'ADD_CLASS_GRADE_FAIL',

  FETCH_ACCOUNT_GRADE_START: 'FETCH_ACCOUNT_GRADE_START',
  FETCH_ACCOUNT_GRADE_SUCCESS: 'FETCH_ACCOUNT_GRADE_SUCCESS',
  FETCH_ACCOUNT_GRADE_FAIL: 'FETCH_ACCOUNT_GRADE_FAIL',

  DELETE_GRADE_START: 'DELETE_GRADE_START',
  DELETE_GRADE_SUCCESS: 'DELETE_GRADE_SUCCESS',
  DELETE_GRADE_FAIL: 'DELETE_GRADE_FAIL',

  EDIT_GRADE_START: 'EDIT_GRADE_START',
  EDIT_GRADE_SUCCESS: 'EDIT_GRADE_SUCCESS',
  EDIT_GRADE_FAIL: 'EDIT_GRADE_FAIL',
};

export const teamConstants = {
  FETCH_TEAMS_START: 'FETCH_TEAMS_START',
  FETCH_TEAMS_SUCCESS: 'FETCH_TEAMS_SUCCESS',
  FETCH_TEAMS_FAIL: 'FETCH_TEAMS_FAIL',

  ADD_TEAM_START: 'ADD_TEAM_START',
  ADD_TEAM_SUCCESS: 'ADD_TEAM_SUCCESS',
  ADD_TEAM_FAIL: 'ADD_TEAM_FAIL',

  EDIT_TEAM_START: 'EDIT_TEAM_START',
  EDIT_TEAM_SUCCESS: 'EDIT_TEAM_SUCCESS',
  EDIT_TEAM_FAIL: 'EDIT_TEAM_FAIL',

  FETCH_TEAM_MEMBER_START: 'FETCH_TEAM_MEMBER_START',
  FETCH_TEAM_MEMBER_SUCCESS: 'FETCH_TEAM_MEMBER_SUCCESS',
  FETCH_TEAM_MEMBER_FAIL: 'FETCH_TEAM_MEMBER_FAIL',

  ADD_TEAM_MEMBER_START: 'ADD_TEAM_MEMBER_START',
  ADD_TEAM_MEMBER_SUCCESS: 'ADD_TEAM_MEMBER_SUCCESS',
  ADD_TEAM_MEMBER_FAIL: 'ADD_TEAM_MEMBER_FAIL',

  EDIT_TEAM_MEMBER_START: 'EDIT_TEAM_MEMBER_START',
  EDIT_TEAM_MEMBER_SUCCESS: 'EDIT_TEAM_MEMBER_SUCCESS',
  EDIT_TEAM_MEMBER_FAIL: 'EDIT_TEAM_MEMBER_FAIL',

  DELETE_TEAM_MEMBER_START: 'DELETE_TEAM_MEMBER_START',
  DELETE_TEAM_MEMBER_SUCCESS: 'DELETE_TEAM_MEMBER_SUCCESS',
  DELETE_TEAM_MEMBER_FAIL: 'DELETE_TEAM_MEMBER_FAIL',
};

export const problemConstants = {
  READ_CHALLENGE_START: 'READ_CHALLENGE_START',
  READ_CHALLENGE_SUCCESS: 'READ_CHALLENGE_SUCCESS',
  READ_CHALLENGE_FAIL: 'READ_CHALLENGE_FAIL',

  BROWSE_CLASS_GRADE_START: 'BROWSE_CLASS_GRADE_START',
  BROWSE_CLASS_GRADE_SUCCESS: 'BROWSE_CLASS_GRADE_SUCCESS',
  BROWSE_CLASS_GRADE_FAIL: 'BROWSE_CLASS_GRADE_FAIL',

  READ_PROBLEM_START: 'READ_PROBLEM_START',
  READ_PROBLEM_SUCCESS: 'READ_PROBLEM_SUCCESS',
  READ_PROBLEM_FAIL: 'READ_PROBLEM_FAIL',

  ADD_PROBLEM_START: 'ADD_PROBLEM_START',
  ADD_PROBLEM_SUCCESS: 'ADD_PROBLEM_SUCCESS',
  ADD_PROBLEM_FAIL: 'ADD_PROBLEM_FAIL',

  DELETE_PROBLEM_START: 'DELETE_PROBLEM_START',
  DELETE_PROBLEM_SUCCESS: 'DELETE_PROBLEM_SUCCESS',
  DELETE_PROBLEM_FAIL: 'DELETE_PROBLEM_FAIL',

  EDIT_PROBLEM_START: 'EDIT_PROBLEM_START',
  EDIT_PROBLEM_SUCCESS: 'EDIT_PROBLEM_SUCCESS',
  EDIT_PROBLEM_FAIL: 'EDIT_PROBLEM_FAIL',

  FETCH_TESTCASE_UNDER_PROBLEM_START: 'FETCH_TESTCASE_UNDER_PROBLEM_START',
  FETCH_TESTCASE_UNDER_PROBLEM_SUCCESS: 'FETCH_TESTCASE_UNDER_PROBLEM_SUCCESS',
  FETCH_TESTCASE_UNDER_PROBLEM_FAIL: 'FETCH_TESTCASE_UNDER_PROBLEM_FAIL',

  ADD_TESTCASE_UNDER_PROBLEM_START: 'ADD_TESTCASE_UNDER_PROBLEM_START',
  ADD_TESTCASE_UNDER_PROBLEM_SUCCESS: 'ADD_TESTCASE_UNDER_PROBLEM_SUCCESS',
  ADD_TESTCASE_UNDER_PROBLEM_FAIL: 'ADD_TESTCASE_UNDER_PROBLEM_FAIL',

  SUBMIT_PROBLEM_START: 'SUBMIT_PROBLEM_START',
  SUBMIT_PROBLEM_SUCCESS: 'SUBMIT_PROBLEM_SUCCESS',
  SUBMIT_PROBLEM_FAIL: 'SUBMIT_PROBLEM_FAIL',

  READ_TESTCASE_START: 'READ_TESTCASE_START',
  READ_TESTCASE_SUCCESS: 'READ_TESTCASE_SUCCESS',
  READ_TESTCASE_FAIL: 'READ_TESTCASE_FAIL',

  DELETE_TESTCASE_START: 'DELETE_TESTCASE_START',
  DELETE_TESTCASE_SUCCESS: 'DELETE_TESTCASE_SUCCESS',
  DELETE_TESTCASE_FAIL: 'DELETE_TESTCASE_FAIL',

  READ_SUBMISSION_START: 'READ_SUBMISSION_START',
  READ_SUBMISSION_SUCCESS: 'READ_SUBMISSION_SUCCESS',
  READ_SUBMISSION_FAIL: 'READ_SUBMISSION_FAIL',

  READ_SUBMISSION_JUDGE_START: 'READ_SUBMISSION_JUDGE_START',
  READ_SUBMISSION_JUDGE_SUCCESS: 'READ_SUBMISSION_JUDGE_SUCCESS',
  READ_SUBMISSION_JUDGE_FAIL: 'READ_SUBMISSION_JUDGE_FAIL',
};

export const memberConstants = {};

export const submissionConstants = {
  FETCH_ALL_SUBMISSIONS_START: 'FETCH_ALL_SUBMISSIONS_START',
  FETCH_ALL_SUBMISSIONS_SUCCESS: 'FETCH_ALL_SUBMISSIONS_SUCCESS',
  FETCH_ALL_SUBMISSIONS_FAIL: 'FETCH_ALL_SUBMISSIONS_FAIL',

  FETCH_SUBMISSION_START: 'FETCH_SUBMISSION_START',
  FETCH_SUBMISSION_SUCCESS: 'FETCH_SUBMISSION_SUCCESS',
  FETCH_SUBMISSION_FAIL: 'FETCH_SUBMISSION_FAIL',

  ADD_SUBMISSION_START: 'ADD_SUBMISSION_START',
  ADD_SUBMISSION_SUCCESS: 'ADD_SUBMISSION_SUCCESS',
  ADD_SUBMISSION_FAIL: 'ADD_SUBMISSION_FAIL',

  FETCH_JUDGEMENT_START: 'FETCH_JUDGEMENT_START',
  FETCH_JUDGEMENT_SUCCESS: 'FETCH_JUDGEMENT_SUCCESS',
  FETCH_JUDGEMENT_FAIL: 'FETCH_JUDGEMENT_FAIL',
};
