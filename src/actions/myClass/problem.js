import agent from '../agent';
import { problemConstants } from './constant';

const browseChallengeOverview = (token, challengeId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  // TODO: read challenge, get problem, and then get grade
  dispatch({ type: problemConstants.READ_CHALLENGE_START });

  agent
    .get(`/challenge/${challengeId}`, auth)
    .then((res) => {
      dispatch({
        type: problemConstants.READ_CHALLENGE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: problemConstants.READ_CHALLENGE_FAIL,
        error: err,
      });
    });
};

const readProblemInfo = (token, problemId, challengeId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_PROBLEM_START });
  dispatch({ type: problemConstants.READ_CHALLENGE_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const problemInfo = await agent.get(`/problem/${problemId}`, auth);
    dispatch({
      type: problemConstants.READ_PROBLEM_SUCCESS,
      payload: problemInfo.data.data,
    });
  } catch (err) {
    dispatch({
      type: problemConstants.READ_PROBLEM_FAIL,
      errors: err,
    });
  }

  try {
    const challenge = await agent.get(`/challenge/${challengeId}`, auth);
    if (challenge.data.success) {
      dispatch({
        type: problemConstants.READ_CHALLENGE_SUCCESS,
        payload: challenge.data.data,
      });
    } else {
      dispatch({
        type: problemConstants.READ_CHALLENGE_FAIL,
        errors: challenge.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.READ_CHALLENGE_FAIL,
      errors: err,
    });
  }
};

const readSubmissionDetail = (token, submissionId, challengeId, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_SUBMISSION_START });
  dispatch({ type: problemConstants.READ_SUBMISSION_JUDGE_START });
  dispatch({ type: problemConstants.READ_CHALLENGE_START });
  dispatch({ type: problemConstants.READ_PROBLEM_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  // try {
  //   const subInfo = await agent.get(`/submission/${submissionId}`, auth);
  //   if (subInfo.data.success) {
  //     dispatch({
  //       type: problemConstants.READ_SUBMISSION_SUCCESS,
  //       payload: subInfo.data.data,
  //     });
  //   } else {
  //     dispatch({
  //       type: problemConstants.READ_SUBMISSION_FAIL,
  //       errors: subInfo.data.error,
  //     });
  //   }
  // } catch (err) {
  //   dispatch({
  //     type: problemConstants.READ_SUBMISSION_FAIL,
  //     errors: err,
  //   });
  // }
  // try {
  //   const judgment = await agent.get(`/submission/${submissionId}/judgement`, auth);
  //   if (judgment.data.success) {
  //     dispatch({
  //       type: problemConstants.READ_SUBMISSION_JUDGE_SUCCESS,
  //       payload: judgment.data.data,
  //     });
  //   } else {
  //     dispatch({
  //       type: problemConstants.READ_SUBMISSION_JUDGE_FAIL,
  //       errors: judgment.data.error,
  //     });
  //   }
  // } catch (err) {
  //   dispatch({
  //     type: problemConstants.READ_SUBMISSION_JUDGE_FAIL,
  //     errors: err,
  //   });
  // }
  try {
    const challenge = await agent.get(`/challenge/${challengeId}`, auth);
    if (challenge.data.success) {
      dispatch({
        type: problemConstants.READ_CHALLENGE_SUCCESS,
        payload: challenge.data.data,
      });
    } else {
      dispatch({
        type: problemConstants.READ_CHALLENGE_FAIL,
        errors: challenge.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.READ_CHALLENGE_FAIL,
      errors: err,
    });
  }

  try {
    const problem = await agent.get(`/problem/${problemId}`, auth);
    if (problem.data.success) {
      dispatch({
        type: problemConstants.READ_PROBLEM_SUCCESS,
        payload: problem.data.data,
      });
    } else {
      dispatch({
        type: problemConstants.READ_PROBLEM_FAIL,
        errors: problem.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.READ_PROBLEM_FAIL,
      errors: err,
    });
  }
};

export {
  browseChallengeOverview,
  readProblemInfo,
  readSubmissionDetail,
};
