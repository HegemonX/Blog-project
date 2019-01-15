import React from 'react'
import SorterByDate from '../commonBlocks/Sorters/SorterByDate'
import SorterByComments from '../commonBlocks/Sorters/SorterByComments'
import SorterToDefault from '../commonBlocks/Sorters/SorterToDefault'

export default class SortNewsMenu extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            sortedBy: 'none'
        }

    }

    onSort = (articles, sortedBy) => {
        this.setState({
            sortedBy: sortedBy
        })

        this.props.onSort(articles)
    }

    render() {
        return(
            <ul id="blog-news-sort-menu" className="sort-menu">
                Sort by:
                <SorterByDate
                    sortedBy={this.state.sortedBy}
                    content={this.props.articles}
                    onSort={this.onSort}                    
                />
                <SorterByComments
                    sortedBy={this.state.sortedBy}
                    content={this.props.articles}
                    onSort={this.onSort}
                 />
                <SorterToDefault 
                    sortedBy={this.state.sortedBy}
                    source={this.props.source}
                    onSort={this.onSort}
                />
            </ul>
        )
    }
}



