import React from 'react'

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'MST',
    hour: 'numeric',
    minute: 'numeric',
}

export default class UserComment extends React.PureComponent {

    render() {
        const comment = this.props.comment
        var date = new Date(comment.date).toLocaleString("ru", options);
        return(
            <div className="comment">
                <hr className="comment__line"/>

                <div className="comment__header">
                    <span className="comment__author">
                        {comment.author}
                    </span>
                    <span className="comment__date">
                        {date}
                    </span>                    
                </div>
                <div className="comment__text">
                    {comment.text}
                </div>
            </div>
        )
    }
}