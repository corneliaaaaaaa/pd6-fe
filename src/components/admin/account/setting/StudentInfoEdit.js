import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button,
  Typography,
  Card,
  CardContent,
  makeStyles,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardActions,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';

import StarIcon from '@material-ui/icons/Star';
import { addStudentCard, makeStudentCardDefault } from '../../../../actions/admin/account';
import StudentInfoCard from './StudentInfoCard';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    width: '600px',
    display: 'flex',
    justifyContent: 'center',
  },
  textfield: {
    width: '350px',
  },
  mailfield: {
    width: '150px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  mailrow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    width: '190px',
  },
  addCard: {
    width: '600px',
    height: '329px',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    '&:last-child': {
      padding: '0 11px 20px 14px',
    },
  },
  buttons: {
    alignSelf: 'flex-end',
    marginRight: '11px',
  },
}));

export default function StudentInfoEdit(props) {
  const classes = useStyles();
  const editMode = true;
  const [cards, setCards] = useState(props.cards); // new card isn't here
  // const [newCard, setNewCard] = useState(null); // new card saved in here
  const [defaultCardId, setDefaultCardId] = useState(null);
  const [disabledSave, setDisabledSave] = useState(true);
  const [disabledTwoCards, setDisabledTwoCards] = useState(false);
  const [add, setAdd] = useState(false); // addCard block
  const [addCard, setAddCard] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [emailTail, setEmailTail] = useState('@ntu.edu.tw');
  const [addInputs, setAddInputs] = useState({
    institute: 'National Taiwan University',
    studentId: '',
    email: '',
  });
  let instituteId = 1;

  const { accountId } = useParams();
  const authToken = useSelector((state) => state.auth.user.token);
  const dispatch = useDispatch();

  const updateStatus = (studentId, cardId) => {
    const updated = cards.map((p) => (p.student_id === studentId ? { ...p, is_default: true } : { ...p, is_default: false }));
    setCards(updated);
    setDefaultCardId(cardId);
  };

  const handleSave = () => {
    if (addCard) {
      console.log('add request success');
      dispatch(addStudentCard(authToken, accountId, instituteId, addInputs.email, 'IM', addInputs.studentId));
    }
    if (defaultCardId !== null) {
      console.log('default card change');
      dispatch(makeStudentCardDefault(authToken, accountId, defaultCardId));
    }
    // deal with loading
    props.handleBack();
  };

  const handleAddCancel = () => {
    setAdd(false);
    setAddInputs({ institute: 'National Taiwan University', studentId: '', email: '' });
    setDisabledTwoCards(false);
  };

  const handleAddSave = () => {
    switch (addInputs.institute) {
      case 'National Taiwan University':
        instituteId = 1;
        break;
      case 'National Taiwan Normal University':
        instituteId = 2;
        break;
      case 'National Taiwan University of Science and Technology':
        instituteId = 3;
        break;
      default: instituteId = 1;
    }
    // setNewCard(
    //   {
    //     student_id: addInputs.studentId,
    //     email: `${addInputs.email}${emailTail}`,
    //     institute_id: instituteId,
    //     is_default: false,
    //   },
    // );
    setPopUp(true);
    setAdd(false);
    setDisabledSave(false);
    setAddCard(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddInputs((input) => ({ ...input, [name]: value }));

    if (name === 'institute') {
      switch (value) {
        case 'National Taiwan University':
          setEmailTail('@ntu.edu.tw');
          break;
        case 'National Taiwan Normal University':
          setEmailTail('@ntnu.edu.tw');
          break;
        case 'National Taiwan University of Science and Technology':
          setEmailTail('@mail.ntust.edu.tw');
          break;
        default:
          setEmailTail('@ntu.edu.tw');
      }
    }
  };

  return (
    <div>
      <SimpleBar
        title="Student Information"
      >
        {cards
          ? (
            <div>
              {cards.map((p) => {
                if (p.is_default === true) {
                  return (
                    <p>
                      <StudentInfoCard
                        editMode
                        isDefault={p.is_default}
                        studentId={p.student_id}
                        email={p.email}
                        instituteId={p.institute_id}
                      />
                    </p>
                  );
                }
                return <></>;
              })}
              {cards.map((p) => {
                if (p.is_default === false) {
                  return (
                    <p>
                      <StudentInfoCard
                        editMode
                        id={p.id}
                        isDefault={p.is_default}
                        studentId={p.student_id}
                        email={p.email}
                        instituteId={p.institute_id}
                        updateStatus={updateStatus}
                        setDisabledSave={setDisabledSave}
                      />
                    </p>
                  );
                }
                return <></>;
              })}
            </div>
          ) : <></> }
        {/* {newCard
          ? (
            <p>
              <StudentInfoCard
                editMode
                isNew
                isDefault={newCard.is_default}
                studentId={newCard.student_id}
                email={newCard.email}
                instituteId={newCard.institute_id}
              />
            </p>
          )
          : <></>} */}
        {add
          ? (
            <p>
              <Card variant="outlined" className={classes.addCard}>
                <CardContent>
                  <div className={classes.row}>
                    <div className={classes.item}><Typography>Institute</Typography></div>
                    <FormControl variant="outlined" className={classes.textfield}>
                      <Select value={addInputs.institute} name="institute" onChange={(e) => handleChange(e)}>
                        <MenuItem value="National Taiwan University">National Taiwan University</MenuItem>
                        <MenuItem value="National Taiwan Normal University">National Taiwan Normal University</MenuItem>
                        <MenuItem value="National Taiwan University of Science and Technology">
                          National Taiwan University of Science and Technology
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className={classes.row}>
                    <AlignedText text="Student ID" childrenType="field">
                      <TextField
                        variant="outlined"
                        name="studentId"
                        className={classes.textfield}
                        value={addInputs.studentId}
                        onChange={(e) => handleChange(e)}
                      />
                    </AlignedText>
                  </div>
                  <div className={classes.mailrow}>
                    <div className={classes.item}>
                      <Typography>Email</Typography>
                    </div>
                    <TextField
                      variant="outlined"
                      name="email"
                      className={classes.mailfield}
                      value={addInputs.email}
                      onChange={(e) => handleChange(e)}
                      style={{ marginLeft: '0px', marginRight: '10px' }}
                    />
                    <Typography>{emailTail}</Typography>
                  </div>
                </CardContent>
                <div className={classes.buttons}>
                  <Button onClick={handleAddCancel}>Cancel</Button>
                  <Button color="primary" onClick={handleAddSave}>Save</Button>
                </div>
              </Card>
            </p>
          )
          : <></>}
        {!disabledTwoCards ? (
          <p className={classes.buttonContainer}>
            <div className={classes.addButton}>
              <Button onClick={() => { setAdd(true); setDisabledTwoCards(true); }}>+</Button>
            </div>
          </p>
        ) : <></>}
        {popUp
          ? (
            <div>
              <Dialog
                open={popUp}
                onClose={() => setPopUp(false)}
                maxWidth="md"
              >
                <DialogTitle>
                  <Typography variant="h4">Verification email sent</Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <Typography variant="body1" color="textPrimary">
                      Please check your mailbox to activate this student information, then it will appear here.
                    </Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setPopUp(false)}>Done</Button>
                </DialogActions>
              </Dialog>
            </div>
          )
          : <></>}

        <Button onClick={() => {
          props.handleBack();
        }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          type="submit"
          disabled={disabledSave}
          onClick={handleSave}
        >
          Save
        </Button>
      </SimpleBar>
    </div>
  );
}
