let apiBase = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";
let apiListBase = "https://theaudiodb.com/api/v1/json/1/album.php?i=";

let app = new Vue({
    el: '#top',
    data: {
        artist: [],
        albums: [],
        errorOccured: false,
        notFound: false,
        albumNotFound: false,
        isFavourite: false
    },
    created() {
        let app = this;
        let query = window.location.href.split("s=")[1]

        axios.get(apiBase + query)
            .then(function (response) {
                if (response.data.artists === null) {
                    app.notFound = true;
                    window.document.title = "Sorry :( ● whazam"
                }
                else {
                    app.artist = response.data.artists[0];
                    window.document.title = app.artist.strArtist + " ● whazam";
                    app.checkFavourite();
                    app.getAlbums();
                }
            })
            .catch(error => {
                app.errorOccured = true;
                window.document.title = "Sorry :( ● whazam"
            })
    
    },
    methods: {
        getAlbums: function(){
            axios.get(apiListBase + app.artist.idArtist)
            .then(function (response) {
                if (response.data.album === null) {
                    app.albumNotFound = true;
                }
                else {
                    app.albums = response.data.album;
                }
            })
            .catch(error => {
                app.albumNotFound = true;
            })
        },
        favourite: function(){
            if(!app.isFavourite){
                let favouriteArtists = localStorage.getItem("favouriteArtists");
                if (favouriteArtists === null) {
                    let data = [];
                    data.push(app.artist.idArtist)
                    localStorage.setItem("favouriteArtists", JSON.stringify(data));
                }
                else{
                    favouriteArtists = JSON.parse(favouriteArtists);
                    let data = favouriteArtists;
                    
                    let found = false;
                    for(i=0; i<data.length; i++){
                        if(data[i] === app.artist.idArtist){
                            found = true;
                        }
                    }
                    if(!found){
                        data.push(app.artist.idArtist)
                        localStorage.setItem("favouriteArtists", JSON.stringify(data));
                    }
                }
            }
            else{
                let favouriteArtists = localStorage.getItem("favouriteArtists");
                favouriteArtists = JSON.parse(favouriteArtists);
                let data = favouriteArtists;

                let found = null;
                for(i=0; i<data.length; i++){
                    if(data[i] === app.artist.idArtist){
                        found = i;
                    }
                }
                if(found !== null){
                    data.splice(found, 1);
                    localStorage.setItem("favouriteArtists", JSON.stringify(data));
                }
            }
            app.checkFavourite();
        },
        checkFavourite: function(){
            let favouriteArtists = localStorage.getItem("favouriteArtists");
            if (favouriteArtists !== null) {
                favouriteArtists = JSON.parse(favouriteArtists);

                let data = favouriteArtists;
                let found = false;

                for(i=0; i<data.length; i++){
                    if(data[i] === app.artist.idArtist){
                        found = true;
                    }
                }
                app.isFavourite = found;
            }
        }
    }
})