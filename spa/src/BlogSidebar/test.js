function tokenStatusRequest(token) {
    return fetch('/api/current_user/', {
      headers: new Headers({
        'Authorization': `JWT ${token}`
      })
    })
    .then(
        res => {
            if (res.status == 200) return res.status
        },
        err => {
            alert('err')
        }
    )
    .then(
        status => alert(status)
    )
}