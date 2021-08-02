import React, {useEffect} from 'react';
import styles from './register.module.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {registerThunk} from '../../Redux/actions';
import Spiner from '../Spiner/Spiner';
import PropTypes from 'prop-types';

const Register = ({formData, handleChange, resetState, register, loading, history}) => {

  useEffect(() =>{
    return () => {
      resetState();
    }
  },[]);

  const handleSubmit = () => {
    const data = {};
    for(let item in formData){
      data[item] = formData[item].value;
    }
    register(data, history)
  }

  let valid = false;
  for(let item in formData){
    if(formData[item].valid || formData[item].value === '') 
    valid = true;
  }

  if(loading) return <Spiner />

  return (
    <div className={styles.container}>
      <TextField className={styles.formControl} 
        error={formData.name.valid}
        helperText={formData.name.error}
        id="name" 
        label="First Name" 
        variant="outlined" 
        onChange={(e) => handleChange(e)} 
        value={formData.name.value}
      />
      <TextField className={styles.formControl} 
        error={formData.surname.valid}
        helperText={formData.surname.error}
        id="surname" 
        label="Last Name" 
        variant="outlined" 
        onChange={(e) => handleChange(e)} 
        value={formData.surname.value}
      />
      <TextField className={styles.formControl} 
        error={formData.email.valid}
        helperText={formData.email.error}
        id="email" 
        label="Email" 
        variant="outlined" 
        onChange={(e) => handleChange(e)} 
        value={formData.email.value}
      />
      <TextField className={styles.formControl} 
        error={formData.password.valid}
        helperText={formData.password.error}
        id="password" 
        label="Password" 
        variant="outlined" 
        type='password'
        onChange={(e) => handleChange(e)} 
        value={formData.password.value} 
      />
      <TextField className={styles.formControl}
        error={formData.confirmPassword.valid}
        helperText={formData.confirmPassword.error} 
        id="confirmPassword" 
        label="Confirm Password" 
        variant="outlined" 
        type='password' 
        onChange={(e) => handleChange(e)} 
        value={formData.confirmPassword.value}
      />
      <Button  variant="contained" color="primary" disabled={valid} onClick={handleSubmit}>
        Register
      </Button>
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    formData: {...state.registerState.formData},
    loading: state.globalState.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) => dispatch({type: 'REGISTER_ONCHANGE', e}),
    resetState: () => dispatch({type: 'RESET_REGISTER_STATE'}),
    register: (data, history) => dispatch((dispatch) => {
      registerThunk(dispatch, data, history);
    })
  }
}

Register.propTypes = {
  formData: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired, 
  register: PropTypes.func.isRequired, 
  loading: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);