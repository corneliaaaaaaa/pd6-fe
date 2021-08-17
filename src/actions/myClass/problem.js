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

const readProblem = (token, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_PROBLEM_START });
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
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
};

export {
  browseChallengeOverview,
  readProblem,
};
