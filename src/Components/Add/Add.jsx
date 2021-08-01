import styles from './add.module.css';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {connect} from 'react-redux';
import {addArticle} from '../../Redux/actions';
import {useEffect} from 'react';

const Add = ({formData, handleSubmit, handleChange, user, history, resetState}) => {

  useEffect(()=>{
    return () => {
      resetState();
    }
  },[]);

  return (
    <div className={styles.container}>
      <TextField 
        id="title" 
        label="Title" 
        variant="outlined" 
        className={styles.formControl}
        onChange={(e) => handleChange(e, 'title')}
        value={formData.title}
      />
      <FormControl
        id="category"
        variant="outlined" 
        className={styles.formControl} 
        onChange={(e) => handleChange(e, 'category')}
        value={formData.category}
      >
        <InputLabel htmlFor="outlined-age-native-simple" >Category</InputLabel>
        <Select native>
          <option aria-label="None" value="" />
          <option>Politics</option>
          <option>Sport</option>
          <option>Economics</option>
          <option>Health</option>
        </Select>
      </FormControl>
      <TextareaAutosize 
        className={styles.formControl} 
        aria-label="minimum height"
        minRows={15} 
        placeholder="Main text"
        onChange={(e) => handleChange(e, 'main_text')}
        value={formData.main_text}
      />
      <Button  
        variant="contained" 
        color="primary" 
        onClick={() => {
          formData.author_name = user.name;
          handleSubmit(formData, history);
      }}>
        Add
      </Button>
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    formData: {...state.addState.formData},
    user: state.globalState.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e, id) => dispatch({type: 'ONCHANGE_ADD', e, id}),
    handleSubmit: (formData, history) => dispatch((dispatch) => {
        addArticle(formData, history, dispatch);
    }),
    resetState: () => dispatch({type: 'RESET_ADD'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);