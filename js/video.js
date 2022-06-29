window.addEventListener("load", function () {
  var dp = new DPlayer({
    container: document.getElementById("dplayer"),
    theme: "#2cacde",
    video: {
      url: "../video/《原神》夜兰角色PV——「天网恢恢」_P1_《原神》夜兰角色PV——「天网恢恢」.mp4",
      pic: "../video/cover/yelan.png",
    },
  });
  const path = document.querySelectorAll(".video_path");
  const erchuang = document.querySelector(".erchuang");
  const PV = document.querySelector(".PV");
  const item = document.querySelector(".item");
  var web;
  window.open("../pages/VideoPage.html#id0", "_self");
  for (let j = 0; j < path.length; j++) {
    for (let i = 0; i < path[j].children.length; i++) {
      path[j].children[i].setAttribute("index", j + "_" + i);
      path[j].children[i].addEventListener("click", function () {
        web = "../pages/VideoPage.html#id" + this.getAttribute("index");
        window.open(web, "_self");

        for (let i = 0; i < path[j].children.length; i++) {
          path[j].children[i].className = "";
        }
        this.className = "select";
        // let url = this.children[this.children.length - 1].innerHTML;
        // let pic = this.children[0].src;
        // dp.switchVideo({
        //   url: url,
        //   pic: pic,
        // });
        // dp.play();
      });
    }
  }
  // nav栏内容切换
  item.children[0].addEventListener("click", function () {
    this.className = "select_item";
    item.children[1].className = "";
    PV.style.display = "block";
    erchuang.style.display = "none";
  });
  item.children[1].addEventListener("click", function () {
    this.className = "select_item";
    item.children[0].className = "";
    PV.style.display = "none";
    erchuang.style.display = "block";
  });
  //浏览器前进后退事件
  var id;
  window.addEventListener("popstate", function () {
    id = location.href.split("#")[1].slice(2);

    let label = path[id.split("_")[0]].children[id.split("_")[1]];
    let url = label.children[2].innerHTML;
    let pic = label.children[0].src;
    console.log(url);
    dp.switchVideo({
      url: url,
      pic: pic,
    });
    dp.play();
  });
});
