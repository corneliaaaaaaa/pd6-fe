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

const addChallenge = (token, classId, body) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: challengeConstants.ADD_CHALLENGE_REQUEST });
    const res = await agent.post(`/class/${classId}/challenge`, {
      publicize_type: body.showTime,
      selection_type: body.scoredBy,
      title: body.title,
      description: '',
      start_time: body.startTime,
      end_time: body.endTime,
    }, auth);
    dispatch({ type: challengeConstants.ADD_CHALLENGE_SUCCESS });
  } catch (err) {
    dispatch({
      type: challengeConstants.ADD_CHALLENGE_FAIL,
      error: err,
    });
  }
};

const editChallenge = (token, challengeId, body) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: challengeConstants.EDIT_CHALLENGE_REQUEST });

  agent.patch(`/challenge/${challengeId}`, body, auth)
    .then((res) => {
      console.log('edit challenge res:', res);
      dispatch({
        type: challengeConstants.EDIT_CHALLENGE_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: challengeConstants.EDIT_CHALLENGE_FAIL,
        error: err,
      });
    });
};

const deleteChallenge = (token, challengeId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: challengeConstants.DELETE_CHALLENGE_REQUEST });

  agent.delete(`/challenge/${challengeId}`, auth)
    .then((res) => {
      console.log('delete challenge res:', res);
      dispatch({
        type: challengeConstants.DELETE_CHALLENGE_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: challengeConstants.DELETE_CHALLENGE_FAIL,
        error: err,
      });
    });
};

const fetchChallengeSummary = (token, challengeId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  dispatch({ type: challengeConstants.FETCH_CHALLENGE_SUMMARY_REQUEST });

  agent.get(`/challenge/${challengeId}/statistics/summary`, auth)
    .then((res) => {
      dispatch({
        type: challengeConstants.FETCH_CHALLENGE_SUMMARY_SUCCESS,
        payload: { challengeId, data: res.data.data.tasks },
      });
    })
    .catch((err) => {
      dispatch({
        type: challengeConstants.FETCH_CHALLENGE_SUMMARY_FAIL,
        error: err,
      });
    });
};

export {
  fetchChallenges, addChallenge, editChallenge, deleteChallenge, fetchChallengeSummary,
};
