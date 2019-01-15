import React from 'react'

export default class SorterToDefault extends React.PureComponent {
    sortToDefault = () => {
        if (this.props.sortedBy !== 'none') {
            this.sortedContent = this.props.source.slice()
            this.props.onSort(this.sortedContent, 'none')
        }
    }
    
    render() {
        return(
            <span><li onClick={this.sortToDefault}>Default</li></span>
        )
    }
}