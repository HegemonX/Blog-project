import React from 'react'

class LetComment extends React.PureComponent {

    onSubmit = (e) => {
        this.props.handleSubmit(e);
        e.target.elements.text.value = '';
    }

    render() {
        return(
            <div>
                <strong>{this.props.info}</strong>
                <form onSubmit={this.onSubmit}>
                    <textarea
                        style={{width: "80%"}}
                        name="text" 
                        placeholder="Leave a comment.."
                    />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default LetComment