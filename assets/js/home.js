import ProgressBar from "progressbar.js/dist/progressbar.min.js";

var bar = new ProgressBar.Circle("#dynamic-progress-circle", {
  strokeWidth: 4,
  color: "#F0743E",
  trailColor: "#fde7d7",
  trailWidth: 4,
  svgStyle: null,
  duration: 0, // 設置動畫持續時間為 0
});

var progressCircle = document.getElementById("dynamic-progress-circle");
var handle = document.getElementById("progress-handle");
var radius = progressCircle.offsetWidth / 2;
var centerX = progressCircle.offsetLeft + radius;
var centerY = progressCircle.offsetTop + radius;
var progressCircleRect = progressCircle.getBoundingClientRect();
var offsetX = progressCircleRect.left + window.scrollX;
var offsetY = progressCircleRect.top + window.scrollY;

var maxMinutes = 60; // 最大時間為60分鐘
var timeElement = document.getElementById("countdown");
var stepProgress = 5 / maxMinutes; // 每次增量為5分鐘，對應的進度增量

function updateTime(progress) {
  var totalSeconds = maxMinutes * 60; // 將分鐘轉為秒
  var elapsedSeconds = Math.round(totalSeconds * progress); // 計算已過時間
  var minutes = Math.floor(elapsedSeconds / 60);
  var seconds = elapsedSeconds % 60;

  // 格式化時間顯示
  timeElement.innerText = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

// 初始化時間顯示
updateTime(1); // 初始時間為60分鐘（0分鐘剩餘）
// 更新拉軸位置的函數
function updateHandle(progress) {
  var angle = -Math.PI / 2 + 2 * Math.PI * progress;
  var x = centerX + radius * Math.cos(angle) - handle.offsetWidth / 2;
  var y = centerY + radius * Math.sin(angle) - handle.offsetHeight / 2;

  handle.style.left = x + "px";
  handle.style.top = y + "px";
  updateTime(progress); // 更新時間
}

// 初始化拉軸位置
updateHandle(0.75); // 根據進度條設置初始位置

// 讓進度條連動拉軸
bar.animate(0, {
  step: function (state, circle) {
    updateHandle(circle.value());
  },
});

var isDragging = false;

// 針對滑鼠的事件處理
handle.addEventListener("mousedown", function () {
  isDragging = true;
});

document.addEventListener("mousemove", function (event) {
  if (isDragging) {
    handleDrag(event.clientX, event.clientY); // 處理滑鼠拖動
  }
});

document.addEventListener("mouseup", function () {
  isDragging = false;
});

// 針對觸控的事件處理
handle.addEventListener("touchstart", function () {
  isDragging = true;
});

document.addEventListener("touchmove", function (event) {
  if (isDragging && event.touches.length === 1) {
    // 確保只處理單點觸控
    var touch = event.touches[0]; // 取得觸控點的位置信息
    handleDrag(touch.clientX, touch.clientY); // 處理觸控拖動
  }
});

document.addEventListener("touchend", function () {
  isDragging = false;
});

// 將處理邏輯抽取為單獨的函數
function handleDrag(clientX, clientY) {
  var dx = clientX - (offsetX + radius);
  var dy = clientY - (offsetY + radius);
  var angle = Math.atan2(dy, dx) + Math.PI / 2;
  if (angle < 0) angle += 2 * Math.PI;

  var progress = angle / (2 * Math.PI);
  progress = Math.round(progress / stepProgress) * stepProgress; // 限制進度到最接近的5分鐘增量
  progress = Math.min(Math.max(progress, 0), 1); // 限制進度在0到1之間

  bar.set(progress);
  updateHandle(progress);
}
