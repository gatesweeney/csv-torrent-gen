

export default async function pushTorrents(list, domain, port) {
    console.log(list);

    await fetch(`http://${domain}:${port}/seedbox/`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

    },
    body: JSON.stringify(list)
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
}
  
  