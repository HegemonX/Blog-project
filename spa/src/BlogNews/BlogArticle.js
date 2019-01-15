import React from 'react'
import CommentSection from './CommentSection'

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'MST',
}

export default class BlogArticle extends React.PureComponent {
    render() {
        const article = this.props.article;
        const date = new Date(article.date).toLocaleDateString("ru", options);
        return(
            <div className="blog-news__article block">
                <div className="blog-news__date">{date}</div>
                <h3 className="blog-news__article-title">{article.title}</h3>
                <span className="blog-news__article-author">{article.author}</span>
                <div className="blog-news__article-text">{article.text}</div>
                <CommentSection {...this.props} />
            </div>
        )
    }
}