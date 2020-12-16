// gets the button id and adds event listener function that runs when clicked
document.getElementById('navbarSearchButton').addEventListener("click", function(){
  // input box
  var search = document.getElementById('navbarSearchInput');
  // inputbox value
  var toSearch = search.value;
  // Adds the value to the url to be used in api call
  let url = "'./track.html?s=' +toSearch";
  // changes the location to the url
  window.location.assign("url")
})
