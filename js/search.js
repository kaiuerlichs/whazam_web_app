// gets the button id and adds event listener function that runs when clicked
document.getElementById('navbarSearchButtonDesktop').addEventListener("click", function(){
  // input box
  var search = document.getElementById('navbarSearchInputDesktop');
  // inputbox value
  var toSearch = search.value;
  if(toSearch !== ""){
    // Adds the value to the url to be used in api call
    let url = "artist.html?s=" + toSearch;
    // changes the location to the url
    window.location.assign(url)
  }
})

// gets the button id and adds event listener function that runs when clicked
document.getElementById('indexSearchButtonMobile').addEventListener("click", function(){
  // input box
  var search = document.getElementById('indexSearchInputMobile');
  // inputbox value
  var toSearch = search.value;
  if(toSearch !== ""){
    // Adds the value to the url to be used in api call
    let url = "artist.html?s=" + toSearch;
    // changes the location to the url
    window.location.assign(url)
  }
})
