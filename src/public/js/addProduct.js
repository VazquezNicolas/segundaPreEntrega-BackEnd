const form = document.getElementById('addProduct')

form.addEventListener('submit', e => {
    e.preventDefault()

    const data = new FormData(form)
    const obj = {}

    data.forEach((value,key) => (obj[key]=value))

    const url = '/${cid}/products/${cid}'
    const headers = {
        'Content-Type': 'application/json'
    }
    const method = 'PUT'
    const body = JSON.stringify(obj)

    fetch(url, {
        headers,
        method,
        body,
    })
    .then(response => response.json())
    .then(data => alert(data.status))
    .catch(error => console.log(error))
})