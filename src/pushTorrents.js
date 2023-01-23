

export default async function pushTorrents(list) {
    console.log(list);

    await fetch('http://127.0.0.1:3004/magnet/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "jsonbody": JSON.stringify(list)

    },
    body: JSON.stringify(list)
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
}
  
  