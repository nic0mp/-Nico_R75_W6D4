// Declarations for our song values
let song;
let playSong;

// SPotify client credentials
const clientId = 'a69ffb9028654223912a9b820ff99933';
const clientSecret = 'ed513c69f3fc47888866d4d857d39cf5';

const getToken = async () =>{
    const result = await fetch(`https://accounts.spotify.com/api/token`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    // Access the data given by the response
    const data = await result.json();
    console.log(result)
    console.log(data)
    return data.access_token
}