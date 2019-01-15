import React from 'react'

export default class SorterByDate extends React.PureComponent {
    sortByDate = () => {
        var sort = this.props.sortedBy
        if (sort !== 'date' && sort !== '-date') {
            sort = '-date'
            this.sortedContent = this.props.content
                .slice()
                .sort( (a, b) => {
                    if (Date.parse(a.date) > Date.parse(b.date)) return -1
                    return 1
                })
        } else {
            sort = 'date'
            this.sortedContent = this.props.content
                .slice()
                .reverse()
        }
        this.props.onSort(this.sortedContent, sort)
    }

    render() {
        return(
            <span><li onClick={this.sortByDate}>Date</li></span>
        )
    }
    
}