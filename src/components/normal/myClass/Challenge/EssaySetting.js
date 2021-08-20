import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  TextField,
  Grid,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../ui/SimpleBar';
import Icon from '../../../ui/icon/index';
import AlignedText from '../../../ui/AlignedText';
import NoMatch from '../../../noMatch';

import EssayInfo from './ProblemSettings/EssayInfo';
import EssayEdit from './ProblemSettings/EssayEdit';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  generalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function EssaySetting() {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const userClasses = useSelector((state) => state.user.classes);
  const problems = useSelector((state) => state.problem.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const authToken = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.error.myClass.problem);
  const loading = useSelector((state) => state.loading.myClass.problem);
  // const editLoading = useSelector((state) => state.loading.admin.);
  const [role, setRole] = useState('Normal');
  const [edit, setEdit] = useState(false);

  const handleCloseEdit = () => {
    setEdit(false);
  };

  // const [problem, setProblem] = useState(null);
  const [popUpUpload, setPopUpUpload] = useState(false);

  const handleClickUpload = () => {
    setPopUpUpload(true);
  };
  const handleClosePopUpUpload = () => {
    setPopUpUpload(false);
  };

  const handleUpload = (e) => {

  };

  const handleSubmitDelete = (e) => {
    // dispatch(deleteProblem());
    // history.push('/');
  };
  const [selectedFile, setSelectedFile] = useState([]);

  useEffect(() => {
    userClasses.forEach((value) => {
      if (value.class_id === parseInt(classId, 10)) {
        if (value.role === 'MANAGER') {
          setRole('MANAGER');
        }
      }
    });
  }, [classId, userClasses]);

  // useEffect(() => {
  //   if (!editLoading) {
  //     dispatch(fetchProblem(authToken));
  //   }
  // }, [authToken, dispatch, editLoading]);

  // useEffect(() => {
  //   const item = problem[problemId];
  //   if (item !== undefined) {
  //     setProblems({
  //       title: item.title,
  //       description: item.description,
  //     });
  //   }
  // }, [problemId]);

  // if (problems[problemId] === undefined || challenges[challengeId] === undefined) {
  //   return <NoMatch />;
  // }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {challenges[challengeId] === undefined ? 'error' : challenges[challengeId].title}
        {' '}
        /
        {' '}
        {problems[problemId] === undefined ? 'error' : problems[problemId].challenge_label}
      </Typography>
      {!edit && role === 'MANAGER' && (
        <div className={classNames.managerButtons}>
          <Button
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
          <Button variant="outlined" component="span" startIcon={<Icon.Download />}>
            Download
          </Button>
        </div>
      )}
      {edit ? <EssayEdit closeEdit={handleCloseEdit} role={role} /> : <EssayInfo role={role} /> }
    </>
  );
}
