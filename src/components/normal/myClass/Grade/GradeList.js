import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles,
  withStyles,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import moment from 'moment-timezone';
import AlignedText from '../../../ui/AlignedText';
// import CustomTable from '../../../ui/CustomTable';
import AutoTable from '../../../ui/AutoTable';
import FileUploadArea from '../../../ui/FileUploadArea';
import PageTitle from '../../../ui/PageTitle';
import Icon from '../../../ui/icon/index';
import {
  fetchClassGrade, addClassGrade, importClassGrade, downloadGradeFile,
} from '../../../../actions/myClass/grade';
import { fetchClassMembers } from '../../../../actions/common/common';
import NoMatch from '../../../noMatch';
import GeneralLoading from '../../../GeneralLoading';

const useStyles = makeStyles((theme) => ({
  reminder: {
    color: theme.palette.grey.A400,
    marginLeft: theme.spacing(2),
  },
  templateBtn: {
    marginRight: '155px',
  },
  addGradeDiaText: {
    marginTop: '20px',
  },
}));

const StyledButton = withStyles({
  outlined: {
    '& path': {
      fill: 'none !important',
    },
  },
})(Button);

/* This is a level 4 component (page component) */
export default function GradeList() {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const { courseId, classId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const courses = useSelector((state) => state.courses.byId);
  const classes = useSelector((state) => state.classes.byId);
  const accounts = useSelector((state) => state.accounts);
  const grades = useSelector((state) => state.grades);
  const loading = useSelector((state) => state.loading.myClass.grade);
  const error = useSelector((state) => state.error.myClass.grade);

  const user = useSelector((state) => state.user);
  const [isManager, setIsManager] = useState(false);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [addInputs, setAddInputs] = useState({
    title: '',
    receiver: '',
    score: '',
    comment: '',
  });
  const [inputTitle, setInputTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);

  useEffect(() => {
    if (user.classes) {
      if (user.classes.filter((item) => item.class_id === Number(classId))[0].role === 'MANAGER') setIsManager(true);
    }
  }, [classId, user.classes]);

  useEffect(() => {
    if (showImportDialog) {
      setIsDisabled(inputTitle === '' || selectedFile.length === 0);
    } else if (showAddDialog) {
      setIsDisabled(addInputs.title === '' || addInputs.receiver === '' || addInputs.score === '');
    }
  }, [addInputs.receiver, addInputs.score, addInputs.title, inputTitle, selectedFile, showAddDialog, showImportDialog]);

  useEffect(() => {
    if (showImportDialog && hasRequest && !loading.importClassGrade) {
      if (error.importClassGrade === null) {
        setShowImportDialog(false);
        setHasRequest(false);
        setIsDisabled(true);
        setInputTitle('');
        setSelectedFile([]);
      } else {
        setHasError(true);
      }
    } else if (showAddDialog && hasRequest && !loading.addClassGrade) {
      if (error.addClassGrade === null) {
        setShowAddDialog(false);
        setHasRequest(false);
        setIsDisabled(true);
        setAddInputs({
          title: '',
          receiver: '',
          score: '',
          comment: '',
        });
      } else {
        setHasError(true);
      }
    }
  }, [error, hasRequest, loading.addClassGrade, loading.importClassGrade, showAddDialog, showImportDialog]);

  const handleChange = (event) => {
    if (showImportDialog) {
      setInputTitle(event.target.value);
    } else {
      const { name, value } = event.target;
      setAddInputs((input) => ({ ...input, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (showImportDialog) {
      if (inputTitle !== '' && selectedFile !== []) {
        selectedFile.map((file) => dispatch(importClassGrade(authToken, classId, inputTitle, file)));
      }
    } else if (showAddDialog) {
      if (addInputs.title !== '' && addInputs.receiver !== '' && addInputs.score !== '') {
        dispatch(
          addClassGrade(
            authToken,
            classId,
            addInputs.receiver,
            `#${user.username}`,
            addInputs.title,
            addInputs.score,
            addInputs.comment,
          ),
        );
      }
    }
    setHasRequest(true);
  };

  const handleCancel = () => {
    setShowAddDialog(false);
    setShowImportDialog(false);
    setHasRequest(false);
    setIsDisabled(true);
    setAddInputs({
      title: '',
      receiver: '',
      score: '',
      comment: '',
    });
    setInputTitle('');
    setSelectedFile([]);
  };

  const downloadTemplate = () => {
    dispatch(downloadGradeFile(authToken));
    setShowImportDialog(false);
  };

  const handleCloseError = () => {
    setHasError(false);
    setHasRequest(false);
  };

  if (courses[courseId] === undefined || classes[classId] === undefined) {
    if (loading.fetchCourse || loading.fetchClass) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${courses[courseId].name} ${classes[classId].name} / Grade`} />
      <AutoTable
        ident={`Grade list ${classId}`}
        hasFilter
        filterConfig={[
          {
            reduxStateId: 'title',
            label: 'Title',
            type: 'TEXT',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'score',
            label: 'Score',
            type: 'TEXT',
            operation: 'LIKE',
          },
        ]}
        buttons={(
          <>
            {isManager && (
              <>
                <Button variant="outlined" color="primary" onClick={() => setShowAddDialog(true)}>
                  <MdAdd />
                </Button>
                <Button color="primary" onClick={() => setShowImportDialog(true)} startIcon={<Icon.Folder />}>
                  Import
                </Button>
              </>
            )}
          </>
        )}
        refetch={(browseParams, ident) => {
          dispatch(fetchClassGrade(authToken, classId, browseParams, ident));
        }}
        refetchErrors={[error.fetchClassGrade]}
        refreshLoadings={[loading.addClassGrade, loading.importClassGrade]}
        columns={[
          {
            name: 'Username',
            align: 'center',
            type: 'link',
          },
          {
            name: 'Student ID',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Real Name',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Title',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Score',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Time',
            align: 'center',
            type: 'string',
          },
        ]}
        reduxData={grades}
        reduxDataToRows={(item) => ({
          Username: {
            text: accounts.byId[item.receiver_id] ? accounts.byId[item.receiver_id].username : '',
            path: `/admin/account/account/${item.receiver_id}/setting`,
          },
          'Student ID': accounts.byId[item.receiver_id] ? accounts.byId[item.receiver_id].student_id : '',
          'Real Name': accounts.byId[item.receiver_id] ? accounts.byId[item.receiver_id].real_name : '',
          Title: item.title,
          Score: item.score,
          Time: moment(item.update_time).format('YYYY-MM-DD, HH:mm:ss'),
        })}
      />

      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Add New Grade</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" maxWidth="mg" childrenType="text">
            <Typography variant="body1">{`${courses[courseId].name}  ${classes[classId].name}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" maxWidth="mg" childrenType="field">
            <TextField name="title" value={addInputs.title} onChange={(e) => handleChange(e)} />
          </AlignedText>
          <AlignedText text="Receiver" maxWidth="mg" childrenType="field">
            <TextField
              name="receiver"
              placeholder="Student ID / Email / #Username"
              value={addInputs.receiver}
              onChange={(e) => handleChange(e)}
            />
          </AlignedText>
          <AlignedText text="Score" maxWidth="mg" childrenType="field">
            <TextField name="score" value={addInputs.score} onChange={(e) => handleChange(e)} />
          </AlignedText>
          <AlignedText text="Comment" maxWidth="mg" childrenType="field">
            <TextField
              name="comment"
              placeholder="(Optional)"
              value={addInputs.comment}
              onChange={(e) => handleChange(e)}
            />
          </AlignedText>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2" className={classNames.addGradeDiaText}>
            You will be the grader for this grade.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="default">
            Cancel
          </Button>
          <Button disabled={isDisabled} onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        severity="error"
        open={showAddDialog && hasError}
        onClose={handleCloseError}
        message={`Error: ${error.addClassGrade}`}
      />

      <Dialog open={showImportDialog} onClose={() => setShowImportDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Import Grades.byId</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">Grade file format:</Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Receiver: student id (NTU only) &gt;= institute email &gt; #username
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Score: number or string
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Comment: string (optional)
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Grader: same as receiver
          </Typography>
          <Typography variant="body2">Download template file for more instructions.</Typography>
        </DialogContent>
        <DialogContent>
          <AlignedText text="Class" maxWidth="mg" childrenType="text">
            <Typography variant="body1">{`${courses[courseId].name}  ${classes[classId].name}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" maxWidth="mg" childrenType="field">
            <TextField id="title" name="title" value={inputTitle} onChange={(e) => handleChange(e)} />
          </AlignedText>
          <FileUploadArea
            text="Grading File"
            fileAcceptFormat=".csv"
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </DialogContent>
        <DialogActions>
          <StyledButton
            className={classNames.templateBtn}
            variant="outlined"
            startIcon={<Icon.Download />}
            onClick={() => {
              downloadTemplate();
            }}
          >
            Template
          </StyledButton>
          <Button onClick={handleCancel} color="default">
            Cancel
          </Button>
          <Button disabled={isDisabled} onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        severity="error"
        open={showImportDialog && hasError}
        onClose={handleCloseError}
        message={`Error: ${error.importClassGrade}`}
      />
    </>
  );
}
