import React from 'react'

export default class SorterToDefault extends React.PureComponent {
    constructor(props) {
        super(props)

        this.sortToDefault = this.sortToDefault.bind(this);
    }

    sortToDefault() {
        if (this.props.sortedBy !== 'none') {
            this.props.callback(this.props.sourceContent, 'none')
        }
    }
    
    render() {
        return(
            <span><li onClick={this.sortToDefault}>Default</li></span>
        )
    }
}