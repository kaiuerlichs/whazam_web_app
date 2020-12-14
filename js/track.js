new Vue({
  el: '#app',
  data: {
    track: [],
    album: [],
    lyrics,
    isFavourite: false
  },

  created() {

    let vm = this;

    let id = window.location.href.split("id=")[1]

    .then(function(response){
      vm.track = response.data.track[0]
      window.document.title = app.artist.strArtist + " ● whazam";
       vm.checkFavourite();

    })

    axios.get('https://www.theaudiodb.com/api/v1/json/1/track.php?h=' + id)
      .then(function (response) {
        vm.track = response.data.track[0]
        console.log(vm.track)

      })

    axios.get('https://theaudiodb.com/api/v1/json/1/album.php?m=' + id)
      .then(function (response) {
        vm.album = response.data.album[0]
        console.log(vm.album)
      })

      axios.get('https://api.lyrics.ovh/v1/The weeknd/D.D.')
      .then(function(response){
        vm.lyrics = response.data.lyrics
        console.log(vm.lyrics)
      })
  },

  methods: {
        favourite: function(){
            if(!vm.isFavourite){
                let favouriteArtists = localStorage.getItem("favouriteArtists");
                if (favouriteArtists === null) {
                    let data = [];
                    data.push(vm.track.idTrack)
                    localStorage.setItem("favouriteArtists", JSON.stringify(data));
                }
                else{
                    favouriteArtists = JSON.parse(favouriteArtists);
                    let data = favouriteArtists;

                    let found = false;
                    for(i=0; i<data.length; i++){
                        if(data[i] === vm.track.idTrack){
                            found = true;
                        }
                    }
                    if(!found){
                        data.push(vm.track.idTrack)
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
                    if(data[i] === vm.track.idTrack){
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
                    if(data[i] === vm.artist.idArtist){
                        found = true;
                    }
                }
                app.isFavourite = found;
            }
      }
    },

})
