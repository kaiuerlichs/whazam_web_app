let apiBase = "https://theaudiodb.com/api/v1/json/1/album.php?m=";
let apiBaseTracks = "https://theaudiodb.com/api/v1/json/1/track.php?m=";

// Init new Vue instance
let app = new Vue({
    
    // Link to #top element in HTML
    el: '#top',

    // Declare necessary fields
    data: {
        album: [],
        tracks: [],
        errorOccured: false,
        notFound: false,
        isFavourite: false,
        tracklistNotFound: false
    },

    // Code to be executed upon instance creation
    created() {

        // Set this-pointing variable
        let app = this;

        // Get search query
        let query = window.location.href.split("id=")[1]

        // Call to TADb API 
        axios.get(apiBase + query)
            .then(function (response) {
                
                // If album is not found
                if (response.data.album === null) {
                    app.notFound = true;
                    window.document.title = "Sorry :( ● whazam"
                }

                // If album is found
                else {
                    app.album = response.data.album[0];
                    window.document.title = app.album.strAlbum + " ● whazam";
                    app.checkFavourite();
                    app.getTracks();
                }
            })

            // If axios get errored
            .catch(error => {
                app.errorOccured = true;
                window.document.title = "Sorry :( ● whazam"
            })
    
    },
    methods: {

        getTracks: function(){

            // Axios request to API to retrieve album information
            axios.get(apiBaseTracks + app.album.idAlbum)
            .then(function (response) {

                // If album is not found
                if (response.data.album === null) {
                    app.tracklistNotFound = true;
                }

                // If album is found
                else {
                    app.tracks = response.data.track;
                    console.log(app.tracks);
                }
            })

            // If album info could not be retrieved
            .catch(error => {
                app.tracklistNotFound = true;
            })

        },

        // Toggle favourite stage
        favourite: function(){
            
            // If album isnt favourite
            if(!app.isFavourite){

                // Get localStorage object
                let favouriteAlbums = localStorage.getItem("favouriteAlbums");

                // Create local storage object if it doesnt exist
                if (favouriteAlbums === null) {
                    let data = [];
                    data.push(app.album.idAlbum)
                    localStorage.setItem("favouriteAlbums", JSON.stringify(data));
                }

                // Add album ID to local storage
                else{
                    favouriteAlbums = JSON.parse(favouriteAlbums);
                    let data = favouriteAlbums;
                    
                    let found = false;
                    for(i=0; i<data.length; i++){
                        if(data[i] === app.album.idAlbum){
                            found = true;
                        }
                    }
                    if(!found){
                        data.push(app.album.idAlbum)
                        localStorage.setItem("favouriteAlbums", JSON.stringify(data));
                    }
                }
            }

            // If album is favourite
            else{
                // Retrieve localStorage
                let favouriteAlbums = localStorage.getItem("favouriteAlbums");
                favouriteAlbums = JSON.parse(favouriteAlbums);
                let data = favouriteAlbums;

                // Find right item in localStorage
                let found = null;
                for(i=0; i<data.length; i++){
                    if(data[i] === app.album.idAlbum){
                        found = i;
                    }
                }

                // Remove from local storage
                if(found !== null){
                    data.splice(found, 1);
                    localStorage.setItem("favouriteAlbums", JSON.stringify(data));
                }
            }
            app.checkFavourite();
        },

        // Check if album is favourite
        checkFavourite: function(){
            let favouriteAlbums = localStorage.getItem("favouriteAlbums");

            // If localStorage item exists
            if (favouriteAlbums !== null) {
                favouriteAlbums = JSON.parse(favouriteAlbums);

                let data = favouriteAlbums;
                let found = false;

                // Search for album
                for(i=0; i<data.length; i++){
                    if(data[i] === app.album.idAlbum){
                        found = true;
                    }
                }
                app.isFavourite = found;
            }
        }
    }
})