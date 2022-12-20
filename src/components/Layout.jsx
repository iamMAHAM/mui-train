import { Avatar, Box, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
} from '@mui/material';
import { CreateOutlined, SubjectOutlined } from '@mui/icons-material';
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
const drawerWidth = 240;
const useStyle = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: 'flex',
    },
    active: {
      background: '#f4f4f4',
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px) !important`,
    },
    toolbar: {
      marginTop: 60,
    },
    date: {
      flexGrow: 1,
    },
  };
});
export default function Layout({ children }) {
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'My notes',
      path: '/',
      icon: <SubjectOutlined color="secondary" />,
    },
    {
      text: 'Create note',
      path: '/create',
      icon: <CreateOutlined color="secondary" />,
    },
  ];
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} elevation={0} color={'transparent'}>
        <Toolbar>
          <Typography className={classes.date}>
            today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>iamMAHAM</Typography>
          <Avatar src="" />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Ninja Notes
          </Typography>
        </div>

        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : ''}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box className={classes.page}>
        <Box className={classes.toolbar}>{children}</Box>
      </Box>
    </div>
  );
}
