import React from 'react'
import SorterByDate from '../commonBlocks/Sorters/SorterByDate'
import SorterByComments from '../commonBlocks/Sorters/SorterByComments'
import SorterToDefault from '../commonBlocks/Sorters/SorterToDefault'

export default class SortNewsMenu extends React.PureComponent {
    constructor(props) {
        super(props)

        this.source = this.props.content
    }

    render() {
        return(
            <ul id="blog-news-sort-menu" className="sort-menu">
                Sort by:
                <SorterByDate {...this.props} />
                <SorterByComments {...this.props} />
                <SorterToDefault 
                    sourceContent={this.source} 
                    {...this.props}
                />
            </ul>
        )
    }
}



