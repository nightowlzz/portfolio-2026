$(document).ready(function() {
    preventDefaultAnchor();
    function preventDefaultAnchor() {
        $(document).on('click', 'a [href="#"]', function(e) {
            e.preventDefault();
        });
    }
    $('.main_menu > ul > li a').on('mouseenter focus', function() {
        $('.small_menu').addClass('show');
        $('.back_box').addClass('show');
    });
    $('.main_menu').on('mouseleave focusout', function() {
        $('.small_menu').removeClass('show');
        $('.back_box').removeClass('show');
    });
    //모바일일때 slide버튼
    $('.sitemap_menu > li > a').on('click', function() {
        var heigth = 0;
        var siteMapMenu = $(this).next('ul');
        $('.sitemap_menu > li').find('ul').removeClass('show');
        siteMapMenu.find('li').each(function() {
                 heigth += $(this).outerHeight(true);
        });
        siteMapMenu.addClass('show').css({'height': heigth + 'px'});
        siteMapMenu.parent('li').siblings().find('ul').css({'height': 0});
    });

    // pc팝업창
    var open = $('.open');
    var popup = $('.popup');
    var html = $('html, body');
    function btn_open(){
        open.on('click', function() {
            open.toggleClass('on');
            if (open.hasClass('on')){
                popup.addClass('show');
                html.css({'overflow': 'hidden'});
                $('.lang').css({'right': '28px'});
            } else {
                btn_close();
                $('.sitemap_menu > li > ul').removeClass('show');
                $('.lang').css({'right': '10px'});
            };
        });
        $('.close').on('click', function() {
            btn_close();
        });
        function btn_close() {
            open.removeClass('on');
            popup.removeClass('show');
            html.css({'overflow': 'visible','height': '100%'});
        };
    };
    btn_open();

// 라인 애니
function dev_list(selector) {
    var i = 0;
    setInterval(function() {
        selector.find('li').eq(i).addClass('on');
        selector.find('li').eq(i).siblings().removeClass('on');
        if (i == 8) {
            i = -1;
        };
        selector.addClass('show');
        ++i;
    }, 2000);
};
dev_list($('.busi_btm'));
dev_list($('.dev_list'));

    // textarea글자수 제한
    $('.text').on('keyup', function() {
        var content = $('textarea').val();
        $('.counter').html("(" + content.length + " / 최대 100자)");
        if (content.length > 100) {
            $(this).val($(this).val().substring(0, 100));
        }
    });
    // 박스ani
    $(window).on('scroll resize', function() {
        scroll($('.anicontent'));
    });
    scroll($('.anicontent'));
    function scroll(selector) {
            var scrollAmt = $(document).scrollTop();
            selector.each(function() {
                var $selector = $(this);
                var offsetCon = $selector.offset().top - ($(window).height());
                if (scrollAmt >= offsetCon) {
                    if($selector.hasClass('show') !== true){
                        $selector.addClass('show');
                    }
                };
            })
    };

    setImageSlide($('.main_visual li')  ,'fade');
    setImageSlide($('.sub_slide_list li'),'swiper');
    function setImageSlide(selector,mode){
        //pc변수
        var numSlide = selector.length;
        var slideNow = 0;
        var slidePrev = 0;
        var slideNext = 0;
        var slideMode = mode;
        if(selector.parent().next('ul').length >= 1){
            selector.each(function(i) {
            var pageimg = selector.eq(i).html();
            $(this).css({'left':(i * 100)+'%'});
            $(this).parents('.sub_slide_box').children('ul').append('<li><a href="#">' + pageimg + '</a></li>');
            });
        };

        $('.sub_pagenation li a').on('click', function() {
            var index = $(this).parent().index();
            showSlide(index + 1);
        });
        $('.control .prev').on('click',function() {
            showSlide(slidePrev);
        });
        $('.control .next').on('click',function() {
            showSlide(slideNext);
        });
    showSlide(1)
        function showSlide(n) {
            if(slideMode === 'swiper'){
                if (slideNow === 0) {
                    selector.parent().css({'transition': 'none', 'left': -((n - 1) * 100) + '%'});
                } else {
                    selector.parent().css({'transition': 'left 0.3s', 'left': -((n - 1) * 100) + '%'});
                };
            }else if(slideMode === 'fade'){
                selector.eq((slideNow - 1)).stop(true).animate({'opacity':0}, 500, function() {
                    $(this).css({'display':'none'});
                });
                selector.eq((n - 1)).css({'display':'block','opacity':0}).stop(true).animate({'opacity':'1'}, 300);
            };
            selector.parent().next('ul').find('li').removeClass('on');
            selector.parent().next('ul').find('li').eq((n - 1)).addClass('on');
            slideNow = n;
            slidePrev = (n <= 1) ? numSlide : (n - 1);
            slideNext = (n >= numSlide) ? 1 : (n + 1);
        };
    };

// top으로 이동
$('.qick_top').on('click', function() {
    $('html, body').animate({'scrollTop' : 0}, 500);
    });
});
