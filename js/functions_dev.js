// variables
var $window = $(window),
  gardenCtx,
  gardenCanvas,
  $garden,
  garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

var last;

function callWhenNeeded(first, second, callback) {
	if (callback && first === second) callback.call();
}

(function ($) {
  $.fn.typewriter = function (callback) {
	this.callIfNeeded = function(el, last) {
		
	}
    this.each(function () {
      var $ele = $(this),
        str = $ele.html(),
        progress = 0;
	  last = $ele;
      $ele.html("");
      var timer = setInterval(function () {
        var current = str.substr(progress, 1);
        if (current == "<") {
          progress = str.indexOf(">", progress) + 1;
        } else {
          progress++;
        }
        $ele.html(str.substring(0, progress));
        if (progress >= str.length) {
          clearInterval(timer);
		  callWhenNeeded($ele, last, callback);
        }
      }, 1);
    });
    return this;
  };
})(jQuery);

function timeElapse(date) {
  var current = Date();
  var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
  var days = Math.floor(seconds / (3600 * 24));
  seconds = seconds % (3600 * 24);
  var hours = Math.floor(seconds / 3600);
  if (hours < 10) {
    hours = "0" + hours;
  }
  seconds = seconds % 3600;
  var minutes = Math.floor(seconds / 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  seconds = seconds % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var result =
    '<span class="digit">' +
    days +
    '</span> days <span class="digit">' +
    hours +
    '</span> hours <span class="digit">' +
    minutes +
    '</span> minutes <span class="digit">' +
    seconds +
    "</span> seconds";
  $("#elapseClock").html(result);
}

function showMessages() {
  adjustWordsPosition();
  $("#messages").fadeIn(5000, function () {
    showLoveU();
  });
}

function showLoveU() {
  $("#loveu").fadeIn(3000);
}

const Confettiful = function (el) {
  this.el = el;
  this.containerEl = null;

  this.confettiFrequency = 10;
  this.confettiColors = ["#EF2964", "#00C09D", "#2D87B0", "#48485E", "#EFFF1D"];
  this.confettiAnimations = ["slow", "medium", "fast"];

  this._setupElements();
  this._renderConfetti();
};

Confettiful.prototype._setupElements = function () {
  const containerEl = document.createElement("div");
  const elPosition = this.el.style.position;

  if (elPosition !== "relative" || elPosition !== "absolute") {
    this.el.style.position = "relative";
  }

  containerEl.classList.add("confetti-container");

  this.el.appendChild(containerEl);

  this.containerEl = containerEl;
};

Confettiful.prototype._renderConfetti = function () {
  this.confettiInterval = setInterval(() => {
    const confettiEl = document.createElement("div");
    const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
    const confettiBackground =
      this.confettiColors[
        Math.floor(Math.random() * this.confettiColors.length)
      ];
    const confettiLeft = Math.floor(Math.random() * this.el.offsetWidth) + "px";
    const confettiAnimation =
      this.confettiAnimations[
        Math.floor(Math.random() * this.confettiAnimations.length)
      ];

    confettiEl.classList.add(
      "confetti",
      "confetti--animation-" + confettiAnimation
    );
    confettiEl.style.left = confettiLeft;
    confettiEl.style.width = confettiSize;
    confettiEl.style.height = confettiSize;
    confettiEl.style.backgroundColor = confettiBackground;

    confettiEl.removeTimeout = setTimeout(function () {
      confettiEl.parentNode.removeChild(confettiEl);
    }, 3000);

    this.containerEl.appendChild(confettiEl);
  }, 25);
};

function showMyCake() {
	$('.modal').modal({
	  fadeDuration: 100,
	});
	$('.modal .confetti-container').remove();
	animateCake();
	
	new Confettiful(document.querySelector(".modal"));
}