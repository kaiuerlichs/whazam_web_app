// gets the button id and adds event listener function that runs when clicked
document.getElementById('navbarSearchButtonDesktop').addEventListener("click", function(){
  // inputbox value
  var toSearch =  document.getElementById('navbarSearchInputDesktop').value;
  if(toSearch !== ""){
    // Adds the value to the url to be used in api call
    let url = "artist.html?s=" + toSearch;
    // changes the location to the url
    window.location.assign(url)
  }
})

// gets the button id and adds event listener function that runs when clicked
document.getElementById('navbarSearchButtonMobile').addEventListener("click", function(){
  // inputbox value
  var toSearch = document.getElementById('navbarSearchInputMobile').value;
  if(toSearch !== ""){
    // Adds the value to the url to be used in api call
    let url = "artist.html?s=" + toSearch;
    // changes the location to the url
    window.location.assign(url)
  }
})
