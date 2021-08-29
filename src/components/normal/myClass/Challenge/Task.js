import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import {
  Switch, Route, useHistory, useParams,
} from 'react-router-dom';

import CodingProblem from './CodingProblem';
import { browseTasksUnderChallenge } from '../../../../actions/myClass/problem';

import GeneralLoading from '../../../GeneralLoading';
import EssayProblem from './EssayProblem';
import CodeSubmission from './CodeSubmission';
import SubmissionList from './SubmissionList';
import SubmissionDetail from './SubmissionDetail';

/* This is a level 4 component (page component) */
/* judge the problem type on this level */
export default function Task() {
  const { challengeId, problemId } = useParams();

  // const problemIDs = useSelector((state) => state.problem.allIds);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(browseTasksUnderChallenge(authToken, challengeId));
  }, [authToken, challengeId, dispatch]);

  return (
    <>
      <Switch>
        <Route
          exact
          path="/my-class/:courseId/:classId/challenge/:challengeId/essay/:essayId"
          component={EssayProblem}
        />
        <Route
          exact
          path="/my-class/:courseId/:classId/challenge/:challengeId/:problemId/code-submission"
          component={CodeSubmission}
        />
        <Route
          exact
          path="/my-class/:courseId/:classId/challenge/:challengeId/:problemId/my-submission"
          component={SubmissionList}
        />
        <Route
          exact
          path="/my-class/:courseId/:classId/challenge/:challengeId/:problemId/my-submission/:submissionId"
          component={SubmissionDetail}
        />
        <Route path="/my-class/:courseId/:classId/challenge/:challengeId/:problemId" component={CodingProblem} />
      </Switch>
    </>
  );
}
