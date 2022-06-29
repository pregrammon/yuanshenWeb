window.addEventListener("load", function () {
  //index页面左边轮播图切换方法
  left();
  //新闻栏切换方法
  right();
  //二维码显示隐藏
  var link = document.querySelector(".link");
  var code = document.querySelector(".code");
  var close = document.querySelector(".close");
  console.log(code);
  link.addEventListener("click", function () {
    code.style.display = "block";
  });
  close.onclick = function () {
    code.style.display = "none";
  };
});

const step = -600;
var times = 0;
function left() {
  var ul = document.querySelector(".tab_move");
  //循环切换复制结点,添加到最后

  var newList = ul.children[0].cloneNode(true);
  ul.appendChild(newList);
  //切换动画实现
  timer = setInterval(animate, 5000);
  function animate() {
    var move = step * (times + 1);
    ul.style.transform = "translateX(" + move + "px" + ")";
    syn(times);
    times++;
    /* console.log("times：" + times); */
    change();
  }
  function change() {
    //循环切换实现方法
    if (times == ul.children.length) {
      ul.className = "";
      ul.style.transform = "translateX(0px)";
      setTimeout(function () {
        times = 0;
        ul.className = "tab_move";
      }, 0);
    }
  }
  //小白点切换功能
  // 生成小白点
  var point_ul = document.querySelector(".pointer");
  for (var i = 0; i < ul.children.length - 1; i++) {
    var list = this.document.createElement("li");
    list.setAttribute("index", i);
    point_ul.appendChild(list);
    point_ul.children[0].className = "select";

    list.addEventListener("click", function () {
      for (var j = 0; j < point_ul.children.length; j++) {
        point_ul.children[j].className = "";
      }
      this.className = "select";
      times = parseInt(this.getAttribute("index")) - 1;
      animate();
      if (timer) {
        timer = clearInterval(timer);
      }
      setTimeout(function () {
        timer = setInterval(animate, 5000);
      }, 0);
    });
  }
  //同步小圆点方法
  function syn(times) {
    for (var i = 0; i < point_ul.children.length; i++) {
      point_ul.children[i].className = "";
    }
    if (times > 3) {
      point_ul.children[0].className = "select";
    } else {
      point_ul.children[times + 1].className = "select";
    }
  }
}
//////////////////////////////////////////////////
function right() {
  var title = document.querySelector(".title").children[0];
  var content = document.querySelector(".content");
  content.children[0].style.display = "block"; //设置初始显示第一个content-ul的内容
  for (var i = 0; i < title.children.length; i++) {
    title.children[i].setAttribute("index", i); //给每一个li设置index 属性
    //给每一个li绑定事件
    title.children[i].addEventListener("click", function () {
      for (var j = 0; j < title.children.length; j++) {
        title.children[j].className = "";
        content.children[j].style.display = "none";
      }
      this.className = "select_title";
      //给点击新闻标题对应内容设置显示display
      content.children[this.getAttribute("index")].style.display = "block";
    });
  }
}
