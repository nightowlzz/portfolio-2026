$(document).ready(function() {
    preventDefaultAnchor();
function preventDefaultAnchor() {
$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});
}
    $('.wrap').find('video').trigger('play');
    // 메인버튼클릭시
    $('.section-main > ul > li').on('click', function() {
        var wrap = $('.wrap');
        var container = $('.cotainer');
        var video = $('.sub-video-play');
        var menulist = $('.menu ul li');
        var footmenu = $('.foot-menu ul li');
        var sidemenu = $('.side-menu ul li');
        var down = $('.btm-logo');
        var idx = $(this).index();
        var tihs = $(this);
        $(this).siblings().addClass('blur');
        menulist.children('em').addClass('blur');
        container.addClass('show');
        video.eq(idx).addClass('on');
        $('.blur').css('display', 'none');
        // page 넘어갈때
        setTimeout(function() {
            $('.cotainer .menu').addClass('show');
        }, 500);
        setTimeout(function() {
            $(this).siblings().css('display', 'none');
            wrap.css({
                overflow: 'visible',
                background: 'none'
            });
            down.addClass('show');
        }, 800);
        // 영상숨기기
        setTimeout(function() {
            video.removeClass('on');
            video.parents('.col-video').addClass('hide');
        }, 1000);
        // side menu
    });
    // foot메뉴와 main 연결
    $('.menu > ul > li').on('click', function() {
        var subPage = $('.container-wrap');
        var menulist = $('.menu ul li');
        var footmenu = $('.foot-menu ul li');
        var idx = $(this).index();
        setTimeout(function() {
            subPage.eq(idx).removeClass('none');
            subPage.eq(idx).siblings().addClass('none');
        }, 500);
        footmenu.eq(idx).addClass('on');
        footmenu.eq(idx).siblings().removeClass('on');
        $('html, body').animate({scrollTop: '0'},500);
    });
    // footmenu클릭시 메인 글씨 띄우기
    $('.foot-menu ul li,.side-menu ul li').on('click', function() {
        var menulist = $('.section-main ul li');
        var idx = $(this).index();
        if (menulist.eq(idx).hasClass('blur')) {
            menulist.eq(idx).removeClass('blur');
            menulist.eq(idx).css('display', 'block');
            menulist.eq(idx).siblings().addClass('blur');
            menulist.eq(idx).siblings().css('display', 'none');
        };
    });

    $('.menu li').on('mouseover', function() {
        var idx = $(this).index();
        var video = $('.col-video video');
        var container = $('.cotainer');
        var menulist = $('.menu ul li');
        menulist.children('em').addClass('hov');
        if (container.hasClass('show')) {
            $(this).siblings('li').removeClass('opaci');
            video.removeClass('show');
        } else {
            $(this).siblings('li').addClass('opaci');
            video.eq(idx).addClass('show');
        };
    });

    $('.menu li').on('mouseout', function() {
        var idx = $(this).index();
        var video = $('.col-video video');
        var menulist = $('.menu ul li');
        $(this).siblings('li').removeClass('opaci');
        video.removeClass('show');
        menulist.children('em').removeClass('hov');
    });
    // 사진 클릭시 영살실행
    $('.moving').on('click', function(e) {
        var video = $(this);
        $(this).find('span').addClass('hide');
        $(this).find('a').removeClass('play');
        $(this).find('img').addClass('hide');
        $(this).find('video').trigger('play');
        $('video').on('ended', function (e) {
            video.find('span').removeClass('hide');
            video.find('a').addClass('play');
            video.find('img').removeClass('hide');
        });
    });

// scroll img video
$(window).on('scroll resize', function() {
    scrollAni($('.container-wrap'));
});
    scrollAni($('.container-wrap'));
    function scrollAni(selector){
        var scrollAmt = $(document).scrollTop();
        selector.each(function() {
            var $selector = $(this);
            if($selector.hasClass('none') !== true){
                $($selector.find('.img-box')).each(function() {
                    var imgBox = $(this);
                    var minScrollPic = $(this).offset().top - ($(window).height() / 2);
                    if(scrollAmt > minScrollPic){
                        if(imgBox.hasClass('show') !== true){
                            imgBox.addClass('show');
                        };
                    };

                });
            }else{
                $($selector.find('.img-box')).removeClass('show');
            };

        });
    };
});
