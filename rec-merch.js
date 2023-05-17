window.onload = function() {
  setCurrentGroup();
};

function setCurrentGroup() {
  var url = window.location.href;
  var links = document.querySelectorAll('.is--current-group');

  // remove the class from any other elements that have it
  for (var i = 0; i < links.length; i++) {
    links[i].classList.remove("is--current-group");
  }

  // add the class to the current group
  if (url.indexOf("recursos") !== -1) {
    document.getElementById("link-recursos").classList.add("is--current-group");
  }
  if (url.indexOf("integracion-visual") !== -1) {
    document.getElementById("link-integracion").classList.add("is--current-group");
  }
  if (url.indexOf("comunicacion") !== -1) {
    document.getElementById("link-comunicacion").classList.add("is--current-group");
  }
  if (url.indexOf("tutorial") !== -1) {
    document.getElementById("link-tutorial").classList.add("is--current-group");
  }
}
