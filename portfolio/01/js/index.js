$(document).ready(function() {
    // 메뉴 fixed
    $(window).on('scroll', function() {
        var header = $('header');
        var scr = $(this).scrollTop();
        if (scr > 300) {
            header.addClass('fixhead');
        } else {
            header.removeClass('fixhead');
        };
    });

    setImageSlide('div.image-slide', 1, false, 3000);
    function setImageSlide(selector, first, status, speed) {
        var numSlide = $(selector).find('ul.slide li').length;
        var slideNow = 0;
        var slidePrev = 0;
        var slideNext = 0;
    	var slidePrev1 = 0;
        var slideNext1 = 0;
        var slideFirst = first;
        var timerId = null;
        var isTimerOn = status;
        var timerSpeed = speed;
        var startX = 0;
        var delX = 0;
        var offsetX = 0;
        var isClickAllowed = true;
        var onAnimation = false;

        if (isTimerOn === true) {
            $(selector).find('.control a.play').addClass('on');
        } else {
            $(selector).find('.control a.play').removeClass('on');
        }
        showSlide(slideFirst, 'change');

        $(selector).find('.control a.prev').on('click', function(e) {
            e.preventDefault();
            $(this).find('img').stop(true).animate({'left': '-10px'}, 50).animate({'left': 0}, 100);
            showSlide(slidePrev, 'prev');
        });
        $(selector).find('.control .next').on('click', function(e) {
            e.preventDefault();
            $(this).find('img').stop(true).animate({'right': '-10px'}, 50).animate({'right': 0}, 100);
            showSlide(slideNext, 'next');
        });
        $(selector).find('.slide').on('mousedown', function(e) {
            if (onAnimation === true) return false;
            $(this).css({'transition': 'none'});
            clearTimeout(timerId);
            startX = e.clientX;
            offsetX = $(this).position().left;

            $(document).on('mousemove', function(e) {
                e.preventDefault();
                delX = e.clientX - startX;
                $(selector).find('ul.slide').css({'left': (offsetX + delX) + 'px'});
                if (Math.abs(delX) > 10) isClickAllowed = false;
            });

            $(document).on('mouseup', function(e) {
                if (delX < -50) {
                    showSlide(slideNext, 'next');
                } else if (delX > 50) {
                    showSlide(slidePrev, 'prev');
                } else {
                    showSlide(slideNow, 'now');
                }
                $(document).off('mousemove mouseup');
            });
        }).on('click', function(e) {
            if (isClickAllowed === false) {
                e.preventDefault();
                isClickAllowed = true;
            }
        });


        function showSlide(n, direction) {
            if (onAnimation === true) return false;
            clearTimeout(timerId);

            if (direction === 'change') {
                resetSlide(n);
            } else {
                var offsetLeft = 0;
                if (direction === 'prev') {
                    offsetLeft = 100;
                } else if (direction === 'next') {
                    offsetLeft = -100;
                    console.log('next');
                } else {
                    offsetLeft = 0;
                }
                onAnimation = true;
                $(selector).find('ul.slide').css({'transition': 'left 0.3s', 'left': offsetLeft + '%'}).one('transitionend', function() {
                    resetSlide(n);
                    onAnimation = false;
                });
            }

            if (isTimerOn === true) {
                timerId = setTimeout(function() {showSlide(slideNext, 'next');}, timerSpeed);
            }
        }

        function resetSlide(n) {

        slideNow = n;
        slidePrev = (n <= 1) ? numSlide : (n - 1);
        slideNext = (n >= numSlide) ? 1 : (n + 1);
		slidePrev1 = (n <= 1) ? numSlide - 1 : (n - 2);
        slideNext1 = (n >= numSlide) ? 2 : (n + 2);
		if(n === numSlide -1){
			slideNext1 = 1;
			console.log(slideNext);
			}
        $('.produc_box').find('.sconbox1 ').removeClass('on');
        $('.produc_box').find('.sconbox1 ').eq(n-1).addClass('on');
        $(selector).find('ul.slide').css({'transition': 'none', 'left': 0});
        $(selector).find('ul.slide li').css({'left': 0}).removeClass('on');
        $(selector).find('ul.slide li:eq(' + (slideNow - 1) + ')').css({'left': 0}).addClass('on');
        $(selector).find('ul.slide li:eq(' + (slidePrev - 1) + ')').css({'left': '-100%',"display":'block'});
        $(selector).find('ul.slide li:eq(' + (slideNext - 1) + ')').css({'left': '100%',"display":'block'});
		$(selector).find('ul.slide li:eq(' + (slidePrev1 - 1) + ')').css({'left': '-200%',"display":'block'});
        $(selector).find('ul.slide li:eq(' + (slideNext1 - 1) + ')').css({'left': '200%',"display":'block'});
        }
    }


});
