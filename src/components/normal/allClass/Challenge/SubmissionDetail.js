import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import Icon from '../../../ui/icon/index';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';
import SimpleTable from '../../../ui/SimpleTable';
import PageTitle from '../../../ui/PageTitle';
import GeneralLoading from '../../../GeneralLoading';
import {
  readSubmissionDetail,
  browseJudgeCases,
  readTestcase,
  browseTestcases,
} from '../../../../actions/myClass/problem';
import { fetchSubmission } from '../../../../actions/myClass/submission';
import NoMatch from '../../../noMatch';
import CodeArea from '../../../ui/CodeArea';
// import { browseSubmitLang } from '../../../../actions/common/common';

const useStyles = makeStyles((theme) => ({
  textLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.hover,
    },
    '&:active': {
      color: theme.palette.primary.dark,
    },
  },
  generalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  codeField: {
    width: '50vw',
  },
}));

/* This is a level 4 component (page component) */
export default function SubmissionDetail() {
  const {
    courseId, classId, challengeId, problemId, submissionId,
  } = useParams();
  const classNames = useStyles();
  const [tableData, setTableData] = useState([]);
  const [judgmentId, setJudgmentId] = useState('');
  const dispatch = useDispatch();

  const submissions = useSelector((state) => state.submissions.byId);
  const judgments = useSelector((state) => state.judgments.byId);
  const judgmentIds = useSelector((state) => state.judgments.allIds);
  const challenges = useSelector((state) => state.challenges);
  const problems = useSelector((state) => state.problem);
  const user = useSelector((state) => state.user);
  const judgeCases = useSelector((state) => state.judgeCases);
  const testcases = useSelector((state) => state.testcases.byId);
  const testcaseIds = useSelector((state) => state.testcases.allIds);
  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.myClass.problem);

  useEffect(() => {
    dispatch(readSubmissionDetail(authToken, submissionId));
    dispatch(fetchSubmission(authToken, submissionId));
  }, [authToken, challengeId, dispatch, problemId, submissionId]);

  useEffect(() => {
    setJudgmentId(judgmentIds.filter((id) => judgments[id].submission_id === Number(submissionId))[0]);
    if (judgmentIds.filter((id) => judgments[id].submission_id === Number(submissionId))[0]) {
      dispatch(
        browseJudgeCases(
          authToken,
          judgmentIds.filter((id) => judgments[id].submission_id === Number(submissionId))[0],
        ),
      );
    }
  }, [authToken, dispatch, judgmentIds, judgments, submissionId]);

  // useEffect(() => {
  //   if (judgeCases.byId !== undefined) {
  //     judgeCases.allIds.map((id) => dispatch(readTestcase(authToken, id)));
  //   }
  // }, [authToken, dispatch, judgeCases.allIds, judgeCases.byId]);

  useEffect(() => {
    dispatch(browseTestcases(authToken, problemId));
  }, [authToken, dispatch, problemId]);

  const transformTestcase = useCallback(
    (id) => {
      if (testcases[id].input_filename !== null) {
        return testcases[id].input_filename.slice(0, testcases[id].input_filename.indexOf('.'));
      }
      if (testcases[id].output_filename !== null) {
        return testcases[id].output_filename.slice(0, testcases[id].output_filename.indexOf('.'));
      }
      return 0;
    },
    [testcases],
  );

  useEffect(() => {
    if (testcaseIds !== [] && judgeCases.allIds !== []) {
      setTableData(
        judgeCases.allIds
          .filter((id) => judgeCases.byId[id].judgment_id === judgmentId)
          .map((id) => ({
            id,
            no: testcaseIds.map((key) => (id === key ? transformTestcase(key) : '')),
            time: judgeCases.byId[id].time_lapse,
            memory: judgeCases.byId[id].peak_memory,
            status: judgeCases.byId[id].verdict
              .toLowerCase()
              .split(' ')
              .map((word) => word[0].toUpperCase() + word.substring(1))
              .join(' '),
            score: judgeCases.byId[id].score,
          })),
      );
    }
  }, [
    judgeCases,
    judgeCases.allIds,
    judgeCases.byId,
    judgmentId,
    judgments.byId,
    testcaseIds,
    testcases,
    transformTestcase,
  ]);

  if (
    problems.byId[problemId] === undefined
    || challenges.byId[challengeId] === undefined
    || submissions[submissionId] === undefined
    || judgments === undefined
    || judgeCases.allIds === undefined
    || testcaseIds === undefined
  ) {
    if (loading.readSubmissionDetail || loading.browseJudgeCases || loading.readTestcase) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  const handleRefresh = () => {
    dispatch(readSubmissionDetail(authToken, submissionId));
  };

  return (
    <>
      <PageTitle text={`${submissionId} / Submission Detail`} />
      <div className={classNames.generalButtons}>
        <Button color="primary" startIcon={<Icon.RefreshOutlinedIcon />} onClick={handleRefresh}>
          Refresh
        </Button>
      </div>
      <SimpleBar title="Submission Information">
        <AlignedText text="Submission ID" childrenType="text">
          <Typography variant="body1">{submissionId}</Typography>
        </AlignedText>
        <AlignedText text="Username" childrenType="text">
          <Link to="/my-profile" className={classNames.textLink}>
            <Typography variant="body1">{user.username}</Typography>
          </Link>
        </AlignedText>
        <AlignedText text="Student ID" childrenType="text">
          <Typography variant="body1">{user.student_id}</Typography>
        </AlignedText>
        <AlignedText text="Real Name" childrenType="text">
          <Typography variant="body1">{user.real_name}</Typography>
        </AlignedText>
        <AlignedText text="Challenge" childrenType="text">
          <Link to={`/my-class/${courseId}/${classId}/challenge/${challengeId}`} className={classNames.textLink}>
            <Typography variant="body1">{challenges.byId[challengeId].title}</Typography>
          </Link>
        </AlignedText>
        <AlignedText text="Task Label" childrenType="text">
          <Link
            to={`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}`}
            className={classNames.textLink}
          >
            <Typography variant="body1">{problems.byId[problemId].challenge_label}</Typography>
          </Link>
        </AlignedText>
        <AlignedText text="Task Title" childrenType="text">
          <Typography variant="body1">{problems.byId[problemId].title}</Typography>
        </AlignedText>
        <AlignedText text="Status" childrenType="text">
          {judgments[judgmentId] !== undefined ? (
            <div>
              {judgments[judgmentId].verdict === 'ACCEPTED' ? (
                <Typography variant="body1">
                  {judgments[judgmentId].verdict.charAt(0).concat(judgments[judgmentId].verdict.slice(1).toLowerCase())}
                </Typography>
              ) : (
                <Typography variant="body1" color="secondary">
                  {judgments[judgmentId].verdict
                    .toLowerCase()
                    .split(' ')
                    .map((word) => word[0].toUpperCase() + word.substring(1))
                    .join(' ')}
                </Typography>
              )}
            </div>
          ) : (
            <Typography variant="body1">Waiting For Judge</Typography>
          )}
        </AlignedText>
        <AlignedText text="Score" childrenType="text">
          {judgments[judgmentId] !== undefined && (
            <div>
              <Typography variant="body1">{judgments[judgmentId].score}</Typography>
            </div>
          )}
        </AlignedText>
        <AlignedText text="Submit Time" childrenType="text">
          <Typography variant="body1">
            {moment(submissions[submissionId].submit_time).format('YYYY-MM-DD, HH:mm')}
          </Typography>
        </AlignedText>
        {/* <AlignedText text="Language" childrenType="text">
          {submitLangs[submissions[submissionId].language_id]
            && <Typography variant="body1">{submitLangs[submissions[submissionId].language_id].name}</Typography>}
        </AlignedText> */}
      </SimpleBar>
      <SimpleBar title="Submission Result" noIndent>
        <SimpleTable
          isEdit={false}
          hasDelete={false}
          columns={[
            {
              id: 'no',
              label: 'No.',
              minWidth: 30,
              align: 'center',
              width: 400,
              type: 'string',
            },
            {
              id: 'time',
              label: 'Time(ms)',
              minWidth: 50,
              align: 'center',
              width: 600,
              type: 'string',
            },
            {
              id: 'memory',
              label: 'Memory(kb)',
              minWidth: 50,
              align: 'center',
              width: 600,
              type: 'string',
            },
            {
              id: 'status',
              label: 'Status',
              minWidth: 50,
              align: 'center',
              width: 600,
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
      <SimpleBar title="Code" noIndent>
        <CodeArea value={submissions[submissionId].content} />
      </SimpleBar>
    </>
  );
}
