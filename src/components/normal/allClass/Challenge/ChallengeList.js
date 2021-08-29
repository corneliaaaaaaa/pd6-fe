import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { format } from 'date-fns';
import AlignedText from '../../../ui/AlignedText';
import Icon from '../../../ui/icon/index';
import CustomTable from '../../../ui/CustomTable';
import TableFilterCard from '../../../ui/TableFilterCard';
import DateRangePicker from '../../../ui/DateRangePicker';
import filterData from '../../../../function/filter';
import sortData from '../../../../function/sort';
import { fetchChallenges, addChallenge } from '../../../../actions/myClass/challenge';
import { fetchClass, fetchCourse } from '../../../../actions/common/common';
import GeneralLoading from '../../../GeneralLoading';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  item: {
    width: '190px',
  },
  textfield: {
    width: '350px',
  },
  gap: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
}));

/* This is a level 4 component (page component) */
export default function ChallengeList() {
  const { courseId, classId } = useParams();
  const history = useHistory();
  const className = useStyles();
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [dateRangePicker, setDateRangePicker] = useState([
    {
      startDate: moment().startOf('week').toDate(),
      endDate: moment().endOf('week').toDate(),
      key: 'selection',
    },
  ]);

  const [currentTime, setCurrentTime] = useState(moment());
  const [popUp, setPopUp] = useState(false);
  const [inputs, setInputs] = useState({
    title: '',
    scoredBy: 'Last Score',
    showTime: 'On End Time',
  });
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.myClass.challenge);
  const challenges = useSelector((state) => state.challenges.byId);
  const challengesID = useSelector((state) => state.challenges.allIds);
  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const userClasses = useSelector((state) => state.user.classes);

  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
  }, [dispatch, authToken, classId, courseId]);

  useEffect(() => {
    // console.log(loading.addChallenge);
    if (!loading.addChallenge) {
      dispatch(fetchChallenges(authToken, classId));
    }
  }, [authToken, classId, dispatch, loading.addChallenge]);

  useEffect(() => {
    const getStatus = (id) => {
      if (currentTime.isBefore(moment(challenges[id].start_time))) {
        return 'Not Yet';
      }
      if (currentTime.isBefore(moment(challenges[id].end_time))) {
        return 'Opened';
      }
      return 'Closed';
    };

    // console.log(challenges);
    if (classes[classId]) {
      setTableData(
        classes[classId].challengeIds
          .filter((id) => getStatus(id) !== 'Not Yet')
          .reduce((acc, b) => ([b, ...acc]), [])
          .map((id) => ({
            title: challenges[id].title,
            path: `/all-class/${courseId}/${classId}/challenge/${id}`,
            startTime: moment(challenges[id].start_time).format('YYYY-MM-DD, HH:mm'),
            endTime: moment(challenges[id].end_time).format('YYYY-MM-DD, HH:mm'),
            status: getStatus(id),
          })),
      );
    }
  }, [challenges, challengesID, classId, classes, courseId, currentTime]);

  if (loading.fetchChallenges || courses[courseId] === undefined || classes[classId] === undefined) {
    return <GeneralLoading />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));

    if (name === 'title' && value !== '') {
      setError(false);
      setErrorText('');
    }
  };

  const handleAdd = () => {
    if (inputs.title === '') {
      setError(true);
      setErrorText("Can't be empty");
      return;
    }
    const body = {
      title: inputs.title,
      scoredBy: inputs.scoredBy === 'Last Score' ? 'LAST' : 'BEST',
      showTime: inputs.showTime === 'On End Time' ? 'END_TIME' : 'START_TIME',
      startTime: dateRangePicker[0].startDate.toISOString(),
      endTime: dateRangePicker[0].endDate.toISOString(),
    };
    dispatch(addChallenge(authToken, classId, body));
    setPopUp(false);
    setInputs({
      title: '',
      scoredBy: 'Last Score',
      showTime: 'On End Time',
    });
    setDateRangePicker([
      {
        startDate: moment().startOf('week').toDate(),
        endDate: moment().endOf('week').toDate(),
        key: 'selection',
      },
    ]);
  };

  const handleCancel = () => {
    setPopUp(false);
    setInputs({
      title: '',
      scoredBy: 'Last Score',
      showTime: 'On End Time',
    });
    setDateRangePicker([
      {
        startDate: moment().startOf('week').toDate(),
        endDate: moment().endOf('week').toDate(),
        key: 'selection',
      },
    ]);
  };

  return (
    <>
      <Typography className={className.pageHeader} variant="h3">
        {`${courses[courseId].name} ${classes[classId].name} / Challenge`}
      </Typography>

      <CustomTable
        hasSearch
        data={tableData}
        columns={[
          {
            id: 'title',
            label: 'Title',
            minWidth: 150,
            align: 'center',
            width: 200,
            type: 'string',
          },
          {
            id: 'startTime',
            label: 'Start Time',
            minWidth: 50,
            align: 'center',
            width: 180,
            type: 'string',
          },
          {
            id: 'endTime',
            label: 'End Time',
            minWidth: 50,
            align: 'center',
            width: 180,
            type: 'string',
          },
          {
            id: 'status',
            label: 'Status',
            minWidth: 50,
            align: 'center',
            width: 100,
            type: 'string',
          },
        ]}
        hasLink
        linkName="path"
      />
    </>
  );
}
