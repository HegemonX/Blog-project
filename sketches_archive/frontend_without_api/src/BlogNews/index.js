import React from 'react'
import BlogArticle from './BlogArticle'
import SortNewsMenu from './SortNewsMenu'
import './style.css'


export default class BlogNews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortedBy: 'none'
        };

        this.articles = this.props.articles;
        this.onSortArticlesList = this.onSortArticlesList.bind(this);
    }

    onSortArticlesList(newArticlesList, sort) {
        this.articles = newArticlesList;
        this.setState({
            sortedBy: sort,
        })
    }


    renderArticle(article) {
        return(
            <BlogArticle key={article.id} article={article} />
        )
    }

    render() {
        const articles = this.props.articles;
        
        return(
            <div id="blog-news">
                <SortNewsMenu 
                    content={articles}
                    callback={this.onSortArticlesList}
                    sortedBy={this.state.sortedBy}
                />
                {this.articles.map(this.renderArticle)}
            </div>
        )
    }
}