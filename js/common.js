window.addEventListener("load", function () {
  window.addEventListener(
    "mousewheel",
    function (event) {
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
      }
    },
    { passive: false }
  );

  //firefox
  window.addEventListener(
    "DOMMouseScroll",
    function (event) {
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
      }
    },
    { passive: false }
  );

  var selected = document.querySelector(".select_pages");
  var nav_items = document.querySelector(".nav").children[0];

  for (var i = 0; i < nav_items.children.length; i++) {
    nav_items.children[i].addEventListener("mouseenter", function () {
      for (var j = 0; j < nav_items.children.length; j++) {
        nav_items.children[j].className = "";
      }
      this.className = "select_pages";
    });
    nav_items.children[i].addEventListener("mouseleave", function () {
      for (var j = 0; j < nav_items.children.length; j++) {
        nav_items.children[j].className = "";
      }
      selected.className = "select_pages";
    });
  }
});
