import React from 'react'
import ReactDOM from 'react-dom'
import BlogSidebar from './BlogSidebar'
import BlogNews from './BlogNews'
import BlogTop from './BlogTop'
import articles from './fixtures'
import './style.css'


class App extends React.Component {

    render() {
        return (
            <div id="page">
                <BlogTop />
                <div id="content">
                    <BlogNews articles={this.props.articles} />
                    <BlogSidebar />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App articles={articles} />, document.getElementById("root"))
