import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {signout} from '../../Redux/actions';
import {getUserInfo} from '../../Helpers/auth';
import {searchArticle} from '../../Redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
  },
  menuButton: {
      marginRight: theme.spacing(2),
  },
  title: {
      flexGrow: 1,
  },
  search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
      },
  },
  searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  inputRoot: {
      color: 'inherit',
  },
  inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
          width: '20ch',
      },
  },
}));

const Navbar = ({isAuthenticated, logout, user, getUser}) => {

  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchState, setState] = React.useState({searchValue:''});
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if(user === null){
    getUser();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => history.push('/')}>
            <HomeIcon style={{color: 'white'}} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            
          </Typography>
          {isAuthenticated && (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={(e) => setState({searchValue: e.target.value})}
              onKeyDown={(e) => e.key === 'Enter' ? searchArticle(searchState.searchValue) : ''}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          )}
          {isAuthenticated ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <div style={{marginRight: '5px', fontSize: '16px'}}>{user && user.name}</div>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => history.push('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => logout(history)}>Logout</MenuItem>
              </Menu>
            </div>
          ) : <>
               <Button color='inherit' onClick={() => history.push('/login')}>LOGIN</Button>
               <Button color='inherit' onClick={() => history.push('/register')}>REGISTER</Button>
              </>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.globalState.isAuthenticated,
    user: state.globalState.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (history) => dispatch((dispatch) => {
      signout(dispatch, history);
    }),
    getUser: async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      const userInfo = await getUserInfo(token);
      dispatch({ type: 'USER_INFO', userInfo });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);