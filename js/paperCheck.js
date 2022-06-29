window.addEventListener("load", function () {
  var img = document.querySelector("img");
  var path;
  path = location.href.split("#");
  img.src = path[1].slice(2);
  img.style.visibility = "hidden";
  var timer = setInterval(function () {
    if (img.offsetLeft != 0) {
      img.style.marginLeft = "-" + img.offsetWidth / 2 + "px";
      img.style.visibility = "visible";
      clearInterval(timer);
    }
    console.log("ok");
  }, 20);
});
