var iUp = (function () {
	var t = 0,
		d = 150,
		clean = function () {
			t = 0;
		},
		up = function (e) {
			setTimeout(function () {
				$(e).addClass("up")
			}, t);
			t += d;
		},
		down = function (e) {
			$(e).removeClass("up");
		},
		toggle = function (e) {
			setTimeout(function () {
				$(e).toggleClass("up")
			}, t);
			t += d;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	}
})();

function getBingImages(imgUrls) {
	/**
	 * 获取Bing壁纸
	 * 先使用 GitHub Action 每天获取 Bing 壁纸 URL 并更新 images.json 文件
	 * 然后读取 images.json 文件中的数据
	 */
	var indexName = "bing-image-index";
	var index = sessionStorage.getItem(indexName);
	var $panel = $('#panel');
	if (isNaN(index) || index == 7) index = 0;
	else index++;
	var imgUrl = imgUrls[index];
	var url = "https://www.bing.com" + imgUrl;
	$panel.css("background", "url('" + url + "') center center no-repeat #666");
	$panel.css("background-size", "cover");
	sessionStorage.setItem(indexName, index);
}


function loadVideoBackground() {
  var bv = new Bideo();
  bv.init({
    // Video element
    videoEl: document.querySelector('#background_video'),

    // Container element
    container: document.querySelector('#panel'),

    // Resize
    resize: true,

    // autoplay: false,

    isMobile: window.matchMedia('(max-width: 768px)').matches,

    // playButton: document.querySelector('#play'),
    // pauseButton: document.querySelector('#pause'),

    // Array of objects containing the src and type
    // of different video formats to add
    src: [
      {
        src: backgroundVideoUrl,
        type: 'video/mp4'
      }
    ],

    // What to do once video loads (initial frame)
    onLoad: function () {
		$('#background_video_cover').css('display', 'none')
	}
  });
}

if( backgroundType === 'video_wallpaper' ){
	$('#panel').css("background", "center center no-repeat #000000")
	$('#panel-main').append('<video id="background_video" loop muted></video>')
	$('#panel-main').append('<div id="background_video_cover" class="video-cover"></div>')
	$('#background_video_cover').css('background', 'url('+backgroundVideoCoverUrl+') no-repeat')

	$('#background_video').css({
		"position": "absolute",
		"top": "50%",
		"left": "50%",
		"transform": "translate(-50%, -50%)",
		"object-fit": "cover",
		"height": "100%",
		"width": "100%",
	})
	loadVideoBackground()
} else {
	const script = document.createElement("script");
	script.type="text/javascript";
	script.src= './assets/json/images.json?cb=getBingImages';
	document.body.appendChild(script);
}


$(document).ready(function () {
	// 获取一言数据
	$.get('https://v1.hitokoto.cn', function (res) {
		$('#description').html(res.hitokoto + "<br/> -「<strong>" + res.from + "</strong>」")
	});

	$(".iUp").each(function (i, e) {
		iUp.up(e);
	});
	$(".js-avatar")[0].onload = function () {
		$(".js-avatar").addClass("show");
	}
});

$('.btn-mobile-menu__icon').click(function () {
	if ($('.navigation-wrapper').css('display') == "block") {
		$('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
			$('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
		});
		$('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');

	} else {
		$('.navigation-wrapper').toggleClass('visible animated bounceInDown');
	}
	$('.btn-mobile-menu__icon').toggleClass('social iconfont icon-list social iconfont icon-angleup animated fadeIn');
});
