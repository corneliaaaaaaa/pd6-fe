import { gradeConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchClassGrade: false,
  addClassGrade: false,
  importClassGrade: false,
  fetchAccountGrade: false,
  downloadGradeFile: false,
  deleteGrade: false,
  editGrade: false,
};

export default function grade(state = initialState, action) {
  switch (action.type) {
    case gradeConstants.FETCH_CLASS_GRADE_START: {
      return {
        ...state,
        fetchClassGrade: true,
      };
    }
    case gradeConstants.FETCH_CLASS_GRADE_SUCCESS: {
      return {
        ...state,
        fetchClassGrade: false,
      };
    }
    case gradeConstants.FETCH_CLASS_GRADE_FAIL: {
      return {
        ...state,
        fetchClassGrade: false,
      };
    }

    case gradeConstants.ADD_CLASS_GRADE_START: {
      return {
        ...state,
        addClassGrade: true,
      };
    }
    case gradeConstants.ADD_CLASS_GRADE_SUCCESS: {
      return {
        ...state,
        addClassGrade: false,
      };
    }
    case gradeConstants.ADD_CLASS_GRADE_FAIL: {
      return {
        ...state,
        addClassGrade: false,
      };
    }

    case gradeConstants.IMPORT_CLASS_GRADE_START: {
      return {
        ...state,
        importClassGrade: true,
      };
    }
    case gradeConstants.IMPORT_CLASS_GRADE_SUCCESS: {
      return {
        ...state,
        importClassGrade: false,
      };
    }
    case gradeConstants.IMPORT_CLASS_GRADE_FAIL: {
      return {
        ...state,
        importClassGrade: false,
      };
    }

    case gradeConstants.FETCH_ACCOUNT_GRADE_START: {
      return {
        ...state,
        fetchAccountGrade: true,
      };
    }
    case gradeConstants.FETCH_ACCOUNT_GRADE_SUCCESS: {
      return {
        ...state,
        fetchAccountGrade: false,
      };
    }
    case gradeConstants.FETCH_ACCOUNT_GRADE_FAIL: {
      return {
        ...state,
        fetchAccountGrade: false,
      };
    }

    case gradeConstants.DOWNLOAD_GRADE_FILE_START: {
      return {
        ...state,
        downloadGradeFile: true,
      };
    }
    case gradeConstants.DOWNLOAD_GRADE_FILE_SUCCESS: {
      return {
        ...state,
        downloadGradeFile: false,
      };
    }
    case gradeConstants.DOWNLOAD_GRADE_FILE_FAIL: {
      return {
        ...state,
        downloadGradeFile: false,
      };
    }

    case gradeConstants.DELETE_GRADE_START: {
      return {
        ...state,
        deleteGrade: true,
      };
    }
    case gradeConstants.DELETE_GRADE_SUCCESS: {
      return {
        ...state,
        deleteGrade: false,
      };
    }
    case gradeConstants.DELETE_GRADE_FAIL: {
      return {
        ...state,
        deleteGrade: false,
      };
    }

    case gradeConstants.EDIT_GRADE_START: {
      return {
        ...state,
        editGrade: true,
      };
    }
    case gradeConstants.EDIT_GRADE_SUCCESS: {
      return {
        ...state,
        editGrade: false,
      };
    }
    case gradeConstants.EDIT_GRADE_FAIL: {
      return {
        ...state,
        editGrade: false,
      };
    }

    default: {
      return state;
    }
  }
}
