// URI pointers without IDs
let trackId = "https://theaudiodb.com/api/v1/json/1/track.php?h=";
let albumId = "https://theaudiodb.com/api/v1/json/1/album.php?m=";
let artistId = "https://theaudiodb.com/api/v1/json/1/artist.php?i=";

//Creates a card and appends it to the specified div.
function appendCard(thumb,name,id,link) {
  if (thumb != null) {
  document.getElementById(id).innerHTML+=('<div class="col-6 col-md-3">'
  +'<div class="card mb-3">'
  +'<img class="img-fluid" src="'+thumb+'" alt="Lorem Image">'
  +'<div class="card-img-overlay"><h4 class="card-title">'+name
  +'</h4></div><a href="'+link+'" class="stretched-link"></a></div></div>'
  );}
  else {
  document.getElementById(id).innerHTML+=('<div class="col-6 col-md-3">'
  +'<a href="'+link+'"><h4 class="card-title">'+name
  +'</h4></a></div>'
  )
  }
}
//Appends a message to the specified div if the user's list is empty.
function appendMessage(id) {
  let message = ("You don't have any favourite "+id+"s yet.");
    document.getElementById(id).innerHTML+=('<p class="lead">'+message+'</p>');
}

//Retrieve favourite artists list from local storage.
let favouriteArtists = localStorage.getItem("favouriteArtists");
favouriteArtists = JSON.parse(favouriteArtists);
//If the list is empty or not present, displays a message saying as such to the user.
if (favouriteArtists == null || favouriteArtists.length==0) {
  appendMessage("artist");
} else {
  //Creates a card for every item in the list.
for (i=0;i<favouriteArtists.length;i++) {
  axios.get(artistId+favouriteArtists[i])
  .then(function(response) {
    let artist = response.data.artists[0];
    let thumb=artist.strArtistThumb;
    let name=artist.strArtist;
    appendCard(thumb,name,"artist",("./artist.html?s="+name));
  })
}}
//Repeats the previous process for the album and track lists.
let favouriteAlbums = localStorage.getItem("favouriteAlbums");
favouriteAlbums = JSON.parse(favouriteAlbums);
if (favouriteAlbums == null || favouriteAlbums.length==0) {
  appendMessage("album");
} else {
for (i=0;i<favouriteAlbums.length;i++) {
  axios.get(albumId+favouriteAlbums[i])
  .then(function(response) {
    let album = response.data.album[0];
    let thumb=album.strAlbumThumb;
    let name=album.strAlbum;
    let id=album.idAlbum;
    appendCard(thumb,name,"album",("./album.html?id="+id));
  })
}}

let favouriteTracks = localStorage.getItem("favouriteTracks");
favouriteTracks = JSON.parse(favouriteTracks);
if (favouriteTracks == null || favouriteTracks.length==0) {
  appendMessage("track");
} else {
for (i=0;i<favouriteTracks.length;i++) {
  axios.get(trackId+favouriteTracks[i])
  .then(function(response) {
    let track = response.data.track[0];

    axios.get("https://theaudiodb.com/api/v1/json/1/album.php?m="+track.idAlbum)
    .then(function(response){

      let thumb = response.data.album[0].strAlbumThumb;
      let name=track.strTrack;
      let id=track.idTrack;
      appendCard(thumb,name,"track",("./track.html?id="+id));

    })
  })
}}
