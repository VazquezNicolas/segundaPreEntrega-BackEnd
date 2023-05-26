let daleteAll = document.getElementById('deleteAllProducts')

daleteAll.addEventListener('click', e => {

    let cid =  e.target.getAttribute("data-cartid")

    let obj = {}

    obj["cid"] = cid

    console.log(cid)

    const url = `/api/carts/${cid}`
    const headers = {
        'Content-Type': 'application/json'
    }
    const method = 'DELETE'
    console.log(obj)
    const body = JSON.stringify(obj)
    console.log("Body: ")
    console.log(body)
    fetch(url, {
        headers,
        method,
        body,
    })
    .then(response => response.json())
    .then(data => alert("Carrito Vaciado"))
    .catch(error => console.log(error))
})