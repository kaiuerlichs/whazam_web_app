new Vue({
  el: '#app',
  data:{
    track: [],
    album: []
  },
  created(){

      var vm = this

      axios.get('https://www.theaudiodb.com/api/v1/json/1/track.php?h=32793500')
      .then(function(response){
        vm.track = response.data.track[0]
        console.log(vm.track)

        var al = this
          axios.get('https://theaudiodb.com/api/v1/json/1/album.php?m=2115888')
          .then(function(response){
            al.album = response.data.album[0]
            console.log(al.album)
          })
      })
    }

})
