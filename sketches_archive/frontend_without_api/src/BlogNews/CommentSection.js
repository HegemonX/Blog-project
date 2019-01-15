import React from 'react'
import UserComment from '../commonBlocks/UserComment'

export default class CommentSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: false,
            commentsShowed: 1,
        }

        this.showComments = this.showComments.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.changeNumberOfShowedComments = this.changeNumberOfShowedComments.bind(this);

    }

    showComments() {
        if (!this.state.isOpened || this.commentsJSX.length === 0) {
            return(null)
        } else {
            var commentsToShow = Math.min(3, this.commentsJSX.length - this.state.commentsShowed)
            var html = null;
            if (commentsToShow !== 0) {
                html = (
                    <div onClick={(e) => this.changeNumberOfShowedComments(commentsToShow)}>
                        Show {commentsToShow} more comments..
                    </div>
                )
            }
            return(
                <div>
                    {this.commentsJSX.slice(0, this.state.commentsShowed)}
                    {html}
                </div>
            )
        }
    }

    changeNumberOfShowedComments(number) {
        this.setState({
            commentsShowed: this.state.commentsShowed + number,
        })
    }

    toggleComments(e) {
        this.setState({
            isOpened: !this.state.isOpened
        })
    }

    render() {
        this.commentsData = this.props.content.comments || [];
        this.commentsJSX = this.commentsData.map(comment => {
            return(
                <UserComment 
                    comment={comment}
                    key={comment.id}
                />
            )
        })

        return(
            <div className="comments-section">
                <div className="comments-button" onClick={(e) => this.toggleComments(e)}>
                    <img 
                        src="https://png.icons8.com/metro/50/000000/comments.png" 
                        alt="Comments"
                    />
                    <span className="comments-count">
                        {this.commentsData.length}
                    </span>
                </div>
                {this.showComments()}
            </div>
        )
    }
}