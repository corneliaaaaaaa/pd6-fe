import React from 'react';
import {
  makeStyles, Typography, AppBar, Toolbar, Avatar,
} from '@material-ui/core';
import { AddCircleOutline, SubjectOutlined } from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appbar: {
    height: '9.21vh',
    background: '#090909',
  },
  toolbar: {
    height: '9.21vh',
  },
  main: theme.mixins.toolbar,
  item: {
    marginRight: '3.5vw',
  },
  notification: {
    float: 'left',
    height: '3.28vh',
    width: '3.28vh',
    // marginRight: '2vw',
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
    height: '6.14vh',
    width: '6.14vh',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  active: {
    textDecoration: 'none',
    color: '#1EA5FF',
  },
}));

export default function Header({ role = 'a' }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  let itemList = null;

  if (role === 'a') {
    itemList = [
      {
        text: 'Course',
        path: '/',
      },
      {
        text: 'Account',
        path: '/account',
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
  } else if (role === 'b') {
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
  } else if (role === 'c') {
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
  } else if (role === 'd') {
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

  return (
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Avatar src="https://pdogs.ntu.im/judge/image/LOGO.png" className={classes.avatar} />
          {itemList.map((item) => (
            <Typography variant="h6" className={classes.item} key={item.text}>
              <a href={item.path} className={location.pathname === item.path ? classes.active : classes.a}>
                {item.text}
              </a>
            </Typography>
          ))}
          <div className={classes.right}>
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
