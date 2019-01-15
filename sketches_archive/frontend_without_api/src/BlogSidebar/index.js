import React from 'react'

export default class BlogSidebar extends React.PureComponent {
    render() {
        return(
            <div id="blog-sidebar" className="block">
                <ul>
                    <li><a href="/">Main page</a></li>
                    <li><a href="/">Add post</a></li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
            </div>
        )
    }
}