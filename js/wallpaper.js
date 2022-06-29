window.addEventListener("load", function () {
  var papers = document.querySelector(".paper");
  for (var i = 0; i < papers.children.length; i++) {
    papers.children[i].addEventListener("click", function () {
      window.open("paperCheck.html#id" + this.children[0].src.slice(8));
    });
  }
});
