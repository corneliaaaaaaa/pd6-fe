import React, { useState, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  editorCol: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px 23px 16px 23px',
    width: '26.4%',
  },
  editorItem: {
    marginBottom: '12px',
  },
  textField: {
    width: '100%',
    marginTop: '0px',
  },
  buttonsBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '50px',
  },
  leftButton: {
    marginRight: '18px',
  },
  dialogContent: {
    padding: '0px 24px 6px 24px',
  },
  dialogButtons: {
    justifyContent: 'space-between',
  },
  backToEditButton: {
    marginLeft: '24px',
  },

}));

/* This is a level 4 component (page component) */
const MemberEdit = ({
  backToMemberList, members, onEditMembers, loading,
}) => {
  // TODO: initialize field content with redux state
  const classes = useStyles();
  const [TA, setTA] = useState([]);
  const [student, setStudent] = useState([]);
  const [guest, setGuest] = useState([]);
  const [TAChanged, setTAChanged] = useState(false);
  const [studentChanged, setStudentChanged] = useState(false);
  const [guestChanged, setGuestChanged] = useState(false);
  const [showUnsaveDialog, setShowUnsaveDialog] = useState(false);

  useEffect(() => {
    setTA(members.filter((item) => item.role === 'TA'));
    setStudent(members.filter((item) => item.role === 'Student'));
    setGuest(members.filter((item) => item.role === 'Guest'));
  }, [members]);

  useBeforeunload((e) => {
    if (TAChanged || studentChanged || guestChanged) {
      e.preventDefault();
      setShowUnsaveDialog(true);
    }
  });

  const handleChangeTA = (e) => {
    /* if(){

    } */
    setTA(e.target.value);
    // setTAChanged(TA === )
  };

  const handleChangeStudent = (e) => {
    /* if(){

    } */
    setStudent(e.target.value);
    // setStudentChanged(student === )
  };
  const handleChangeGuest = (e) => {
    /* if(){

    } */
    setGuest(e.target.value);
    // setGuestChanged(guest === )
  };
  const handleClickCancel = () => {
    /* if(){
      setShowUnsaveDialog(true);
    }
    else{
      backToMemberList();
    } */
    setShowUnsaveDialog(true);
  };

  const handleSubmitUnsave = () => {
    setShowUnsaveDialog(false);
    backToMemberList();
  };

  const handleSubmitSave = () => {
    setShowUnsaveDialog(false);
    // and sth.....
    backToMemberList();
  };

  return (
    <div>
      <Card className={classes.card} variant="outlined">
        <div className={classes.editorCol}>
          <div className={classes.editorItem}>
            <Typography variant="body1">TA</Typography>
          </div>
          <div className={classes.editorItem}>
            <Typography variant="caption">List of student ID</Typography>
          </div>
          <TextField
            className={classes.textField}
            defaultValue={TA}
            onChange={(e) => handleChangeTA(e)}
            multiline
            rows={20}
          />
        </div>

        <div className={classes.editorCol}>
          <div className={classes.editorItem}>
            <Typography variant="body1">Student</Typography>
          </div>
          <div className={classes.editorItem}>
            <Typography variant="caption">List of student ID</Typography>
          </div>
          <TextField
            defaultValue={student}
            className={classes.textField}
            onChange={(e) => handleChangeStudent(e)}
            multiline
            rows={20}
          />
        </div>

        <div className={classes.editorCol}>
          <div className={classes.editorItem}>
            <Typography variant="body1">Guest</Typography>
          </div>
          <div className={classes.editorItem}>
            <Typography variant="caption">List of student ID</Typography>
          </div>
          <TextField
            defaultValue={guest}
            onChange={(e) => handleChangeGuest(e)}
            multiline
            rows={20}
            className={classes.textField}
          />
        </div>
      </Card>
      <div className={classes.buttonsBar}>
        <Button onClick={handleClickCancel} className={classes.leftButton}>
          Cancel
        </Button>
        <Button onClick={handleSubmitSave} color="primary">
          Save
        </Button>
      </div>

      <Dialog open={showUnsaveDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Unsaved Changes</Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="body1">
            You have unsaved changes, do you want to save your changes or back to edit?
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogButtons}>
          <div>
            <Button variant="outlined" onClick={() => setShowUnsaveDialog(false)} className={classes.backToEditButton}>
              Back to Edit
            </Button>
          </div>
          <div>
            <Button onClick={handleSubmitUnsave}>Don’t Save</Button>
            <Button onClick={handleSubmitSave} color="primary">
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MemberEdit;
