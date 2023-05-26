let miboton = document.getElementById('deleteProduct')

miboton.addEventListener('click', e => {

    let cid =  e.target.getAttribute("data-cartid")
    let pid = e.target.getAttribute("data-productid")
    let obj = {}

    obj["cid"] = cid
    obj["pid"] = pid
    console.log(cid)
    console.log(pid)

    const url = `/api/carts/${cid}/products/${pid}`
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
    .then(data => alert("PRoducto Eliminado"))
    .catch(error => console.log(error))
})