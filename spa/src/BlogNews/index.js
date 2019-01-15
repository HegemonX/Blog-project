import React from "react";
import BlogArticle from "./BlogArticle";
import SortNewsMenu from "./SortNewsMenu";
import "./style.css";
import { AJAX_URL } from "../settings";

export default class BlogNews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };

    this.onSortArticlesList = this.onSortArticlesList.bind(this);
  }

  fetchArticles() {
    return fetch(`${AJAX_URL}/api/news/`)
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(err));
  }

  onSortArticlesList(newArticlesList) {
    this.setState({
      articles: newArticlesList
    });
  }

  getArticles = () => {
    if (this.state.articles.length === 0) {
      this.loadArticles();
    } else {
      return this.state.articles;
    }
  };

  loadArticles = () => {
    this.fetchArticles().then(data => {
      this.sourceArticles = data;
      this.setState({
        articles: data
      });
    });
  };

  renderArticle = article => {
    return <BlogArticle key={article.id} article={article} {...this.props} />;
  };

  componentDidMount() {
    this.loadArticles();
  }

  render() {
    var articlesJSX = this.state.articles ? (
      this.state.articles.map(this.renderArticle)
    ) : (
      <p>No articles</p>
    );
    return (
      <div id="blog-news">
        <SortNewsMenu
          source={this.sourceArticles}
          articles={this.state.articles}
          onSort={this.onSortArticlesList}
        />
        {articlesJSX}
      </div>
    );
  }
}
