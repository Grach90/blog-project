import styles from './home.module.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {getArticlesThunk} from '../../Redux/actions';
import Article from '../Article/Article';
import Spiner from '../Spiner/Spiner';

const Home = ({getArticles, articles, history}) => {

  useEffect(()=> {
    getArticles()
  },[])

  if(!articles) return <Spiner />

  const articlesJSX = articles.map(article => {
    return (
      <div key={article._id} onClick={() => history.push(`/article/${article._id}`)}>
        <Article article={article}/>
      </div>
    )
  })

  return (
    <div className={styles.mainDiv}>
      <div style={{display:'flex', justifyContent:'center'}}>
        <h1>{articles.length === 0 ? 'THERE ARE NOT ARTICLES' : 'A R T I C L E S'}</h1>
        <Fab 
          color="primary" 
          aria-label="add" 
          onClick={() => history.push('/add')}
          style={{margin: '15px 0 0 30px'}}
        >
          <AddIcon />
        </Fab>
      </div>
      {articlesJSX}
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    articles: state.globalState.articles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArticles: () => dispatch((dispatch) => {
      getArticlesThunk(dispatch);
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);