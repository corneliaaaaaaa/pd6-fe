import { combineReducers } from 'redux';
import { gradeConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case gradeConstants.FETCH_CLASS_GRADE_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }

    case gradeConstants.FETCH_ACCOUNT_GRADE_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }

    case gradeConstants.FETCH_GRADE_TEMPLATE_SUCCESS: {
      return action.payload;
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case gradeConstants.FETCH_CLASS_GRADE_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }

    case gradeConstants.FETCH_ACCOUNT_GRADE_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }

    case gradeConstants.FETCH_GRADE_SUCCESS: {
      return action.payload.map((item) => item.id);
    }

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
