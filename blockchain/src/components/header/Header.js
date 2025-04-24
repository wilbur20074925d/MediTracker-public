import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.05)',
    color: '#1A73E8'
  },
  title: {
    flexGrow: 1,
    fontWeight: 600,
    fontSize: '24px',
    letterSpacing: '0.5px'
  },
  button: {
    color: '#1A73E8',
    fontWeight: 500,
    marginLeft: theme.spacing(2),
    '&:hover': {
      backgroundColor: 'rgba(26, 115, 232, 0.04)'
    }
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className={classes.navLink}>
              MEDITRACKER
            </NavLink>
          </Typography>
          <Button className={classes.button} component={NavLink} to="/signin">
            Login
          </Button>
          <Button className={classes.button} component={NavLink} to="/signup">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;