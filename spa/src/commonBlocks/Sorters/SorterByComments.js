import React from 'react'

export default class SorterByComments extends React.PureComponent {
    sortByComments = () => {
        var sort = this.props.sortedBy

        if (sort !== 'comments' && sort !== '-comments') {
            sort = '-comments'
            this.sortedContent = this.props.content
                .slice()
                .sort( (a, b) => {
                    if (a.comments > b.comments) return -1
                    return 1
                })
        } else {
            sort = 'comments'
            this.sortedContent = this.props.content
                .slice()
                .reverse()
        }
        this.props.onSort(this.sortedContent, sort)
    }

    render() {
        return(
            <span><li onClick={this.sortByComments}>Comments</li></span>
        )
    }
    
}