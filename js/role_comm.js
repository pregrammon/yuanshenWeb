window.addEventListener("load", function () {
  var ul = document.querySelector(".box").children[0]; //获取切换栏ul
  var next = document.querySelector(".next"); //下一个
  var previous = document.querySelector(".next"); //上一个
  var index = 0;
  //点击切换角色
  for (var i = 0; i < ul.children.length; i++) {
    //给li设置属性index
    ul.children[i].setAttribute("index", i);
    //给li绑定点击事件
    ul.children[i].addEventListener("click", function () {
      index = this.getAttribute("index");
      if (index > 2 && index < ul.children.length - 3) {
        let distance = (index - 2) * -160;
        ul.style.transform = "translateX(" + distance + "px)";
      } else if (index <= 2) {
        ul.style.transform = "translateX(0px)";
      } else if (index >= ul.children.length - 3)
        ul.style.transform =
          "translateX(" + -160 * (ul.children.length - 6) + "px)";
      //设置选中
      for (var j = 0; j < ul.children.length; j++) {
        ul.children[j].className = "";
      }
      switchRoles(); ////////////////////////////////////////////////切换角色
      this.className = "select_item";
    });
  }
  //  点击上一个下一个切换
  var next = document.querySelector(".next"); //下一个
  var previous = document.querySelector(".previous"); //上一个

  // 下一个///////////////////////////////////////////////
  next.addEventListener("click", function () {
    if (index < ul.children.length) {
      index++;
    }
    index = index < ul.children.length ? index : ul.children.length - 1;
    //角色小图标选中
    for (var j = 0; j < ul.children.length; j++) {
      ul.children[j].className = "";
      switchRoles(); ////////////////////////////////////////////////切换角色
    }

    ul.children[index].className = "select_item";
    //移动ul
    if (index > 2 && index < ul.children.length - 3) {
      let distance = (index - 2) * -160;
      ul.style.transform = "translateX(" + distance + "px)";
    }
  });

  // 上一个////////////////////////////////////////
  previous.addEventListener("click", function () {
    index = index > 0 ? index : 1;
    index--;
    //角色小图标选中
    if (index >= 0) {
      for (var j = 0; j < ul.children.length; j++) {
        ul.children[j].className = "";
      }
      switchRoles(); ////////////////////////////////////////////////切换角色
      ul.children[index].className = "select_item";
    }
    //移动ul
    if (index > 1 && index < ul.children.length - 3) {
      let distance = (index - 2) * -160;
      ul.style.transform = "translateX(" + distance + "px)";
    }
  });

  ///////////////////////////////////////////////////////////////
  //切换角色主图
  var role = document.querySelector(".role").children[0];

  function switchRoles() {
    for (var i = 0; i < role.children.length; i++) {
      role.children[i].style.display = "none";
    }
    role.children[index].style.display = "block";
    changeInfo(); //调用切换信息
  }
  //隐藏角色信息info
  var info = this.document.querySelector(".info").children[0];
  function changeInfo() {
    for (var i = 0; i < info.children.length; i++) {
      info.children[i].style.display = "none";
    }
    info.children[index].style.display = "block";
  }
});
