import agent from '../agent';
import { commonConstants } from './constant';

const getInstitutes = () => (dispatch) => {
  dispatch({ type: commonConstants.GET_INSTITUTE_START });

  agent
    .get('/institute')
    .then((res) => {
      dispatch({
        type: commonConstants.GET_INSTITUTE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: commonConstants.GET_INSTITUTE_FAIL,
        error: err,
      });
    });
};

const fetchClassMembers = (token, classId) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: commonConstants.FETCH_CLASS_MEMBERS_REQUEST });
    const res = await agent.get(`/class/${classId}/member`, auth);
    console.log(res);
    dispatch({ type: commonConstants.FETCH_CLASS_MEMBERS_SUCCESS, payload: { classId, data: res.data.data } });
  } catch (err) {
    dispatch({
      type: commonConstants.FETCH_CLASS_MEMBERS_FAIL,
      error: err,
    });
  }
};

const editClassMember = (token, classId, editedList) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: commonConstants.EDIT_CLASS_MEMBER_REQUEST });

  agent
    .patch(`/class/${classId}/member`, editedList, auth)
    .then((res) => {
      dispatch({
        type: commonConstants.EDIT_CLASS_MEMBER_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: commonConstants.EDIT_CLASS_MEMBER_FAIL,
        error: err,
      });
    });
};

const replaceClassMembers = (token, classId, replacingList) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: commonConstants.REPLACE_CLASS_MEMBERS_REQUEST });

    const res = await agent.put(`/class/${classId}/member`, replacingList, auth);
    console.log(res);
    if (res.data.success) {
      dispatch({
        type: commonConstants.REPLACE_CLASS_MEMBERS_SUCCESS,
      });
    } else {
      dispatch({
        type: commonConstants.REPLACE_CLASS_MEMBERS_FAIL,
        error: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: commonConstants.REPLACE_CLASS_MEMBERS_FAIL,
      error: err,
    });
  }
};

// const deleteClassMember = (token, classId, memberId) => (dispatch) => {
//   const auth = {
//     headers: {
//       'Auth-Token': token,
//     },
//   };
//   dispatch({ type: commonConstants.DELETE_CLASS_MEMBER_REQUEST });

//   agent
//     .delete(`/class/${classId}/member/${memberId}`, auth)
//     .then((res) => {
//       dispatch({
//         type: commonConstants.DELETE_CLASS_MEMBER_SUCCESS,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: commonConstants.DELETE_CLASS_MEMBER_FAIL,
//         error: err,
//       });
//     });
// };

const browseSubmitLang = (token) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: commonConstants.BROWSE_SUBMISSION_LANG_START });
    const submitLang = await agent.get('/submission/language', auth);
    dispatch({
      type: commonConstants.BROWSE_SUBMISSION_LANG_SUCCESS,
      payload: submitLang.data.data,
    });
  } catch (err) {
    dispatch({
      type: commonConstants.BROWSE_SUBMISSION_LANG_FAIL,
      errors: err,
    });
  }
};

const fetchCourse = (token, courseId) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: commonConstants.FETCH_COURSE_START });
    const res = await agent.get(`/course/${courseId}`, auth);
    dispatch({ type: commonConstants.FETCH_COURSE_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: commonConstants.FETCH_COURSE_FAIL,
      error: err,
    });
  }
};

const fetchClass = (token, classId) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: commonConstants.FETCH_CLASS_START });
    const res = await agent.get(`/class/${classId}`, auth);
    dispatch({ type: commonConstants.FETCH_CLASS_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: commonConstants.FETCH_CLASS_FAIL,
      error: err,
    });
  }
};

const fetchAccount = (token, accountId) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: commonConstants.FETCH_ACCOUNT_REQUEST });
    const res = await agent.get(`/account/${accountId}`, auth);
    dispatch({ type: commonConstants.FETCH_ACCOUNT_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: commonConstants.FETCH_ACCOUNT_FAIL,
      error: err,
    });
  }
};

const downloadFile = (token, file) => async (dispatch) => {
  // in each file, you should contain uuid, filename, and as_attachment
  const config = {
    headers: {
      'Auth-Token': token,
    },
    params: {
      filename: file.filename,
      as_attachment: file.as_attachment,
    },
  };
  try {
    dispatch({ type: commonConstants.DOWNLOAD_FILE_START });
    const res = await agent.get(`/s3-file/${file.uuid}/url`, config);
    if (res.data.success) {
      fetch(res.data.url).then((t) => t.blob().then((b) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.setAttribute('download', file.filename);
        a.click();
      }));

      dispatch({
        type: commonConstants.DOWNLOAD_FILE_SUCCESS,
      });
    } else {
      dispatch({
        type: commonConstants.DOWNLOAD_FILE_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: commonConstants.DOWNLOAD_FILE_FAIL,
      errors: err,
    });
  }
};

export {
  getInstitutes, fetchClassMembers, editClassMember, replaceClassMembers, fetchCourse, fetchClass, fetchAccount, browseSubmitLang, downloadFile,
};
