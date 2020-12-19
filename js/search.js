// gets the button id and adds event listener function that runs when clicked
document.getElementById('navbarSearchButton').addEventListener("click", function(){
  // input box
  var search = document.getElementById('navbarSearchInput');
  // inputbox value
  var toSearch = search.value;
  if(toSearch !== ""){
    // Adds the value to the url to be used in api call
    let url = "/artist.html?s=" + toSearch;
    // changes the location to the url
    window.location.assign(url)
  }
})

// gets the button id and adds event listener function that runs when clicked
document.getElementById('indexSearchButton').addEventListener("click", function(){
  // input box
  var search = document.getElementById('indexSearchInput');
  // inputbox value
  var toSearch = search.value;
  if(toSearch !== ""){
    // Adds the value to the url to be used in api call
    let url = "/artist.html?s=" + toSearch;
    // changes the location to the url
    window.location.assign(url)
  }
})
