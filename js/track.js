let app = new Vue({
    el: '#app',
    data: {
        track: [],
        album: [],
        lyrics: "",
        isFavourite: false,
        lyricsNotFound: false,
        errorOccured: false,
        trackNotFound: false
    },

    created() {

        let app = this;

        let id = window.location.href.split("id=")[1]

        axios.get('https://www.theaudiodb.com/api/v1/json/1/track.php?h=' + id)
            .then(function (response) {
                if (response.data.track === null) { 
                    app.trackNotFound = true;
                    window.document.title = "Sorry :( ● whazam"
                }
                else {
                    app.track = response.data.track[0]
                    window.document.title = app.track.strTrack + " ● whazam";
                    app.checkFavourite();
                    app.getAlbum();
                    app.getLyrics();
                }
            })
            .catch(error => {
                app.errorOccured = true;
                window.document.title = "Sorry :( ● whazam"
                console.log(error)
            })
    },

    methods: {

        // Get album of track for cover image
        getAlbum: function () {
            axios.get('https://theaudiodb.com/api/v1/json/1/album.php?m=' + app.track.idAlbum)
                .then(function (response) {
                    app.album = response.data.album[0];
                })
        },

        // Get lyrics and save locally
        getLyrics: function () {
            let cachedLyrics = localStorage.getItem("cachedLyrics");
            if (cachedLyrics === null) {
                let data = [];
                localStorage.setItem("cachedLyrics", JSON.stringify(data));
            }
            cachedLyrics = JSON.parse(localStorage.getItem("cachedLyrics"));

            let index = null;
            for (i = 0; i < cachedLyrics.length; i++) {
                if (cachedLyrics[i][0] === app.track.idTrack) {
                    index = i;
                }
            }
            
            if (index !== null) {
                app.lyrics = cachedLyrics[index][1];
            }
            else {
                axios.get('https://api.lyrics.ovh/v1/' + app.track.strArtist + "/" + app.track.strTrack)
                    .then(function (response) {
                        console.log(response.data.lyrics);
                        if (response.data.lyrics === "") {
                            app.lyricsNotFound = true;
                        }
                        else {
                            app.lyrics = response.data.lyrics;
                            cachedLyrics.push([app.track.idTrack, app.lyrics]);
                            localStorage.setItem("cachedLyrics", JSON.stringify(cachedLyrics));
                        }
                    })
            }

        },

        // Toggle favourite stage
        favourite: function () {

            // If artist isnt favourite
            if (!app.isFavourite) {

                // Get localStorage object
                let favouriteTracks = localStorage.getItem("favouriteTracks");

                // Create local storage object if it doesnt exist
                if (favouriteTracks === null) {
                    let data = [];
                    data.push(app.track.idTrack)
                    localStorage.setItem("favouriteTracks", JSON.stringify(data));
                }

                // Add artist ID to local storage
                else {
                    favouriteTracks = JSON.parse(favouriteTracks);
                    let data = favouriteTracks;

                    let found = false;
                    for (i = 0; i < data.length; i++) {
                        if (data[i] === app.track.idTrack) {
                            found = true;
                        }
                    }
                    if (!found) {
                        data.push(app.track.idTrack)
                        localStorage.setItem("favouriteTracks", JSON.stringify(data));
                    }
                }
            }

            // If artist is favourite
            else {
                // Retrieve localStorage
                let favouriteTracks = localStorage.getItem("favouriteTracks");
                favouriteTracks = JSON.parse(favouriteTracks);
                let data = favouriteTracks;

                // Find right item in localStorage
                let found = null;
                for (i = 0; i < data.length; i++) {
                    if (data[i] === app.track.idTrack) {
                        found = i;
                    }
                }

                // Remove from local storage
                if (found !== null) {
                    data.splice(found, 1);
                    localStorage.setItem("favouriteTracks", JSON.stringify(data));
                }
            }
            app.checkFavourite();
        },

        // Check if artist is favourite
        checkFavourite: function () {
            let favouriteTracks = localStorage.getItem("favouriteTracks");

            // If localStorage item exists
            if (favouriteTracks !== null) {
                favouriteTracks = JSON.parse(favouriteTracks);

                let data = favouriteTracks;
                let found = false;

                // Search for artist
                for (i = 0; i < data.length; i++) {
                    if (data[i] === app.track.idTrack) {
                        found = true;
                    }
                }
                app.isFavourite = found;
            }
        }
    }
})
