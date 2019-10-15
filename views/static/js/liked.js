let cookie = document.cookie.split('=')[1]
let mark_like = false

function _i(id) {
    return document.getElementById(id)
}

let ajax = (link, ep) =>
    new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText)
            }
        }
        xhttp.open('POST', link + ep, true)
        xhttp.send()
    })

function check_like(r, e) {
    let obj = {
        filedata: r,
    }

    return ajax('/liked_?q=', JSON.stringify(obj))
}

function showProfile(username) {
    window.location.href = '/showprofile/' + username
}

function download(filename_id) {
    let json = {
        filename: filename_id,
    }
    location.href =
        window.location.origin + '/download?q=' + JSON.stringify(json)
}

function liked(name, emails) {
    let json = {
        filename: name,
        email: emails,
    }

    let check_liked_ordislike = _i(`${name}likebutton`)

    if (check_liked_ordislike.style.color == 'blue') {
        let unlike = ajax('/unlike?q=', JSON.stringify(json))

        unlike.then(o => {
            let json_c = JSON.parse(o)
            let span_like = _i(`${name}`)

            span_like.innerText = `${json_c.likes} likes`

            let btn_like = _i(`${name}likebutton`)

            btn_like.style.color = 'black'
        })
    } else {
        let r = ajax('/like?q=', JSON.stringify(json))

        r.then(async d => {
            let flag = await check_like(JSON.parse(d))

            let json_c = JSON.parse(flag)

            let r = _i(`${name}`)
            let json_data = JSON.parse(d)

            r.innerText = `${json_data.likes} likes`

            let ids_like = _i(`${name}likebutton`)

            if (json_c.liked == true) {
                ids_like.style.color = 'blue'
            } else {
                ids_like.style.color = 'black'
            }
        }).catch(errr => {
            console.log(errr)
        })
    }
}
