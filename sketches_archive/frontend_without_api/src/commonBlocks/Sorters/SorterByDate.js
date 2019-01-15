import React from 'react'

export default class SorterByDate extends React.PureComponent {
    constructor(props) {
        super(props)

        this.sortByDate = this.sortByDate.bind(this)
        this.sortedContent = this.props.content.slice()
    }

    sortByDate() {
        if (this.props.sortedBy !== 'date') {
            this.sortedContent.sort(function(a, b) {
                if (Date.parse(a.date) > Date.parse(b.date)) return -1;
                return 1;
            })

        } else {
            this.sortedContent = this.sortedContent.reverse();
        }
        
        this.props.callback(this.sortedContent, 'date');
    }

    render() {
        return(
            <span><li onClick={this.sortByDate}>Date</li></span>
        )
    }
    
}