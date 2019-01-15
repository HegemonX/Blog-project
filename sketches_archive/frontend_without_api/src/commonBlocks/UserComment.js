import React from 'react'

export default class UserComment extends React.PureComponent {
    render() {
        const comment = this.props.comment
        return(
            <div className="comment">
                <hr />
                <span className="comment__author">
                    {comment.user}
                </span>
                <p className="comment__text">
                    {comment.text}
                </p>
            </div>
        )
    }
}