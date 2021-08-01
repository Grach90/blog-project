import styles from './article.module.css';


const Article = ({article}) => {
  return (
    <div className={styles.article}>
        <div className={styles.title}>
          <h2 style={{margin: '0px'}}>{article.title}</h2>
          <h5 style={{margin: '0px'}}>{`Author: ${article.author_name},  ${article.created_at.slice(0,10)}`}</h5>
        </div>
        <div>
          {article.main_text}
        </div>
    </div>
  )
}

export default Article;