// URI pointers without IDs
let apiBase = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";
let apiListBase = "https://theaudiodb.com/api/v1/json/1/album.php?i=";

// Init new Vue instance
let app = new Vue({
    
    // Link to #top element in HTML
    el: '#top',

    // Declare necessary fields
    data: {
        artist: [],
        albums: [],
        errorOccured: false,
        notFound: false,
        albumNotFound: false,
        isFavourite: false
    },

    // Code to be executed upon instance creation
    created() {

        // Set this-pointing variable
        let app = this;

        // Get search query
        let query = window.location.href.split("s=")[1]

        // Call to TADb API 
        axios.get(apiBase + query)
            .then(function (response) {
                
                // If artist is not found
                if (response.data.artists === null) {
                    app.notFound = true;
                    window.document.title = "Sorry :( ● whazam"
                }

                // If artist is found
                else {
                    app.artist = response.data.artists[0];
                    window.document.title = app.artist.strArtist + " ● whazam";
                    app.checkFavourite();
                    app.getAlbums();
                }
            })

            // If axios get errored
            .catch(error => {
                app.errorOccured = true;
                window.document.title = "Sorry :( ● whazam"
            })
    
    },
    methods: {

        // Gets Album information
        getAlbums: function(){

            // Axios request to API to retrieve album information
            axios.get(apiListBase + app.artist.idArtist)
            .then(function (response) {

                // If album is not found
                if (response.data.album === null) {
                    app.albumNotFound = true;
                }

                // If album is found
                else {
                    app.albums = response.data.album;
                }
            })

            // If album info could not be retrieved
            .catch(error => {
                app.albumNotFound = true;
            })
        },

        // Toggle favourite stage
        favourite: function(){
            
            // If artist isnt favourite
            if(!app.isFavourite){

                // Get localStorage object
                let favouriteArtists = localStorage.getItem("favouriteArtists");

                // Create local storage object if it doesnt exist
                if (favouriteArtists === null) {
                    let data = [];
                    data.push(app.artist.idArtist)
                    localStorage.setItem("favouriteArtists", JSON.stringify(data));
                }

                // Add artist ID to local storage
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

            // If artist is favourite
            else{
                // Retrieve localStorage
                let favouriteArtists = localStorage.getItem("favouriteArtists");
                favouriteArtists = JSON.parse(favouriteArtists);
                let data = favouriteArtists;

                // Find right item in localStorage
                let found = null;
                for(i=0; i<data.length; i++){
                    if(data[i] === app.artist.idArtist){
                        found = i;
                    }
                }

                // Remove from local storage
                if(found !== null){
                    data.splice(found, 1);
                    localStorage.setItem("favouriteArtists", JSON.stringify(data));
                }
            }
            app.checkFavourite();
        },

        // Check if artist is favourite
        checkFavourite: function(){
            let favouriteArtists = localStorage.getItem("favouriteArtists");

            // If localStorage item exists
            if (favouriteArtists !== null) {
                favouriteArtists = JSON.parse(favouriteArtists);

                let data = favouriteArtists;
                let found = false;

                // Search for artist
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