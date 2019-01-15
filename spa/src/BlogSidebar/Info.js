import React from 'react'

class Info extends React.Component {

    printErrors(obj) {
        var str = [];
        for (var key in obj) {
            str.push(
                <div key={key}>
                    {obj[key].toString()}
                </div>
            )
        }

        return(
            <div>
                {str}
            </div>
        )
      }

    render() {
        return(
            this.props.message
                ? this.printErrors(this.props.message)
                : null
        )
    }
}

export default Info