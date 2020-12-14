new Vue({
  el: '#app',
  data: {
    track: [],
    album: [],
    lyrics:[]
  },
  created() {

    var vm = this

    axios.get('https://www.theaudiodb.com/api/v1/json/1/track.php?h=32793500')
      .then(function (response) {
        vm.track = response.data.track[0]
        console.log(vm.track)

      })

    axios.get('https://theaudiodb.com/api/v1/json/1/album.php?m=2115888')
      .then(function (response) {
        vm.album = response.data.album[0]
        console.log(vm.album)
      })

      axios.get('https://api.lyrics.ovh/v1/The weeknd/D.D.')
      .then(function(response){
        vm.lyrics = response.data.lyrics
        console.log(vm.lyrics)
      })
  }

})
