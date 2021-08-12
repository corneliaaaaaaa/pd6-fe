import agent from '../agent';
import {
  challengeConstants,
} from './constant';

const fetchChallenges = (token, classId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: challengeConstants.FETCH_CHALLENGES_REQUEST });

  agent.get(`/class/${classId}/challenge`, auth)
    .then((res) => {
      dispatch({
        type: challengeConstants.FETCH_CHALLENGES_SUCCESS,
        payload: { classId, data: res.data.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: challengeConstants.FETCH_CHALLENGES_FAIL,
        error: err,
      });
    });
};

const addChallenge = (token, classId, type, publicizeType, title, description, startTime, endTime) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: challengeConstants.ADD_CHALLENGE_REQUEST });

  agent.post(`/class/${classId}/challenge`, {
    type,
    publicize_type: publicizeType,
    title,
    description,
    start_time: startTime,
    end_time: endTime,
  }, auth)
    .then((res) => {
      dispatch({
        type: challengeConstants.ADD_CHALLENGE_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: challengeConstants.ADD_CHALLENGE_FAIL,
        error: err,
      });
    });
};

export {
  fetchChallenges, addChallenge,
};
