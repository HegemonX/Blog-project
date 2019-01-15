import React from 'react'

function LoginWelcome(props) {
    const userData = props.userData
    
    return(
        <div>
            <button onClick={props.handleLogout}>
                Logout
            </button>
            <h3>Welcome, {userData.username}!</h3>
        </div>
    )
}

export default LoginWelcome