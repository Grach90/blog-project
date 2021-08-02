import React, {useEffect} from 'react';
import styles from './login.module.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {signIn} from '../../Redux/actions';
import PropTypes from 'prop-types';


const Login = ({handleChange, formData, handleSubmit, resetLoginState, history}) => {

  useEffect(() => {
    return () => {
      resetLoginState()
    }
  },[]);

  return (
    <div className={styles.container}>
      <TextField 
        className={styles.formControl} 
        id="email" 
        label="Email"
        variant="outlined" 
        onChange={(e) => handleChange(e)}
        value={formData.emile}
      />
      <TextField 
        id="password" 
        label="Password" 
        variant="outlined" 
        type='password' 
        onChange={(e) => handleChange(e)}
        value={formData.password}
      />
      <Button  
        variant="contained" 
        color="primary" 
        onClick={() => handleSubmit(formData, history)}
      >
        LOGIN
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    formData: {...state.loginState.formData}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) => dispatch({type: 'ONCHANGE_LOGIN', e}),
    handleSubmit: (formData, history) => dispatch((dispatch) => {
      signIn(formData, dispatch, history)
    }),
    resetLoginState: () => dispatch({type: 'RESET_LOGIN_STATE'})
  }
}

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.object, 
  handleSubmit: PropTypes.func.isRequired,
  resetLoginState: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);