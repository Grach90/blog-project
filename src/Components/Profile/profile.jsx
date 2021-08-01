import styles from './profile.module.css';
import image from '../../images/profile-picture.jpg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import Spiner from '../Spiner/Spiner';
import {editUserInfo} from '../../Redux/actions';
import { getUserInfo } from '../../Helpers/auth';

const Profile = ({ 
  userInfo, 
  formData, 
  setUserInfo, 
  handleChange, 
  hide, 
  handleHide, 
  handleSubmit, 
  history         }) => {
  
  useEffect(() => {
    (async function(){
      const token = JSON.parse(localStorage.getItem('token'));
     userInfo = await getUserInfo(token);
    setUserInfo(userInfo);
    })();
  },[])

  if(!userInfo) return <Spiner />

  return (
    <div className={styles.mainDiv}>
      <div className={styles.info}>
        <img src={image} alt="" />
        <div>name: <b>{userInfo.name}</b></div>
        <div>surname: <b>{userInfo.surname}</b></div>
        <div>email: <b>{userInfo.email}</b></div>
        {hide && <Button 
                    style={{marginTop:'20px'}} 
                    variant="contained" 
                    color="primary" 
                    onClick={handleHide}
                  >
                  Edit Profile
                  </Button>}
      </div>

      {hide || (<div className={styles.container}>
      <TextField className={styles.formControl} 
        id="name" 
        variant="outlined" 
        onChange={(e) => handleChange(e)} 
        value={formData.name}
      />
      <TextField className={styles.formControl} 
        id="surname" 
        variant="outlined" 
        onChange={(e) => handleChange(e)} 
        value={formData.surname}
      />
      <TextField className={styles.formControl} 
        id="oldPassword" 
        label="Old Password" 
        variant="outlined" 
        type='password' 
        onChange={(e) => handleChange(e)} 
        value={formData.oldPassword}
      />
      <TextField className={styles.formControl} 
        id="password" 
        label="New Password" 
        variant="outlined" 
        type='password'
        onChange={(e) => handleChange(e)} 
        value={formData.password} 
      />
      <TextField className={styles.formControl}
        id="confirmPassword" 
        label="Confirm Password" 
        variant="outlined" 
        type='password' 
        onChange={(e) => handleChange(e)} 
        value={formData.confirmPassword}
      />
      <Button  
        variant="contained" 
        color="primary" 
        disabled={false} 
        onClick={() => {
          if(userInfo.name === formData.name && userInfo.surname === formData.surname &&
          formData.password === '' && formData.confirmPassword === '')
          {
            handleHide();
          }else{
            handleSubmit(formData, history);
          }
      }}>
        Confirm
      </Button>
    </div>)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.globalState.userInfo,
    formData: {...state.profileState.formData},
    hide: state.profileState.hide
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (userInfo) => dispatch({type: 'SET_USER_INFO', userInfo}),
    handleChange: (e) => dispatch({type: 'ONCHANGE_PROFILE', e}),
    handleHide: () => dispatch({type: 'HIDE_PROFILE'}),
    handleSubmit: (formData, history) => dispatch((dispatch) => {
      editUserInfo(formData, history, dispatch);
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);