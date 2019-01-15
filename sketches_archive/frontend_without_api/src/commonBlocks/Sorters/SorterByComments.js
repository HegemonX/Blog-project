import React from 'react'

export default class SorterByComments extends React.PureComponent {
    constructor(props) {
        super(props);

        this.sortByComments = this.sortByComments.bind(this);

        this.sortedContent = this.props.content.slice();
    }

    sortByComments() {
        if (this.props.sortedBy !== 'comments') {
            this.sortedContent.sort(function(a,b) {
                var aCommentsLength = (a.comments && a.comments.length) || 0;
                var bCommentsLength = (b.comments && b.comments.length) || 0;
                if (aCommentsLength > bCommentsLength) return -1;
                return 1;
            })

        } else {
            this.sortedContent = this.sortedContent.reverse();
        }
        
        this.props.callback(this.sortedContent, 'comments');
    }

    render() {
        return(
            <span><li onClick={this.sortByComments}>Comments</li></span>
        )
    }
    
}