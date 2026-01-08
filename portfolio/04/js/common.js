$(document).ready(function() {
    $('.menu_button button').on('click', function() {
        var body = $('body');
        var menu = $('.menu_con_box');
        var menuBox = menu.height();
        $(this).add('.menu').add('.menu_con_box').toggleClass('on');
        $('.menu_button').add('.logo').addClass('on');
        if ($('.menu_con_box').hasClass('on')) {
            body.addClass('hid');
            menu.scrollTop(0);
        } else {
            body.removeClass('hid');
        };
        var eventScroll = ('onmousewheel' in window) ? 'mousewheel' : 'DOMMouseScroll';
        $('.menu_con_box').on(eventScroll, function(e) {
            e.stopPropagation();
        });
    });

    //패러릭스
    parallax('.parallex');
    function parallax(selector) {
        var numPage = $(selector).length;
        //전체페이지 몇개인지 저장
        var pageNow = 0;
        var pageNext = 0;
        var pagePrev = 0;
        var scrollEven = ('onmousewheel' in window) ? 'mousewheel' : 'DOMMouseScroll';
        var onAnimation = false;
        $(selector).each(function(i) {
            $('.page-indicator').append('<li><a href=""><span class="hide">' + i + '번 페이지</span></a></li>');
        });
        checkScroll();
        showPage(1);
        $('.page-indicator li:last-child').remove();
        window.addEventListener(scrollEven, function(e) {
            e.preventDefault();
            //↓↓↓↓e.preventDefault(); 다음에 와야 실행이됨
            if (onAnimation === true) return false;
            onAnimation = true;
            var delta = 0;
            if (scrollEven === 'mousewheel') {
                delta = e.wheelDelta / -120;
            } else {
                delta = e.detail / 3;
            };

            if (delta > 0) {
                showPage(pagePrev);
            } else if (delta < 0) {
                showPage(pageNext);
            }
        }, {
            passive: false
        });

        $('#page-indicator li a').on('click', function() {
            var index = $(this).parent().index();
            showPage(index + 1);
        });
        $(window).on('scroll resize', function() {
            checkScroll();
        });

        function checkScroll() {
            var scrollTop = $(document).scrollTop();
           $(selector).each(function(i) {
               var $selector = $(this);
               var minScroll = $(this).offset().top - $(window).height() / 2;
               var maxScroll = $(this).offset().top + $(window).height() / 2;
                if (scrollTop > minScroll && scrollTop <= maxScroll) {
                    var n = i + 1;
                    $selector.find('.color_box1').addClass('on');
                    $selector.find('.big_text').addClass('on');
                    $selector.find('.text_box').addClass('on');
                    $selector.find('.bar_img').addClass('on');
                    $('.page-indicator li').removeClass('on');
                    $('.page-indicator li').eq(n - 1).addClass('on');
                    pageNow = n;
                    pageNext = (n <= 1) ? 1 : (n - 1);
                    pagePrev = (n >= numPage) ? numPage : (n + 1);
                    return false;
                                    console.log(minScroll + '*///' + maxScroll +'llll'+scrollAmt);
                };

            });
        };

        function showPage(n) {
            var scrollAmp = $(selector).eq(n - 1).offset().top;
            $('html,body').stop(true).animate({
                'scrollTop': scrollAmp + 'px'
            }, 500, function() {
                onAnimation = false;
            });

        };
    };









});
