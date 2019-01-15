import React from 'react'
import UserComment from '../commonBlocks/UserComment'
import LetComment from './LetComment'
import {AJAX_URL} from '../settings'


export default class CommentSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: true,
            commentsLoaded: this.props.article.preview_comments.length,
            info: ''
        }
        
        this.SHOW_MORE_COMMENTS_NUMBER = 10
        this.comments = this.props.article.preview_comments
        this.postedComments = []
        this.showComments = this.showComments.bind(this);
    }

    fetchCommentAdd(data) {
        var articleId = this.props.article.id
        var url = `${AJAX_URL}/api/news/${articleId}/comments/`
        var token = localStorage.getItem('token')
        return fetch(url, {
            method: 'post',
            body: data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    displayPostedComment = (data) => {
        this.postedComments.push(data)
        this.setState({
            info: ''
        })
    }

    handleAddComment = (event) => {
        event.preventDefault()
        var formData = new FormData(event.target)
        var isOk = false;
        return this.fetchCommentAdd(formData)
        .then(
            res => {
                if (res.ok) isOk = true
                return res.json()
            })
        .then(
            data => {
                if (!isOk) {
                    this.setState({
                        info: data
                    })
                    throw new Error('err while posting comment')
                }
                this.displayPostedComment(data)
            }
        )
        .catch(
            err => console.log(err)
        )
    }

    fetchCommentsGet = (from = 1, to = this.SHOW_MORE_COMMENTS_NUMBER) => {
        var articleId = this.props.article.id
        var getOptions = `?from=${from}&to=${to}`
        var url = `${AJAX_URL}/api/news/${articleId}/comments/${getOptions}`
        return fetch(url)
        .then( res => res.json() )
        .then( data => data )
        .catch( err => console.log(err))
    }

    loadMoreComments = (from = 1, to = this.SHOW_MORE_COMMENTS_NUMBER) => {
        this.fetchCommentsGet(from, to)
        .then( data => {
            this.comments = this.comments.slice().concat(data)
            this.setState((state) => ({
                commentsLoaded: state.commentsLoaded + data.length,
            }))
        })
        .catch( err => console.log(err))
    }

    handleShowMoreComments = (e) => {
        this.loadMoreComments(this.state.commentsLoaded + 1,
            this.state.commentsLoaded + this.SHOW_MORE_COMMENTS_NUMBER)
    }
    
    drawComment = (comment) => {
            return(
                <UserComment 
                    comment={comment}
                    key={comment.id}
                />
            )
    }


    showComments() {
        if (!this.state.isOpened) return(null)

        this.commentsJSX = this.comments
            .slice(0, this.state.commentsLoaded)
            .map(this.drawComment)
        
        this.postedCommentsJSX = this.postedComments.map(this.drawComment)

        
        if (this.props.article.comments > this.state.commentsLoaded) {
            var commentsToShow = (
                this.props.article.comments - this.state.commentsLoaded > this.SHOW_MORE_COMMENTS_NUMBER
                ? this.SHOW_MORE_COMMENTS_NUMBER
                : this.props.article.comments - this.state.commentsLoaded
            );


            var moreCommentsHtml = (
                <div className="comments__show-more"
                    onClick={this.handleShowMoreComments}>
                    Show {commentsToShow} more comments..
                </div>
            )
        }


        return(
            <div>
                {this.commentsJSX ? this.commentsJSX : null}
                {moreCommentsHtml ? moreCommentsHtml : null}
                {this.postedCommentsJSX ? this.postedCommentsJSX : null}
                {this.props.isLoggedIn 
                    ? <LetComment 
                        handleSubmit={this.handleAddComment}
                        info={this.state.info}
                    />
                    : null                   
                }
            </div>
        )
    }

    toggleComments = (e) => {
        this.setState({
            isOpened: !this.state.isOpened
        })
    }

    render() {
        return(
            <div className="comments-section">
                <div className="comments-button" onClick={(e) => this.toggleComments(e)}>
                    <img 
                        src="static/img/comments.png" 
                        alt="Comments"
                    />
                    <span className="comments-count">
                        {this.props.article.comments + this.postedComments.length}
                    </span>
                </div>
                {this.showComments()}
            </div>
        )
    }
}