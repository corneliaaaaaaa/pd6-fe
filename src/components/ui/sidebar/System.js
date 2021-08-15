import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button,
} from '@material-ui/core';
import Icon from '../icon/index';

export default function System({
  menuItems, classes, history, location, mode,
}) {
  const { announcementId, languageId } = useParams();
  const announcementList = useSelector((state) => state.announcements);
  const languageList = useSelector((state) => state.submitLangs);
  const baseURL = '/admin/system';
  const [display, setDisplay] = useState('unfold');
  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    // console.log(instituteId, accountId);

    const goBackToAnnouncement = () => {
      history.push('/admin/system/announcement');
    };

    const goBackToLanguage = () => {
      history.push('/admin/system/submitlang');
    };

    if (mode === 'main') {
      setTitle('System');
      setItemList([
        {
          text: 'Access Log',
          icon: (
            <Icon.DescriptionIcon
              className={location.pathname === `${baseURL}/accesslog` ? classes.activeIcon : classes.icon}
            />
          ),
          path: `${baseURL}/accesslog`,
        },
        {
          text: 'Announcement',
          icon: (
            <Icon.NotificationsIcon
              className={location.pathname === `${baseURL}/announcement` ? classes.activeIcon : classes.icon}
            />
          ),
          path: `${baseURL}/announcement`,
        },
        {
          text: 'Submission Language',
          icon: (
            <Icon.CodeIcon className={location.pathname === `${baseURL}/submitlang` ? classes.activeIcon : classes.icon} />
          ),
          path: `${baseURL}/submitlang`,
        },
      ]);
    } else if (mode === 'create') {
      setArrow(<Icon.ArrowBackRoundedIcon className={classes.arrow} onClick={goBackToAnnouncement} />);
      setTitle('(Draft)');
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/announcement/add`,
          icon: (
            <Icon.SettingsIcon
              className={location.pathname === `${baseURL}/announcement/add` ? classes.activeIcon : classes.icon}
            />
          ),
        },
      ]);
    } else if (mode === 'announcement' && announcementList.byId[announcementId]) {
      setArrow(<Icon.ArrowBackRoundedIcon className={classes.arrow} onClick={goBackToAnnouncement} />);
      setTitle(announcementList.byId[announcementId].title);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/announcement/${announcementId}/setting`,
          icon: (
            <Icon.SettingsIcon
              className={
                location.pathname === `${baseURL}/announcement/${announcementId}/setting`
                  ? classes.activeIcon
                  : classes.icon
              }
            />
          ),
        },
      ]);
    } else if (mode === 'language' && languageList.byId[languageId]) {
      setArrow(<Icon.ArrowBackRoundedIcon className={classes.arrow} onClick={goBackToLanguage} />);
      setTitle(`${languageList.byId[languageId].name} ${languageList.byId[languageId].version}`);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/submitlang/${languageId}/setting`,
          icon: (
            <Icon.SettingsIcon
              className={
                location.pathname === `${baseURL}/submitlang/${languageId}/setting` ? classes.activeIcon : classes.icon
              }
            />
          ),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, history, mode, announcementList, languageList, announcementId, languageId]);

  const foldSystem = () => {
    setDisplay('fold');
  };

  const unfoldSystem = () => {
    setDisplay('unfold');
  };

  if (
    (announcementId !== undefined && announcementList.byId[announcementId] === undefined)
    || (languageId !== undefined && languageList.byId[languageId] === undefined)
  ) {
    console.log(announcementId, announcementList.byId[announcementId]);
    return (
      <div>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          PaperProps={{ elevation: 5 }}
          classes={{ paper: classes.drawerPaper }}
        />
      </div>
    );
  }

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        PaperProps={{ elevation: 5 }}
        classes={{ paper: classes.drawerPaper }}
      >
        {mode === 'main' ? <div className={classes.topSpace} /> : arrow}
        <div>
          {display === 'unfold' ? (
            <Icon.TriangleDown className={classes.titleIcon} onClick={foldSystem} />
          ) : (
            <Icon.TriangleRight className={classes.titleIcon} onClick={unfoldSystem} />
          )}
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
        </div>
        <Divider variant="middle" className={classes.divider} />
        {display === 'unfold' ? (
          <List>
            {itemList.map((item) => (
              <ListItem button key={item.text} onClick={() => history.push(item.path)} className={classes.item}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={location.pathname === item.path ? classes.active : null}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          ''
        )}
        <div className={classes.bottomSpace} />
      </Drawer>
    </div>
  );
}
