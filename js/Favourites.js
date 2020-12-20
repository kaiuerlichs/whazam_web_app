// URI pointers without IDs
let trackId = "theaudiodb.com/api/v1/json/1/track.php?h=32793500";
let albumId = "https://theaudiodb.com/api/v1/json/1/album.php?m=";
let artistId = "https://theaudiodb.com/api/v1/json/1/artist.php?i=";

function createNode(element) {
  return document.createElement(element);
}

function appendCard(thumb,name,id) {
  document.getElementById(id).innerHTML+=('<div class="col-3">'
  +'<div class="card mb-3">'
  +'<img class="img-fluid" src="'+thumb+'" alt="Lorem Image">'
  +'<div class="card-img-overlay"><h4 class="card-title">'+name+'</h4></div></div></div>'
  );
}

let app = this;
let ul = document.getElementById('artists');

let favouriteArtists = localStorage.getItem("favouriteArtists");
favouriteArtists = JSON.parse(favouriteArtists);
for (i=0;i<favouriteArtists.length;i++) {
  axios.get(artistId+favouriteArtists[i])
  .then(function(response) {
    let artist = response.data.artists[0];
    let thumb=artist.strArtistThumb;
    let name=artist.strArtist;
    appendCard(thumb,name,"artists");
  })
}

let favouriteAlbums = localStorage.getItem("favouriteAlbums");
favouriteAlbums = JSON.parse(favouriteAlbums);
for (i=0;i<favouriteAlbums.length;i++) {
  axios.get(albumId+favouriteAlbums[i])
  .then(function(response) {
    let album = response.data.album[0];
    let thumb=album.strAlbumThumb;
    let name=album.strAlbum;
    appendCard(thumb,name,"albums");
  })
}

let favouriteTracks = localStorage.getItem("favouriteTracks");
favouriteTracks = JSON.parse(favouriteTracks);
for (i=0;i<favouriteTracks.length;i++) {
  axios.get(trackId+favouriteTracks[i])
  .then(function(response) {
    let track = response.data.track[0];
    let thumb = track.strTrackThumb;
    if (thumb == null) {
      thumb=track.strAlbumThumb;
    }
    let name=track.strTrack;
    appendCard(thumb,name,"tracks");
  })
}
