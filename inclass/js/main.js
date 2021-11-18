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

// Function to get the song info when the image is clicked
/**
 * @param img_index
 * @param item_index
 * 
 * Function gets song from spotify using the image index of our gallery.
 * Then finds the correct item_index inside of the JSON response data from Spotify
 * which will produce a preview url that will be used to play song from soundtrack.
 * 
 */

async function clickedEvent(img_index,item_index){
    let track = document.getElementsByTagName('img')[img_index].attributes[1].value;
    // Get token
    let token = await getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ])

    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
        method: 'GET',
        headers: headers
    })

    let result = await fetch(request);

    let response = await result.json();
    console.log(response)
    song = response.tracks.items[item_index].preview_url
}

