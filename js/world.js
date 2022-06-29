window.addEventListener("load", function () {
  var bg = document.querySelector(".bg1");
  var height = bg.offsetHeight;
  var move = 0;
  var index = 0;
  var lock = true;
  var thumb = document.querySelector(".thumb");
  var scr = document.querySelector(".scroll");
  window.addEventListener("resize", function () {
    height = bg.offsetHeight;
    move = index * height;
    scrollTo({
      top: move,
      left: 0,
    });
    /////////////////////////////
  });

  window.addEventListener("wheel", wheelMove, { passive: false });
  //滚轮触发事件
  function wheelMove(e) {
    if (lock) {
      lock = false;
      if (e.wheelDelta < 0) {
        index++;
        scroll();
        move = index * height;
        scrollTo({
          top: move,
          left: 0,
          behavior: "smooth",
        });
        index = index > 5 ? 5 : index;
      } else if (e.wheelDelta > 0) {
        index--;
        scroll();
        move = index * height;
        scrollTo({
          top: move,
          left: 0,
          behavior: "smooth",
        });
        index = index < 0 ? 0 : index;
      }
      setTimeout(function () {
        lock = true;
      }, 500);
    }
  }
  // 滚动条触发滚动
  var thumbMove;
  function scroll() {
    thumbMove = index * 20;
    if (index >= 5) {
      thumbMove = 80;
    } else if (index < 0) {
      thumbMove = 0;
    }
    thumb.style.top = thumbMove + "%";
  }
  //提瓦特方块点击
  var ico = document.querySelector(".ico");
  ico.addEventListener("click", function (e) {
    index++;
    scroll();
    move = index * height;
    scrollTo({
      top: move,
      left: 0,
      behavior: "smooth",
    });
  });
  //点击弹出内容;
  window.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );

  /////////////////////////////
  var show = document.querySelectorAll(".part_img");
  var mengde = document.querySelector(".mengde");
  var liyue = document.querySelector(".liyue");
  var daoqi = document.querySelector(".daoqi");
  var btn_mengde = mengde.querySelector("button");
  var btn_liyue = liyue.querySelector("button");
  var btn_daoqi = daoqi.querySelector("button");
  ////////////////////////////
  //蒙德
  show[0].addEventListener("click", function () {
    window.removeEventListener("wheel", wheelMove, { passive: false });
    mengde.style.display = "block";
    window.addEventListener("wheel", mengdeWheel); //滚动
  });
  //璃月
  show[1].addEventListener("click", function () {
    window.removeEventListener("wheel", wheelMove, { passive: false });
    liyue.style.display = "block";
    window.addEventListener("wheel", liyueWheel); //滚动
  });
  //稻妻
  show[2].addEventListener("click", function () {
    window.removeEventListener("wheel", wheelMove, { passive: false });
    daoqi.style.display = "block";
    window.addEventListener("wheel", daoqiWheel); //滚动
  });
  //关闭按钮
  btn_mengde.addEventListener("click", function () {
    mengde.style.display = "none";
    window.addEventListener("wheel", wheelMove);
    thumb_2[0].style.top = 0;
    mengdeUl.style.top = 0 + "%";
    topMove = 0;
    window.removeEventListener("wheel", mengdeWheel);
  });
  btn_liyue.addEventListener("click", function () {
    liyue.style.display = "none";
    window.addEventListener("wheel", wheelMove);
    thumb_2[1].style.top = 0;
    liyueUl.style.top = 0 + "%";
    topMove = 0;
    window.removeEventListener("wheel", liyueWheel);
  });
  btn_daoqi.addEventListener("click", function () {
    daoqi.style.display = "none";
    window.addEventListener("wheel", wheelMove);
    thumb_2[2].style.top = 0;
    daoqiUl.style.top = 0 + "%";
    topMove = 0;
    window.removeEventListener("wheel", daoqiWheel);
  });
  //滚动条
  var scroll_2 = document.querySelectorAll(".scroll_2");
  var thumb_2 = document.querySelectorAll(".thumb_2");
  //蒙德
  scroll_2[0].addEventListener("mousedown", function () {
    document.addEventListener("mousemove", mengde_thumbMove);
    mengdeUl.style.transitionDuration = "0s";
    thumb_2[0].style.transitionDuration = "0s";
  });
  //璃月
  scroll_2[1].addEventListener("mousedown", function () {
    document.addEventListener("mousemove", liyue_thumbMove);
    liyueUl.style.transitionDuration = "0s";
    thumb_2[1].style.transitionDuration = "0s";
  });
  //稻妻
  scroll_2[2].addEventListener("mousedown", function () {
    document.addEventListener("mousemove", daoqi_thumbMove);
    daoqiUl.style.transitionDuration = "0s";
    thumb_2[2].style.transitionDuration = "0s";
  });
  //
  document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", mengde_thumbMove);
    document.removeEventListener("mousemove", liyue_thumbMove);
    document.removeEventListener("mousemove", daoqi_thumbMove);
  });
  //蒙德
  var mengdeUl = mengde.querySelector("ul");
  var Move;
  function mengde_thumbMove(e) {
    Move = e.pageY - mengde.offsetTop - 185 - thumb_2[0].offsetHeight / 2;
    if (Move < 0) {
      Move = 0;
    } else if (Move > scroll_2[0].offsetHeight - thumb_2[0].offsetHeight) {
      Move = scroll_2[0].offsetHeight - thumb_2[0].offsetHeight;
    }
    thumb_2[0].style.top = Move + "px";
    mengdeUlMove();
  }
  function mengdeUlMove() {
    mengdeUl.style.top = -(Move / scroll_2[0].offsetHeight) * 600 + "%";
  }
  //璃月
  var liyueUl = liyue.querySelector("ul");
  function liyue_thumbMove(e) {
    Move = e.pageY - liyue.offsetTop - 185 - thumb_2[1].offsetHeight / 2;
    if (Move < 0) {
      Move = 0;
    } else if (Move > scroll_2[1].offsetHeight - thumb_2[1].offsetHeight) {
      Move = scroll_2[1].offsetHeight - thumb_2[1].offsetHeight;
    }
    thumb_2[1].style.top = Move + "px";
    liyueUlMove();
  }
  function liyueUlMove() {
    liyueUl.style.top = -(Move / scroll_2[1].offsetHeight) * 600 + "%";
  }
  //稻妻
  var daoqiUl = daoqi.querySelector("ul");
  function daoqi_thumbMove(e) {
    Move = e.pageY - daoqi.offsetTop - 185 - thumb_2[2].offsetHeight / 2;
    if (Move < 0) {
      Move = 0;
    } else if (Move > scroll_2[2].offsetHeight - thumb_2[2].offsetHeight) {
      Move = scroll_2[2].offsetHeight - thumb_2[2].offsetHeight;
    }
    thumb_2[2].style.top = Move + "px";
    daoqiUlMove();
  }
  function daoqiUlMove() {
    daoqiUl.style.top = -(Move / scroll_2[2].offsetHeight) * 1000 + "%";
  }
  //滑轮滚动
  //蒙德
  var topMove = 0;
  function mengdeWheel(e) {
    mengdeUl.style.transitionDuration = "1s";
    thumb_2[0].style.transitionDuration = "1s";
    if (e.wheelDelta < 0) {
      topMove += 80;
      topMove = topMove > 470 ? 470 : topMove;
      mengdeUl.style.top = -topMove + "%";
      thumb_2[0].style.top = (topMove / 470) * 80 + "%";
      Move = (topMove / 470) * 80 * scroll_2[0]; //同步
    } else if (e.wheelDelta > 0) {
      topMove -= 80;
      topMove = topMove < 0 ? 0 : topMove;
      mengdeUl.style.top = -topMove + "%";
      thumb_2[0].style.top = (topMove / 470) * 80 + "%";
      Move = (topMove / 470) * 80 * scroll_2[0]; //同步
    }
  }
  //璃月
  function liyueWheel(e) {
    liyueUl.style.transitionDuration = "1s";
    thumb_2[1].style.transitionDuration = "1s";
    if (e.wheelDelta < 0) {
      topMove += 80;
      topMove = topMove > 490 ? 490 : topMove;
      liyueUl.style.top = -topMove + "%";
      thumb_2[1].style.top = (topMove / 490) * 80 + "%";
      Move = (topMove / 490) * 80 * scroll_2[1]; //同步
    } else if (e.wheelDelta > 0) {
      topMove -= 80;
      topMove = topMove < 0 ? 0 : topMove;
      liyueUl.style.top = -topMove + "%";
      thumb_2[1].style.top = (topMove / 490) * 80 + "%";
      Move = (topMove / 490) * 80 * scroll_2[1]; //同步
    }
  }
  //稻妻
  function daoqiWheel(e) {
    daoqiUl.style.transitionDuration = "1s";
    thumb_2[2].style.transitionDuration = "1s";
    if (e.wheelDelta < 0) {
      topMove += 88;
      topMove = topMove > 800 ? 800 : topMove;
      daoqiUl.style.top = -topMove + "%";

      thumb_2[2].style.top = (topMove / 800) * 80 + "%";
      Move = (topMove / 800) * 85 * scroll_2[2]; //同步
    } else if (e.wheelDelta > 0) {
      topMove -= 88;
      topMove = topMove < 0 ? 0 : topMove;
      daoqiUl.style.top = -topMove + "%";

      thumb_2[2].style.top = (topMove / 800) * 80 + "%";
      Move = (topMove / 800) * 85 * scroll_2[2]; //同步
    }
  }
});
