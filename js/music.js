window.addEventListener("load", function () {
  // 控件按钮点击颜色反馈
  var pre = document.querySelector(".previous");
  var paly_pause = document.querySelector(".paly_pause");
  var next = document.querySelector(".next");
  var voice = document.querySelector(".voice");
  //拖动条
  var bar = document.querySelector(".pro_bar");
  var pro = document.querySelector(".current_pro");
  var audio = document.querySelector("audio");
  var volume = document.querySelector(".currentVoice");
  var voiceBar = document.querySelector(".voiceBar");
  var needle = document.querySelector(".needle");
  var song = document.querySelectorAll(".song_title");
  var CurrentSongTitle = document.querySelector(".CurrentSongTitle");
  var flag = true; //控制音乐播放暂停
  var songPath = document.querySelectorAll(".path");
  var cd = document.querySelector(".cd");
  var duration = audio.duration;
  var setPro;
  var block;
  var blockSetTimer;

  //   鼠标按下事件
  pre.addEventListener("mousedown", preDown);
  paly_pause.addEventListener("mousedown", playDown);
  next.addEventListener("mousedown", nextDown);
  voice.addEventListener("mousedown", voiceDown);
  //鼠标抬起事件
  pre.addEventListener("mouseup", preUp);
  paly_pause.addEventListener("mouseup", playUp);
  next.addEventListener("mouseup", nextUp);
  voice.addEventListener("mouseup", voiceUp);
  //拖动条鼠标事件
  bar.addEventListener("mousedown", barDown);
  bar.addEventListener("mouseup", barUp);
  //文档事件
  document.addEventListener("mouseup", documentUp);
  //音量条拖动事件
  volume.addEventListener("mousedown", setVolume);
  //上一首
  voiceBar.addEventListener("mousedown", voiceBarDown);
  function preDown() {
    downColor(pre);
  }
  function preUp() {
    previousSong();
    clearInterval(currentTime);
  }

  //   暂停/开始
  function playDown() {
    downColor(paly_pause);
  }
  function playUp() {
    palyAndPause();
  }

  // 下一首
  function nextDown() {
    downColor(next);
  }

  function nextUp() {
    nextSong();
    clearInterval(currentTime);
  }

  // 音量
  function voiceDown() {
    downColor(voice);
  }
  //设置音量
  var set;
  function voiceBarDown() {
    document.addEventListener("mousemove", setVolume);
  }
  function setVolume(e) {
    set = e.pageX - voice.offsetLeft - voiceBar.offsetLeft;
    console.log(voice.offsetLeft + "," + volume.offsetLeft);
    if (set > voiceBar.offsetWidth) {
      set = voiceBar.offsetWidth;
    } else if (set < 0) {
      set = 0;
    }
    volume.style.width = set + "px";
    audio.volume = set / voiceBar.offsetLeft;
  }

  function voiceUp() {}

  //文档鼠标抬起事件
  function documentUp() {
    upColor(pre);
    upColor(paly_pause);
    upColor(next);
    upColor(voice);
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mousemove", setVolume);
    setTimeout(function () {
      duration = audio.duration; //获取音频长度
    }, 1000);

    if (block) {
      setPro = (position / bar.offsetWidth).toFixed(4);
      audio.currentTime = setPro * duration;
    }
    block = false;
    blockSetTimer = true;
  }

  // 控件鼠标按下颜色反馈
  function downColor(obj) {
    obj.style.color = "#fff";
  }
  //鼠标抬起颜色反馈
  function upColor(obj) {
    obj.style.color = "rgba(255, 255, 255, 0.7)";
  }
  //拖动条按下
  var position = 0;
  function barDown(e) {
    block = true;
    blockSetTimer = false;
    position = e.pageX - bar.offsetLeft;
    pro.style.width = position + "px";
    document.addEventListener("mousemove", move);
  }
  //拖动条抬起
  function barUp() {
    setPro = (position / bar.offsetWidth).toFixed(4);
    audio.currentTime = setPro * duration;
  }
  //滚动条拖动
  function move(e) {
    position = e.pageX - bar.offsetLeft;
    if (position < 0) {
      position = 0;
    } else if (position > bar.offsetWidth) {
      position = bar.offsetWidth;
    }
    pro.style.width = position + "px";
    setPro = (position / bar.offsetWidth).toFixed(4);
  }
  //音乐播放和暂停
  function palyAndPause() {
    setTimeout(function () {});
    if (flag) {
      audio.play();
      paly_pause.innerHTML = "";
      flag = false;
    } else {
      audio.pause();
      paly_pause.innerHTML = "";
      flag = true;
    }
  }

  //按钮切换歌曲
  var currentSong = 0;
  function nextSong() {
    currentSong++;
    currentSong = currentSong < songPath.length ? currentSong : 0;
    audio.src = songPath[currentSong].innerHTML;
    flag = true;
    resetPro(); //重置进度条
    palyAndPause();
  }
  function previousSong() {
    currentSong--;
    currentSong = currentSong < 0 ? songPath.length - 1 : currentSong;
    audio.src = songPath[currentSong].innerHTML;
    flag = true;
    resetPro(); //重置进度条
    palyAndPause();
  }

  // 进度条随歌曲进度变化;
  setInterval(function () {
    if (blockSetTimer) {
      position = (audio.currentTime / duration) * bar.offsetWidth;
      pro.style.width = position + "px";
    }
  }, 500);
  //音乐播放结束事件
  audio.addEventListener("ended", function () {
    nextSong();
  });
  //音乐播放事件
  audio.addEventListener("play", function () {
    cd.style.animationPlayState = "running"; //cd转动
    needle.id = "";
    needle.style.animationPlayState = "running";
    CurrentSongTitle.innerHTML = song[currentSong].innerHTML; // 更换歌曲名称
    setTimeout(function () {
      duration = audio.duration;
    }, 500);

    currentTime = setInterval(function () {
      formatTime();
    }, 1000);
  });
  audio.addEventListener("pause", function () {
    cd.style.animationPlayState = "paused"; //cd停止转动
    needle.id = "pause";
    clearInterval(currentTime);
  });
  //重置进度条
  function resetPro() {
    position = 0;
    pro.style.width = position + "px";
  }
  //时间控制

  //时间格式化
  var m;
  var s;
  var mm;
  var ss;
  var time = document.querySelector(".currentTime");
  function formatTime() {
    m = Math.floor(audio.currentTime / 60);
    s = Math.floor(audio.currentTime % 60);
    mm = m > 9 ? m : "0" + m;
    ss = s > 9 ? s : "0" + s;
    time.innerHTML = mm + ":" + ss;
  }
});
