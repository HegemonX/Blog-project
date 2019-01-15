import React from 'react'
import CommentSection from './CommentSection'

export default class BlogArticle extends React.PureComponent {
    render() {
        const article = this.props.article;
        const date = new Date(article.date).toDateString();
        return(
            <div className="blog-news__article block">
                <h3 className="blog-news__article-title">{article.title}</h3>
                <div className="blog-news__article-text">
                    {article.text}
                </div>
                <h5 className="blog-news__date">{date}</h5>
                <CommentSection content={article}/>
            </div>
        )
    }
}