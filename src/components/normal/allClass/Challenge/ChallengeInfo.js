import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { format } from 'date-fns';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import NoMatch from '../../../noMatch';
import AlignedText from '../../../ui/AlignedText';
import SimpleBar from '../../../ui/SimpleBar';
import SimpleTable from '../../../ui/SimpleTable';
import {
  browseChallengeOverview, editChallenge, browseTasksUnderChallenge, readProblemScore,
} from '../../../../actions/myClass/problem';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  descriptionField: {
    width: '60vw',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

/* This is a level 4 component (page component) */
export default function ChallengeInfo() {
  const { courseId, classId, challengeId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(moment());
  const [status, setStatus] = useState('');
  const [inputs, setInputs] = useState('');
  const [tableData, setTableData] = useState([]);

  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.myClass.problem);
  const userClasses = useSelector((state) => state.user.classes);
  const challenges = useSelector((state) => state.challenges.byId);
  const problems = useSelector((state) => state.problem.byId);
  const essays = useSelector((state) => state.essays.byId);
  const peerReviews = useSelector((state) => state.peerReviews.byId);

  useEffect(() => {
    if (!loading.editChallenge) {
      dispatch(browseChallengeOverview(authToken, challengeId));
    }
  }, [authToken, challengeId, dispatch, loading.editChallenge]);

  useEffect(() => {
    dispatch(browseTasksUnderChallenge(authToken, challengeId));
  }, [authToken, challengeId, dispatch]);

  useEffect(() => {
    if (challenges[challengeId] !== undefined) {
      challenges[challengeId].problemIds.map((id) => dispatch(readProblemScore(authToken, id)));
    }
  }, [authToken, challengeId, challenges, dispatch]);

  useEffect(() => {
    if (challenges[challengeId] !== undefined) {
      if (currentTime.isBefore(moment(challenges[challengeId].start_time))) {
        setStatus('Not Yet');
      } else if (currentTime.isBefore(moment(challenges[challengeId].end_time))) {
        setStatus('Opened');
      } else {
        setStatus('Closed');
      }
      setInputs(challenges[challengeId].description);
    }
  }, [challengeId, challenges, currentTime]);

  useEffect(() => {
    // console.log(challenges[challengeId].problemIds.reduce((acc, item) => acc && problems[item] !== undefined, true));
    if (challenges[challengeId]) {
      if (challenges[challengeId].problemIds.reduce((acc, item) => acc && problems[item] !== undefined, true)) {
        // problems are complete
        setTableData(
          challenges[challengeId].problemIds
            .map((id) => ({
              challenge_label: problems[id].challenge_label,
              score: problems[id].score,
              id: `coding-${id}`,
            }))
            .concat(
              challenges[challengeId].essayIds.map((id) => ({
                challenge_label: essays[id].challenge_label,
                id: `essay-${id}`,
              })),
              challenges[challengeId].peerReviewIds.map((id) => ({
                challenge_label: peerReviews[id].challenge_label,
                id: `peer-${id}`,
              })),
            ),
        );
      }
    }
  }, [authToken, challengeId, challenges, essays, peerReviews, problems]);

  if (challenges[challengeId] === undefined) {
    if (!loading.browseChallengeOverview) {
      return <NoMatch />;
    }
    return <div>loading...</div>;
  }

  return (
    <>
      <Typography className={classes.pageHeader} variant="h3">
        {challenges[challengeId].title}
        {' '}
        / Info
      </Typography>
      <SimpleBar title="Description">
        <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
          {challenges[challengeId].description}
        </Typography>
      </SimpleBar>
      <SimpleBar title="Challenge Information">
        <>
          <AlignedText text="Scored by" childrenType="text">
            <Typography variant="body1">
              {challenges[challengeId].selection_type === 'LAST' ? 'Last Score' : 'Best Score'}
            </Typography>
          </AlignedText>
          <AlignedText text="Status" childrenType="text">
            <Typography variant="body1">{status}</Typography>
          </AlignedText>
          <AlignedText text="Start time" childrenType="text">
            <Typography variant="body1">
              {moment(challenges[challengeId].start_time).format('YYYY-MM-DD, HH:mm')}
            </Typography>
          </AlignedText>
          <AlignedText text="End time" childrenType="text">
            <Typography variant="body1">
              {moment(challenges[challengeId].end_time).format('YYYY-MM-DD, HH:mm')}
            </Typography>
          </AlignedText>
        </>
      </SimpleBar>
      <SimpleBar title="Overview">
        <SimpleTable
          isEdit={false}
          hasDelete={false}
          columns={[
            {
              id: 'challenge_label',
              label: 'Label',
              minWidth: 30,
              align: 'center',
              width: 300,
              type: 'string',
            },
            {
              id: 'score',
              label: 'Score',
              minWidth: 50,
              align: 'center',
              width: 600,
              type: 'string',
            },
          ]}
          data={tableData}
        />
      </SimpleBar>
    </>
  );
}
