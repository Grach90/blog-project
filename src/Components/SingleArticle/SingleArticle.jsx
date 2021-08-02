import styles from './singlearticle.module.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {connect} from 'react-redux';
import {useEffect} from 'react';
import {getSingleArticle} from '../../Redux/actions';
import Spiner from '../Spiner/Spiner';
import PropTypes from 'prop-types';

const SingleArticle = ({getArticle, history, singleArticle}) => {

  useEffect(() => {
    const id = history.location.pathname.slice(9);
    getArticle(id);
  },[]);

  if(!singleArticle) return <Spiner />

  return (
    <div className={styles.mainDiv}>
    <h1>{singleArticle.title}</h1>
    <div className={styles.article}>
      <div className={styles.title}>
        <h4 >{`Category: ${singleArticle.category}`}</h4>
        <h4 >{`Author: ${singleArticle.author_name},  ${singleArticle.created_at.slice(0,10)}`}</h4>
      </div>
      <div>
        {singleArticle.main_text}
      </div>
    </div>
    <div>
        <Fab color="primary" aria-label="add" onClick={() => history.push('/add')}>
          <AddIcon />
        </Fab>
      </div>
  </div>
  )
}

const mapStateToProps = (state) => {
  return {
    singleArticle: state.globalState.singleArticle
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArticle: (id) => dispatch((dispatch) => {
      getSingleArticle(id, dispatch);
    })
  }
}

SingleArticle.propTypes = {
  getArticle: PropTypes.func.isRequired, 
  singleArticle: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);