import React, { useState, useEffect } from 'react';
import {
  makeStyles, Typography, AppBar, Toolbar, Avatar,
} from '@material-ui/core';
import { AddCircleOutline, SubjectOutlined } from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  appbar: {
    minHeight: '55px',
    height: '55px',
    background: theme.palette.black.main,
  },
  toolbar: {
    minHeight: '55px',
    height: '55px',
    paddingLeft: '0px',
  },
  item: {
    marginLeft: '50px',
    // marginRight: '0.8vw',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  date: {
    float: 'left',
    marginRight: '2vw',
  },
  notification: {
    float: 'left',
    width: '3.28vh',
  },
  name: {
    float: 'left',
    marginLeft: '2vw',
    marginRight: '1vw',
  },
  right: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  avatar: {
    marginLeft: '2vw',
    marginRight: '3.5vw',
    height: '4vh',
    width: '4vh',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  active: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));
export default function Header({ role }) {
  const baseURL = '';
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  let itemList = [];
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'MMM d   H:mm'));

  if (role === 'MANAGER') {
    itemList = [
      {
        text: 'Course',
        basePath: '/admin/course',
        path: '/admin/course/course',
      },
      {
        text: 'Account',
        basePath: '/admin/account',
        path: '/admin/account/institute',
      },
      {
        text: 'System',
        basePath: '/admin/system',
        path: '/admin/system/accesslog',
      },
      {
        text: 'About',
        path: '/about',
      },
    ];
  } else if (role === 'NORMAL') {
    itemList = [
      {
        text: 'Problem Set',
        path: '/',
      },
      {
        text: 'About',
        path: '/about',
      },
    ];
  } else if (role === 'GUEST') {
    itemList = [
      {
        text: 'Your Class',
        path: '/',
      },
      {
        text: 'Problem Set',
        path: '/problem_set',
      },
      {
        text: 'PDAO',
        path: '/pdao',
      },
      {
        text: 'About',
        path: '/about',
      },
    ];
  } else if (role === 'TA') {
    itemList = [
      {
        text: 'Your Class',
        path: '/',
      },
      {
        text: 'Problem Set',
        path: '/problem_set',
      },
      {
        text: 'PDAO',
        path: '/pdao',
      },
      {
        text: 'System',
        path: '/system',
      },
      {
        text: 'About',
        path: '/about',
      },
    ];
  }

  useEffect(() => {
    console.log('Current route', location.pathname);
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), 'MMM d   H:mm'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          {/* <Avatar src="https://pdogs.ntu.im/judge/image/LOGO.png" className={classes.avatar} /> */}
          {itemList.map((item) => (
            <Typography variant="h6" className={classes.item} key={item.text}>
              <a
                href={baseURL + item.path}
                className={location.pathname.includes(item.basePath) ? classes.active : classes.a}
              >
                {item.text}
              </a>
            </Typography>
          ))}
          <div className={classes.right}>
            <Typography className={classes.date}>{currentTime}</Typography>
            <NotificationsIcon className={classes.notification} />
            <Typography variant="h6" className={classes.name}>
              shiba
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
